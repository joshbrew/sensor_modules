import { FilterSettings, initDevice } from "device-decoder"; // '../device_debugger/src/device.frontend'//

import gsworker from 'device-decoder/src/stream.big.worker' // '../device_debugger/src/stream.big.worker'//

import { mpu6050ChartSettings } from "device-decoder/src/devices/mpu6050.js";
import { max3010xChartSettings } from "device-decoder/src/devices/max30102.js";
import { ads131m08ChartSettings } from "device-decoder/src/devices/ads131m08.js";
import { bme280ChartSettings } from "device-decoder/src/devices/bme280.js";


import { visualizeDirectory } from 'graphscript-services.storage'//'../graphscript/src/extras/storage/BFS_CSV';
import { HTMLNodeProperties } from 'graphscript'//'../graphscript';
import {WebglLineProps} from 'graphscript-services'
import { ByteParser } from 'device-decoder/src/util/ByteParser';

// MyAlyce Custom Objects
import * as alerts from './alerts/index'
import * as algorithms from './algorithms/index'
import * as workers from './workers/index'

// Graph Component Imports
import Plot from "./components/plot/Plot";
import Container from "./components/Display";

const state = {
    ppg:{},
    emg:{},
    imu:{},
    env:{},
    emg2:{},
    arbitrary: {},
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

function genTimestamps(ct,sps,from?) {
    let now = from ? from : Date.now();
    let toInterp = [now - ct*1000/sps, now];
    return ByteParser.upsample(toInterp, ct);
}

function setReadoutText(data) {
    let html = ``
    for (let key in data) {
        const cap = key.charAt(0).toUpperCase() + key.slice(1);
        const val = data[key][data[key].length-1] ?? data[key][0]
        html += `<p><b>${cap}:</b> ${val ? (val % 1 !== 0 ? val.toFixed(5) : val) : val}</p>`
    }
    this.innerHTML = html
}

const tree = {

    state: state,
    detected: detected,

    // SET ALERTS HERE
    alerts:{
        __element:'div',
        __listeners: {
            'state.ppg':(data) => {if(data.bpm) {alerts.hr.check(data.bpm)}},
            'state.imu':(data) => {
                data.ax.map((v,i) => {
                    let mag = Math.sqrt(data.ax[i]*data.ax[i] + data.ay[i]*data.ay[i] + data.az[i]*data.az[i]);
                    alerts.imu.check(mag);
                    return mag;
                });
            },
            'state.arbitrary': (data) => algorithms.arbitrary.apply(data.value)
        }
    },



    readout: {
        __element: 'div',
        style: {
            position: 'fixed',
            top: '0px',
            right: '0px',
            width: '200px',
            height: '100vh',
            background: 'rgba(0,0,0, 0.5)',
            padding: '10px',
            overflowY: 'scroll',
            fontSize: '80%',
            zIndex: 1
        },
        __children: {
            PPG:{
                __element: 'div',
                __children: {
                    header: {
                        __element: 'h3',
                        innerText: 'PPG'
                    },
                    output: {
                        __element: 'div',
                    }
                }
            },
            IMU:{
                __element: 'div',
                __children: {
                    header: {
                        __element: 'h3',
                        innerText: 'IMU'
                    },
                    output: {
                        __element: 'div',
                    }
                }
            },
            EMG:{
                __element: 'div',
                __children: {
                    header: {
                        __element: 'h3',
                        innerText: 'EMG'
                    },
                    output: {
                        __element: 'div',
                    }
                },
            },
            ENV:{
                __element: 'div',
                __children: {
                    header: {
                        __element: 'h3',
                        innerText: 'ENV'
                    },
                    output: {
                        __element: 'div',
                    }
                },
            },
        },

        __listeners: {
            'state.ppg': function(data){
               if (this.state !== 'hidden') setReadoutText.call(this.__children.PPG.__children.output, data)
            },
            'state.imu':function(data){
                if (this.state !== 'hidden') setReadoutText.call(this.__children.IMU.__children.output, data)
             },
            'state.emg': function(data){
                if (this.state !== 'hidden') setReadoutText.call(this.__children.EMG.__children.output, data)
             },
            'state.env': function(data){
                if (this.state !== 'hidden') setReadoutText.call(this.__children.ENV.__children.output, data)
             },
        }
    },

    readoutToggle: {
        __element: 'button',
        innerText: 'Toggle Readout',
        style: {
            position: 'fixed',
            bottom: '0px',
            right: '0px',
            margin: '25px',
            zIndex: 99
        },
        toggle: function (state) {
            const readout = document.getElementById('readout') as any
            if (readout){
                if (state === 'visible' || readout.style.display === 'none') {
                    state = 'visible';
                    readout.style.display = 'block';
                } else {
                    state = 'hidden';
                    readout.style.display = 'none';
                }

                localStorage.setItem('sensormodules-readout-state', state);
                readout.node.state = state;
            }
        },
        __onconnected: function () {
            const state = localStorage.getItem('sensormodules-readout-state');
            this.toggle(state)
        },
        onclick: function () {
            this.toggle()
        }
    },

    main: {
        __element: 'div',
        style: {
            width: '100%',
            height: '100%',
            overflow: 'scroll',
            padding: '50px'
        },
        __children: {

            controls: {
                __element: 'div',
                __children: {

                    header: {
                        __element:'h2',
                        innerText:'Controls'
                    },

                    hr: {
                        __element:'hr',
                    },

                    body: {
                        __element:'div',
                        style: {
                            padding: '25px 0px'
                        },
                        __children: {
                            connect:{
                                __element:'button',
                                innerHTML:'Connect Device',
                                onclick:(ev) => { 

                                    let connect = () => {
                                        let csvworkers = {
                                            emg: workers.default.addWorker({url:gsworker}),
                                            ppg: workers.default.addWorker({url:gsworker}),
                                            imu: workers.default.addWorker({url:gsworker}),
                                            env: workers.default.addWorker({url:gsworker}),
                                            emg2: workers.default.addWorker({url:gsworker})
                                        }
                            
                                        let algoworkers = {
                                            hr: workers.default.addWorker({url:gsworker}),
                                            breath: workers.default.addWorker({url:gsworker}),
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
                            
                                            workers.default.unsubscribe('state',sub,'recording');
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
                            
                                        let sub = workers.default.subscribe('state',(recording)=>{
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
                            toggleArbitraryAlert:{
                                subId: undefined,
                                __element:'button',
                                innerText:'Start Arbitrary Alert',
                                onclick: function () {

                                    if (this.subId) {
                                        this.innerText = 'Start Arbitrary Alert'
                                        workers.arbitrary.run('destroySubprocess', this.subId)
                                        this.subId = undefined
                                    } else {

                                        
                                        workers.arbitrary.run('createSubprocess', ['arbitrary',{transform: (function(inp) {return Math.sin(inp)}).toString() }]).then((id) => {
                                            console.log("Created subprocess for arbitrary worker:", id)
                                            workers.arbitrary.subscribe(id,  (value) => state.arbitrary = { value })
                                            this.subId = id
                                            this.innerText = 'Stop Arbitrary Alert'

                                            // Animate the arbitrary worker transformation
                                            const animation = () => {
                                                const now = Date.now() / 1000
                                                workers.arbitrary.run('runSubprocess', now); // Generating data for arbitrary worker
                                                if (this.subId) setTimeout(animation, 1000/60)
                                            }
                                            
                                            animation()
                                            
                                        })
                                    
                                    }
                                }
                            }
                        }
                    },
                }
            },

            displays: {
                __element:'div',
                __children: {
                    header: {
                        __element:'h2',
                        innerText:'Modules'
                    },
                    hr: {
                        __element:'hr',
                    },
                    body: {
                        __element:'div',
                        style: {
                            display:'flex',
                            flexWrap: 'wrap',
                            padding: '25px 0px'
                        },
                        __children: {
                            PPG: new Plot({
                                header: 'PPG Readings',
                                state: 'ppg',
                                lines:  {
                                    ...max3010xChartSettings.lines,
                                    hr: {sps:1, nSec:100, units:'bpm'},
                                    hrv: {sps:1, nSec:100, units:'bpm'},
                                    breath: {sps:1, nSec:100, units:'bpm'}

                                }
                            }),
                            IMU:new Plot({
                                header: 'IMU Readings',
                                state: 'imu',
                                lines:  mpu6050ChartSettings.lines as {[key:string]: WebglLineProps}
                                
                            }),
                            EMG: new Plot({
                                header: 'EMG Readings',
                                state: 'emg',
                                lines: {
                                        0:ads131m08ChartSettings.lines?.['0'] as WebglLineProps,
                                        1:ads131m08ChartSettings.lines?.['1'] as WebglLineProps
                                    }
                            }),
                        
                            ENV:new Plot({
                                header: 'ENV Readings',
                                state: 'env',
                                lines: bme280ChartSettings.lines as {[key:string]: WebglLineProps}
                                
                            }),


                            csvs: new Container({
                                header: 'CSVs',
                                __onconnected: function (){
                                    const body = this.__children.body
                                    body.style.overflowY = 'scroll';
                                    body.style.fontSize = '10px';

                                },
                                __onrender:function(elm) {
                                    visualizeDirectory('data', this.__children.body.__props as HTMLElement);

                                    // Create a record button
                                    const recordButton = document.createElement('button')
                                    recordButton.id = 'record'
                                    recordButton.innerHTML = 'Record';
                                    recordButton.style.position = 'absolute'; 
                                    recordButton.style.top = '0px';
                                    recordButton.style.right = '0px';
                                    recordButton.onclick = function (ev){ 
                                        recordButton.innerHTML = 'Stop Recording'
                    
                                        state.recording = true;

                                        this.onclick = function (ev) {
                                            recordButton.innerHTML = 'Record';
                                            state.recording = false;
                                        }
                                    }

                                    elm.appendChild(recordButton);
                                }
                            })  as HTMLNodeProperties
                        }
                    }
                }
            },
        },
}
}

export default tree