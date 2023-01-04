import { FilterSettings, initDevice, workers } from '../device_debugger/src/device.frontend'//"device-decoder";

import plotworker from './modules/webglplot/canvas.worker'
import gsworker from '../device_debugger/src/stream.big.worker'//'device-decoder/stream.big.worker.js'

import { mpu6050ChartSettings } from "device-decoder/src/devices/mpu6050.js";
import { max3010xChartSettings } from "device-decoder/src/devices/max30102.js";
import { ads131m08ChartSettings } from "device-decoder/src/devices/ads131m08.js";
import { bme280ChartSettings } from "device-decoder/src/devices/bme280.js";

import {htmlloader} from 'graphscript'//'../graphscript/'
import {Howl} from 'howler'

import {WGLPlotter} from "./modules/webglplot/plotter.js";
import { visualizeDirectory } from 'graphscript-services.storage'//'../graphscript/src/extras/storage/BFS_CSV';
import { HTMLNodeProperties } from 'graphscript'//'../graphscript';
import { Math2 } from 'brainsatplay-math';
import { ByteParser } from 'device-decoder/src/util/ByteParser';

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


let heartrateAvgCt = 5;
let breathrateAvgCt = 5;

let heartrateUpperBound = 150;
let heartrateLowerBound = 25;

workers.__node.loaders.html = htmlloader;

