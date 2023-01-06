import { FilterSettings, initDevice, workers } from "device-decoder"; // '../device_debugger/src/device.frontend'//

import gsworker from '../device_debugger/src/stream.big.worker'//'device-decoder/stream.big.worker.js'

import { mpu6050ChartSettings } from "device-decoder/src/devices/mpu6050.js";
import { max3010xChartSettings } from "device-decoder/src/devices/max30102.js";
import { ads131m08ChartSettings } from "device-decoder/src/devices/ads131m08.js";
import { bme280ChartSettings } from "device-decoder/src/devices/bme280.js";

import {htmlloader, SubprocessContext} from 'graphscript'//'../graphscript/'

import { visualizeDirectory } from 'graphscript-services.storage'//'../graphscript/src/extras/storage/BFS_CSV';
import { HTMLNodeProperties } from 'graphscript'//'../graphscript';
import {WebglLineProps} from 'graphscript-services'
import { ByteParser } from 'device-decoder/src/util/ByteParser';

// Alert Imports
import Alert from './alerts/Alert';
import heartRateAlertSettings from './alerts/heartrate';
import gyroAlertSettings from './alerts/gyro';
import Algorithm from "./algorithms/Algorithm";

// Graph Component Imports
import Plot from "./components/plot/Plot";
import Container from "./components/Display";



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

function setReadoutText(data) {
    console.log('SETTING')
    let html = ``
    for (let key in data) {
        const cap = key.charAt(0).toUpperCase() + key.slice(1);
        const val = data[key][data[key].length-1] ?? data[key][0]
        html += `<p><b>${cap}:</b> ${val ? (val % 1 !== 0 ? val.toFixed(5) : val) : val}</p>`
    }
    this.innerHTML = html
}

// Create Alerts
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

    // SET ALERTS HERE
    alerts:{
        __element:'div',
        __listeners: {
            'state.ppg':(data) => hrAlert.check(data.bpm),
            'state.imu':(data) => gyroAlert.check(data.gz),
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
            fontSize: '80%'
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
            width: '100vw',
            height: '100vh',
            overflow: 'scroll',
        },
        __children: {

            connect:{
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

            record:{
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

            displays: {
                __element:'div',
                style: {
                    display:'flex',
                    flexWrap: 'wrap',
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
                            this.__children.body.style.overflowY = 'scroll';
                            this.__children.body.style.fontSize = '10px';
                        },
                        __onrender:function(elm) {
                            visualizeDirectory('data', this.__children.body.__props as HTMLElement);
                        }
                    })  as HTMLNodeProperties
                }
            },
        },
}
});



// Mockup Arbitrary Alert
const arbitraryWorker = workers.addWorker({url:gsworker})

const subprocessTemplate = {
    name:'arbitrary',
    structs:{},
    oncreate: ((ctx:SubprocessContext) => {

        function parseFunctionFromText(method='') {
            //Get the text inside of a function (regular or arrow);
            let getFunctionBody = (methodString) => {
                return methodString.replace(/^\W*(function[^{]+\{([\s\S]*)\}|[^=]+=>[^{]*\{([\s\S]*)\}|[^=]+=>(.+))/i, '$2$3$4');
            }
        
            let getFunctionHead = (methodString) => {
                let startindex = methodString.indexOf('=>')+1;
                if(startindex <= 0) {
                    startindex = methodString.indexOf('){');
                }
                if(startindex <= 0) {
                    startindex = methodString.indexOf(') {');
                }
                return methodString.slice(0, methodString.indexOf('{',startindex) + 1);
            }
        
            let newFuncHead = getFunctionHead(method);
            let newFuncBody = getFunctionBody(method);
        
        
            let newFunc;
            if (newFuncHead.includes('function')) {
                let varName = newFuncHead.split('(')[1].split(')')[0]
                newFunc = new Function(varName, newFuncBody);
            } else {
                if(newFuncHead.substring(0,6) === newFuncBody.substring(0,6)) {
                //newFuncBody = newFuncBody.substring(newFuncHead.length);
                let varName = newFuncHead.split('(')[1].split(')')[0]
                //console.log(varName, newFuncHead ,newFuncBody);
                newFunc = new Function(varName, newFuncBody.substring(newFuncBody.indexOf('{')+1,newFuncBody.length-1));
                }
                else {
                try {newFunc = (0,eval)(newFuncHead + newFuncBody + "}");} catch {}
                }
            }
        
            return newFunc;
        
        }
        if(typeof ctx.animate === 'string') ctx.animate = parseFunctionFromText(ctx.animate);
        console.log("Created!", ctx)
    }).toString(),
    ondata: ((ctx:SubprocessContext, data:{[key:string]:any}|any) => {
        console.log("Got data!", ctx, data)
        console.log(ctx.animate);
        if (ctx.animate) {
            console.error('MUST ANIMATE')
            const res = ctx.animate(data);
            console.error('MUST ANIMATE RESULT:', res)
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

arbitraryWorker.run('createSubprocess', ['arbitrary',{animate: (function(inp) {console.log(inp); return Math.sin(inp)}).toString() }]).then((...args) => {
    console.log("Created!", ...args)
    const id = args[0] 
    arbitraryWorker.subscribe(id, (info) => {
        console.log("Got", id, info)
        arbitraryAlgorithm.apply(info.value)
    })
})

arbitraryWorker.run('runSubprocess', Date.now());
