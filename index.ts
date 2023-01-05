import { FilterSettings, initDevice, workers } from "device-decoder"; // '../device_debugger/src/device.frontend'//

import gsworker from '../device_debugger/src/stream.big.worker'//'device-decoder/stream.big.worker.js'

import { mpu6050ChartSettings } from "device-decoder/src/devices/mpu6050.js";
import { max3010xChartSettings } from "device-decoder/src/devices/max30102.js";
import { ads131m08ChartSettings } from "device-decoder/src/devices/ads131m08.js";
import { bme280ChartSettings } from "device-decoder/src/devices/bme280.js";

import {htmlloader, SubprocessContext} from 'graphscript'//'../graphscript/'

import { visualizeDirectory } from 'graphscript-services.storage'//'../graphscript/src/extras/storage/BFS_CSV';
import { HTMLNodeProperties } from 'graphscript'//'../graphscript';
import { ByteParser } from 'device-decoder/src/util/ByteParser';

// Alert Imports
import Alert from './alerts/Alert';
import heartRateAlertSettings from './alerts/heartrate';
import gyroAlertSettings from './alerts/gyro';
import Algorithm from "./algorithms/Algorithm";

// Graph Component Imports
import Plot from "./components/plot/Plot";

//TODO: twilio sms backend

const state = {
    ppg:{},
    emg:{},
    imu:{},
    env:{},
    emg2:{},
    recording:false,
    test:0
};

const detected = {
    emg:false,
    ppg:false,
    imu:false,
    env:false,
    emg2:false
};

workers.__node.loaders.html = htmlloader;

function genTimestamps(ct,sps,from?) {
    let now = from ? from : Date.now();
    let toInterp = [now - ct*1000/sps, now];
    return ByteParser.upsample(toInterp, ct);
}

const hrAlert = new Alert(heartRateAlertSettings);
const gyroAlert = new Alert(gyroAlertSettings);

const arbitraryAlertSettings = {
    message: `<h2>Arbitrary Alert</h2><p>This alert has been thrown</p>`,
    condition: (value) => {
        return value === 1
    }
}
const arbitraryAlgorithm = new Algorithm({
    function: (value) => {
        console.log('Processing with arbitrary algorithm', value)
        return value
    },
    alert: arbitraryAlertSettings
})

// Trigger an alert when the user presses 'a'
window.onkeydown = (ev) => {
    if (ev.key === 'a') {
        arbitraryAlgorithm.alert.throw();
    }
}