function genTimestamps(ct,sps,from?) {
    let now = from ? from : Date.now();
    let toInterp = [now - ct*1000/sps, now];
    return ByteParser.upsample(toInterp, ct);
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
                    breath:workers.addWorker({url:gsworker})
                };
    
                let lasthr = [] as number[];

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
    
                        lasthr.push(heartbeat.bpm);
                        if(lasthr.length > heartrateAvgCt) lasthr.pop();
    
                        if(lasthr.length === heartrateAvgCt) {
                            let average = Math2.mean(lasthr);
                            if(average < heartrateLowerBound) {
                                new Howl({src:'./sounds/alarm.wav'}).play();
                                let elm = document.getElementById('alertbar') as HTMLElement;
                                elm.style.backgroundColor = 'red';
                                elm.style.color = 'white';
                                elm.innerHTML = (`!!! Average Heart Rate is too low: ${average} at ${new Date().toISOString()} !!!`);
                            }
                            if(average > heartrateUpperBound) {
                                new Howl({src:'./sounds/alarm.wav'}).play();
                                let elm = document.getElementById('alertbar') as HTMLElement;
                                elm.style.backgroundColor = 'red';
                                elm.style.color = 'white';
                                elm.innerHTML = (`!!! Average Heart Rate is too low: ${average} at ${new Date().toISOString()} !!!`);
                            }
                        }
                        //also e.g. erratic readings mean it's likely a bad signal since it would be picking up random noise
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
                            clearworkers();
                            controls?.disconnect();
                            ev.target.innerHTML = "Connect Device";
                            ev.target.onclick = () => {
                                connect();
                            }
                        }
                    }

                    (document.getElementById('record') as HTMLElement).style.display = 'none';
                }
    
                let sub = workers.subscribe('state',(recording)=>{
                    if(recording) {
    
                        if(detected.emg) csvworkers.emg?.run('createCSV', [
                            `data/EMG_${new Date().toISOString()}`,
                            [   
                                'timestamp',
                                '0','1' //only record the first two channels for now (so much data!!)
                            ],
                            5,
                            250
                        ]);
    
                        if(detected.imu) csvworkers.imu?.run('createCSV', [
                            `data/IMU_${new Date().toISOString()}`,
                            [   
                                'timestamp',
                                'ax','ay','az','gx','gy','gz','mpu_dietemp'
                            ],
                            0,
                            100
                        ]);
    
                        if(detected.ppg) csvworkers.ppg?.run('createCSV', [
                            `data/PPG_${new Date().toISOString()}`,
                            [   
                                'timestamp',
                                'red','ir','hr','spo2','breath','max_dietemp'
                            ],
                            0,
                            100
                        ]);
    
                        if(detected.env) csvworkers.env?.run('createCSV', [
                            `data/ENV_${new Date().toISOString()}`,
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
                                lowpassHz:45,
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
        style:{display:'none'},
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
    'PPG':{
        __element:'div',
        __children:{
            header:{
                __element:'div',
                innerHTML:`PPG Readings`
            },
            chartarea:{
                __element:'div',
                style:{height:'300px'},
                __onrender:function(div:HTMLElement){    
                    let canvas = div.querySelector('#chart') as HTMLCanvasElement;
                    let overlay = div.querySelector('#overlay') as HTMLCanvasElement;
                
                    (max3010xChartSettings.lines as any).hr = {sps:1, nSec:100, units:'bpm'};
                    (max3010xChartSettings.lines as any).hrv = {sps:1, nSec:100, units:'bpm'};
                    (max3010xChartSettings.lines as any).breath = {sps:1, nSec:100, units:'bpm'};

                    let plotter = new WGLPlotter({
                        canvas,
                        overlay,
                        lines:max3010xChartSettings.lines as any,
                        worker:plotworker,
                        generateNewLines:false
                    });

                    (plotter as any).__listeners = {
                        'state.ppg':function(data) { this.__operator(data); }
                    }

                    workers.add(plotter);
                },
                __children:{
                    chart:{
                        __element:'canvas',
                        style:{height:'100%', width:'100%', backgroundColor:'black'}
                    },
                    overlay:{
                        __element:'canvas',
                        style:{height:'100%', width:'100%', transform:'translateY(-102%)'}
                    }
                }
            },
            readout:{
                __element:'div',
                innerText:'Latest::',
                __listeners:{
                    'state.ppg':function(data) {
                        if(data?.red) this.innerText = `Latest:: Red: ${data.red[data.red.length-1]}; IR: ${data.ir[data.ir.length-1]}; Die Temp: ${data.max_dietemp};`
                    }
                }
            },
            ln:{
                __element:'hr'
            }
        }
    },

    'IMU':{
        __element:'div',
        __children:{
            header:{
                __element:'div',
                innerHTML:`IMU Readings`
            },
            chartarea:{
                __element:'div',
                style:{height:'300px'},
                __onrender:function(div:HTMLElement){    
                    let canvas = div.querySelector('#chart') as HTMLCanvasElement;
                    let overlay = div.querySelector('#overlay') as HTMLCanvasElement;
                
                    let plotter = new WGLPlotter({
                        canvas,
                        overlay,
                        lines:mpu6050ChartSettings.lines as any,
                        worker:plotworker,
                        generateNewLines:false
                    });

                    (plotter as any).__listeners = {
                        'state.imu':function(data) { this.__operator(data); }
                    }

                    workers.add(plotter);
                },
                __children:{
                    chart:{
                        __element:'canvas',
                        style:{height:'100%', width:'100%', backgroundColor:'black'}
                    },
                    overlay:{
                        __element:'canvas',
                        style:{height:'100%', width:'100%', transform:'translateY(-102%)'}
                    }
                }
            },
            readout:{
                __element:'div',
                innerText:'Latest::',
                __listeners:{
                    'state.imu':function(data) {
                        this.innerText = `Latest:: AX: ${data.ax[data.ax.length-1]}; AY: ${data.ay[data.ay.length-1]}; AZ: ${data.ay[data.ay.length-1]}; GX: ${data.ay[data.ay.length-1]}; GY: ${data.ay[data.ay.length-1]}; GZ: ${data.ay[data.ay.length-1]}; DIE_TEMP: ${data.mpu_dietemp}`
                    }
                }
            },
            ln:{
                __element:'hr'
            }
        }
    },

    'EMG':{
        __element:'div',
        __children:{
            header:{
                __element:'div',
                innerHTML:`EMG Readings`
            },
            chartarea:{
                __element:'div',
                style:{height:'300px'},
                __onrender:function(div:HTMLElement){    
                    let canvas = div.querySelector('#chart') as HTMLCanvasElement;
                    let overlay = div.querySelector('#overlay') as HTMLCanvasElement;
                
                    let plotter = new WGLPlotter({
                        canvas,
                        overlay,
                        lines:{
                            0:ads131m08ChartSettings.lines?.['0'] as any,
                            1:ads131m08ChartSettings.lines?.['1'] as any
                        },
                        worker:plotworker,
                        generateNewLines:false
                    });

                    (plotter as any).__listeners = {
                        'state.emg':function(data) { this.__operator(data); }
                    }

                    workers.add(plotter);
                },
                __children:{
                    chart:{
                        __element:'canvas',
                        style:{height:'100%', width:'100%', backgroundColor:'black'}
                    },
                    overlay:{
                        __element:'canvas',
                        style:{height:'100%', width:'100%', transform:'translateY(-102%)'}
                    }
                }
            },
            readout:{
                __element:'div',
                innerText:'Latest::',
                __listeners:{
                    'state.emg':function(data) {
                        this.innerText = `Latest:: 0:${data['0'][data['0'].length-1]}; 1:${data['1'][data['1'].length-1]}; 2:${data['2'][data['2'].length-1]}; 3:${data['3'][data['3'].length-1]}; 4:${data['4'][data['4'].length-1]}; 5:${data['5'][data['5'].length-1]}; 6:${data['6'][data['6'].length-1]}; 7:${data['7'][data['7'].length-1]};`;
                    }
                }
            },
            ln:{
                __element:'hr'
            }
        }
    },

    'ENV':{
        __element:'div',
        __children:{
            header:{
                __element:'div',
                innerHTML:`ENV Readings`
            },
            chartarea:{
                __element:'div',
                style:{height:'300px'},
                __onrender:function(div:HTMLElement){    
                    let canvas = div.querySelector('#chart') as HTMLCanvasElement;
                    let overlay = div.querySelector('#overlay') as HTMLCanvasElement;
                
                    let plotter = new WGLPlotter({
                        canvas,
                        overlay,
                        lines:bme280ChartSettings.lines as any,
                        worker:plotworker,
                        generateNewLines:false
                    });

                    (plotter as any).__listeners = {
                        'state.env':function(data) { this.__operator(data); }
                    }

                    workers.add(plotter);
                },
                __children:{
                    chart:{
                        __element:'canvas',
                        style:{height:'100%', width:'100%', backgroundColor:'black'}
                    },
                    overlay:{
                        __element:'canvas',
                        style:{height:'100%', width:'100%', transform:'translateY(-102%)'}
                    }
                }
            },
            readout:{
                __element:'div',
                innerText:'Latest::',
                __listeners:{
                    'state.env':function(data) {
                        this.innerText = `Latest:: Temp: ${data.temp[data.temp.length-1]}; Pressure: ${data.pressure[data.pressure.length-1]}; Altitude: ${data.altitude[data.altitude.length-1]}; Humidity: ${data.humidity?.[data.humidity?.length-1]};`
                    }
                }
            },
            ln:{
                __element:'hr'
            }
        }
    },
    
    'csvs':{
        __element:'div',
        style:{ height:'200px', overflowY:'scroll', font:'Arial, Helvetica, sans-serif', fontSize:'10px' },
        __onrender:function(elm) {
            visualizeDirectory('data', this.__props as HTMLElement);
        }
    } as HTMLNodeProperties
});