workers.load({

    state:state,
    detected:detected,

    'connect':{
        __element:'button',
        innerHTML:'Connect Device',
        onclick:(ev) => { 

            let connect = () => {
                let csvworkers = {
                    emg:workers.addWorker({url:gsworker}),
                    ppg:workers.addWorker({url:gsworker}),
                    imu:workers.addWorker({url:gsworker}),
                    env:workers.addWorker({url:gsworker}),
                    emg2:workers.addWorker({url:gsworker})
                }
    
                let algoworkers = {
                    hr:workers.addWorker({url:gsworker}),
                    breath:workers.addWorker({url:gsworker}),
                };

                algoworkers.hr?.run('createSubprocess', ['heartrate',{sps:100}]).then((id) => {

                    algoworkers.hr?.subscribe(id,(
                        heartbeat:{
                            bpm: number,
                            change: number, //i.e. HRV, higher is better if it is oscillating nicely with breathing
                            height0: number,
                            height1: number,
                            timestamp: number
                        }
                    ) => {
                        const data = {
                            hr:heartbeat.bpm,
                            hrv:heartbeat.change,
                            timestamp:heartbeat.timestamp
                        }
    
                        if(state.recording) {
                            csvworkers.ppg?.run('appendCSV',data); //forward to csv thread (should use the message channel commands instead)
                        }
    
                        state.ppg = data;
                    });
                });

                algoworkers.breath?.run('createSubprocess', ['breath',{sps:100}]).then((id) => {
                    algoworkers.breath?.subscribe(id,(
                        breath:{
                            bpm: number,
                            change: number, //lower is better
                            height0: number, 
                            height1: number,
                            timestamp: number
                        }
                    ) => {
                        const data = {
                            breath:breath.bpm,
                            brv:breath.change,
                            timestamp:breath.timestamp
                        }
                        
                        if(state.recording) {
                            csvworkers.ppg?.run('appendCSV',data); //forward to csv thread (should use the message channel commands instead)
                        }
    
                        state.ppg = data;
                    });
                });
    

    

                let clearworkers = () => {
                    for(const key in csvworkers) {
                        csvworkers[key].terminate();
                    }
                    for(const key in algoworkers) {
                        algoworkers[key].terminate();
                    }
    
                    workers.unsubscribe('state',sub,'recording');
                }

                let disconnect = (controls?) => {
                    if(!controls) {
                        clearworkers();
                    } else {
                        ev.target.innerHTML = 'Disconnect'
                        ev.target.onclick = () => {
                            (document.getElementById('record') as HTMLElement).style.display = 'none';
                            clearworkers();
                            controls?.disconnect();
                            ev.target.innerHTML = "Connect Device";
                            ev.target.onclick = () => {
                                connect();
                            }
                        }
                    }

                    
                }
    
                let sub = workers.subscribe('state',(recording)=>{
                    if(recording) {
    
                        if(detected.emg) csvworkers.emg?.run('createCSV', [
                            `data/EMG_${new Date().toISOString()}.csv`,
                            [   
                                'timestamp',
                                '0','1' //only record the first two channels for now (so much data!!)
                            ],
                            5,
                            250
                        ]);
    
                        if(detected.imu) csvworkers.imu?.run('createCSV', [
                            `data/IMU_${new Date().toISOString()}.csv`,
                            [   
                                'timestamp',
                                'ax','ay','az','gx','gy','gz','mpu_dietemp'
                            ],
                            0,
                            100
                        ]);
    
                        if(detected.ppg) csvworkers.ppg?.run('createCSV', [
                            `data/PPG_${new Date().toISOString()}.csv`,
                            [   
                                'timestamp',
                                'red','ir','hr','spo2','breath','max_dietemp'
                            ],
                            0,
                            100
                        ]);
    
                        if(detected.env) csvworkers.env?.run('createCSV', [
                            `data/ENV_${new Date().toISOString()}.csv`,
                            [   
                                'timestamp',
                                'temperature','pressure','humidity','altitude'
                            ],
                            4
                        ]);
    
                    } else {
                        visualizeDirectory('data', document.getElementById('csvs') as HTMLElement);
                    }
                },undefined, 'recording');
    
                const device = initDevice(
                    'BLE',
                    'nrf5x',
                    {
                        ondecoded:{ //after data comes back from codec
                            '0002cafe-b0ba-8bad-f00d-deadbeef0000':(data:{
                                [key:string]:number[]
                            })=>{
                                state.emg = data; 
                                if(!detected.emg) detected.emg = true;
                                if(state.recording) {
                                    csvworkers.emg?.run('appendCSV',data);
                                }
                            }, //ads131m08 (main)
                            '0003cafe-b0ba-8bad-f00d-deadbeef0000':(data:{
                                red:number[],
                                ir:number[],
                                max_dietemp:number,
                                timestamp:number
                            })=>{
                                state.ppg = data;
                                
                                if(!detected.ppg) detected.ppg = true;

                                let d = Object.assign({},data);
                                d.timestamp = genTimestamps(32, 100, data.timestamp) as any;
                                algoworkers.hr?.post('runSubprocess', d);
                                algoworkers.breath?.post('runSubprocess', d);
    
                                if(state.recording) {
                                    csvworkers.ppg?.run('appendCSV',data);
                                }
                            }, //max30102
                            '0004cafe-b0ba-8bad-f00d-deadbeef0000':(data:{
                                ax:number[],
                                ay:number[],
                                az:number[],
                                gx:number[],
                                gy:number[],
                                gz:number[],
                                mpu_dietemp:number,
                                timestamp:number
                            })=>{
                                state.imu = data;
                                if(!detected.imu) detected.imu = true;
                                if(state.recording) {
                                    csvworkers.imu?.run('appendCSV',data);
                                }
                            }, //mpu6050
                            '0005cafe-b0ba-8bad-f00d-deadbeef0000':(data:{
                                [key:string]:number[] })=>{
                                state.emg2 = data;
                            }, //extra ads131 (if plugged in)
                            '0006cafe-b0ba-8bad-f00d-deadbeef0000':(data:{
                                temp:number[],
                                pressure:number[],
                                humidity:number[], //if using BME, not available on BMP
                                altitude:number[]
                            })=>{
                                state.env = data;
                                if(!detected.env) detected.env = true;
                                if(state.recording) {
                                    csvworkers.env?.run('appendCSV',data);
                                }
                            } //bme280
                        },
                        onconnect:() => {

                            console.log('onconnect');
                            (document.getElementById('record') as HTMLElement).style.display = '';
                            
                            const sps = 250;      
                            const gain = 32;
                            const nbits = 24;
                            const vref = 1.2;
                            
                            let defaultsetting = {
                                sps, 
                                useDCBlock:false, 
                                useBandpass:false, 
                                useLowpass:true,
                                lowpassHz:30,
                                // bandpassLower:3, 
                                // bandpassUpper:45, 
                                useScaling:true, 
                                scalar:0.96 * 1000*vref/(gain*(Math.pow(2,nbits)-1)), //adjust to millivolts
                                //trimOutliers:true,
                                //outlierTolerance:0.3
                            } as FilterSettings;
    
                            const ads131m08FilterSettings:{[key:string]:FilterSettings} = {
                                '0':JSON.parse(JSON.stringify(defaultsetting)),
                                '1':JSON.parse(JSON.stringify(defaultsetting)),
                                '2':JSON.parse(JSON.stringify(defaultsetting)),
                                '3':JSON.parse(JSON.stringify(defaultsetting)),
                                '4':JSON.parse(JSON.stringify(defaultsetting)),
                                '5':JSON.parse(JSON.stringify(defaultsetting)),
                                '6':JSON.parse(JSON.stringify(defaultsetting)),
                                '7':JSON.parse(JSON.stringify(defaultsetting))
                            }
    
                            device?.then(res => {
                                res.workers.streamworker.run('setFilters', ads131m08FilterSettings); //filter the EMG results
                            });
                        },
                        ondisconnect:() => {
                            disconnect();
                        }
                    }
                )
                
                device?.then(disconnect).catch(err => {disconnect();});
            }

            connect();
            
        }
    },

    'record':{
        //workerUrl:gsworker,
        //callback:'appendCSV',
        //stopped:true,

        __element:'button',
        innerHTML:'Record',
        //style:{display:'none'},
        onclick:function (ev){ 
            this.innerHTML = 'Stop Recording'

            state.recording = true;

            this.onclick = function (ev) {
                this.innerHTML = 'Record';
                state.recording = false;
            }
        }
    },

    'ln':{
        __element:'hr'
    },

    'alertbar':{
        __element:'div'
    },

    //spaghetti in my pockets
    'PPG': new Plot({
        header: 'PPG Readings',
        state: 'ppg',
        readoutListeners: {
            'state.ppg':function(data) {
                hrAlert.check(data.bpm)
                this.innerText = `Latest:: Red: ${data.red[data.red.length-1]}; IR: ${data.ir[data.ir.length-1]}; Die Temp: ${data.max_dietemp};`
            }
        },
        getLines: () => {
            const lines = { ...max3010xChartSettings.lines} ;
            lines.hr = {sps:1, nSec:100, units:'bpm'};
            lines.hrv = {sps:1, nSec:100, units:'bpm'};
            lines.breath = {sps:1, nSec:100, units:'bpm'};
            return lines
        }
    }),
    'IMU':new Plot({
        header: 'IMU Readings',
        state: 'imu',
        readoutListeners: {
            'state.imu':function(data) {
                gyroAlert.check(data.gz)
                this.innerText = `Latest:: AX: ${data.ax[data.ax.length-1]}; AY: ${data.ay[data.ay.length-1]}; AZ: ${data.ay[data.ay.length-1]}; GX: ${data.ay[data.ay.length-1]}; GY: ${data.ay[data.ay.length-1]}; GZ: ${data.ay[data.ay.length-1]}; DIE_TEMP: ${data.mpu_dietemp}`
            }
        },
        getLines: () => {
            return mpu6050ChartSettings.lines
        }
    }),
    'EMG': new Plot({
        header: 'EMG Readings',
        state: 'emg',
        readoutListeners: {
            'state.emg':function(data) {
                this.innerText = this.innerText = `Latest:: 0:${data['0'][data['0'].length-1]}; 1:${data['1'][data['1'].length-1]}; 2:${data['2'][data['2'].length-1]}; 3:${data['3'][data['3'].length-1]}; 4:${data['4'][data['4'].length-1]}; 5:${data['5'][data['5'].length-1]}; 6:${data['6'][data['6'].length-1]}; 7:${data['7'][data['7'].length-1]};`;
            }
        },
        getLines: () => {
            return {
                0:ads131m08ChartSettings.lines?.['0'] as any,
                1:ads131m08ChartSettings.lines?.['1'] as any
            }
        }
    }),

    'ENV':new Plot({
        header: 'ENV Readings',
        state: 'env',
        readoutListeners: {
            'state.env':function(data) {
                this.innerText = this.innerText = `Latest:: Temp: ${data.temp[data.temp.length-1]}; Pressure: ${data.pressure[data.pressure.length-1]}; Altitude: ${data.altitude[data.altitude.length-1]}; Humidity: ${data.humidity?.[data.humidity?.length-1]};`
            }
        },
        getLines: () => {
            return bme280ChartSettings.lines
        }
    }),
    
    'csvs':{
        __element:'div',
        style:{ height:'200px', overflowY:'scroll', font:'Arial, Helvetica, sans-serif', fontSize:'10px' },
        __onrender:function(elm) {
            visualizeDirectory('data', this.__props as HTMLElement);
        }
    } as HTMLNodeProperties
});



// Mockup Arbitrary Alert
const arbitraryWorker = workers.addWorker({url:gsworker})

const subprocessTemplate = {
    name:'arbitrary',
    structs:{},
    oncreate: ((ctx:SubprocessContext) => {
        console.log("Created!", ctx)
    }).toString(),
    ondata: ((ctx:SubprocessContext, data:{[key:string]:any}|any) => {
        console.log("Got data!", ctx, data)
        if (data.animate) {
            console.error('MUST ANIMATE')
            const res = data.animate()
            console.error('MUST ANIMATE', data.animate, res)
        }
        return data
    }).toString(),
    props:{}
}

// NOTE: It is not possible to add a subprocess template from the main thread UNLESS YOU MANUALLY STRINGIFY FUNCTIONS
// We may want to add a worker.add() function that will do this for us
arbitraryWorker.run('addSubprocessTemplate', [
    subprocessTemplate.name, 
    subprocessTemplate.structs,
    subprocessTemplate.oncreate,
    subprocessTemplate.ondata,
    subprocessTemplate.props
]).then((...args) => {
    console.log('Set!', ...args)
}) 

arbitraryWorker.run('createSubprocess', ['arbitrary',{animate: ((...args) => Math.sin(...args)).toString() }]).then((...args) => {
    console.log("Created!", ...args)
    const id = args[0] // WHY IS THIS UNDEFINED...
    arbitraryWorker.subscribe(id, (info) => {
        console.log("Got", id, info)
        arbitraryAlgorithm.apply(info.value)
    })
})
