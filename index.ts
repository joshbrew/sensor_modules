import { initDevice, workers } from '../device_debugger/src/device.frontend'//"device-decoder";

import plotworker from './modules/webglplot/canvas.worker'
import gsworker from '../device_debugger/src/stream.big.worker'//'device-decoder/stream.big.worker.js'

import { mpu6050ChartSettings } from "device-decoder/devices/mpu6050.js";
import { max3010xChartSettings } from "device-decoder/devices/max30102.js";
import { ads131m08ChartSettings, ads131m08FilterSettings } from "device-decoder/devices/ads131m08.js";
import { bme280ChartSettings } from "device-decoder/devices/bme280.js";

import {htmlloader} from 'graphscript'
import { CanvasControls } from "graphscript/dist/services/worker/WorkerCanvas.js";


import {WGLPlotter} from "./modules/webglplot/plotter.js";


const state = {
    ppg:{},
    emg:{},
    imu:{},
    env:{},
    emg2:{}
}

workers.__node.loaders.html = htmlloader;

workers.load({

    state:state,

    'connect':{
        __element:'button',
        innerHTML:'Connect Device',
        onclick:() => { 

            const device = initDevice(
                'BLE',
                'nrf5x',
                {
                    ondecoded:{ //after data comes back from codec
                        '0002cafe-b0ba-8bad-f00d-deadbeef0000':(data:{
                            [key:string]:number[]
                        })=>{

                            state.emg = data;

                        }, //ads131m08 (main)
                        '0003cafe-b0ba-8bad-f00d-deadbeef0000':(data:{
                            red:number[],
                            ir:number[],
                            max_dietemp:number,
                            timestamp:number
                        })=>{

                            state.ppg = data;
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

                        } //bme280
                    },
                    onconnect:() => {
                        device?.then(res => {res.workers.streamworker.run('setFilters', ads131m08FilterSettings)});
                    },
                    roots:{
                        'record':{
                            workerUrl:gsworker,
                            callback:'appendCSV',
                            stopped:true,

                            __element:'button',
                            innerHTML:'Record',
                            onclick:function (ev){ 
                                ev.target.innerHTML = 'Stop Recording'

                                ev.target.node.worker.run('createCSV', [
                                    `data/${new Date().toISOString()}`,
                                    [   
                                        'timestamp',
                                        'ax','ay','az','gx','gy','gz','mpu_dietemp'
                                    ],
                                    5,
                                    100
                                ])
                                
                                ev.target.onclick = function (ev) {
                                    ev.target.innerHTML = 'Record';
                                }
                            },
                            __onconnected:function(node) {
                                
                            }
                        }
                    }
                }
            )
        }
    },

    lnm:{
        __element:'hr'
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
                style:{height:'200px'},
                __onrender:function(div:HTMLElement){    
                    let canvas = div.querySelector('#chart') as HTMLCanvasElement;
                    let overlay = div.querySelector('#overlay') as HTMLCanvasElement;
                
                    let plotter = new WGLPlotter({
                        canvas,
                        overlay,
                        lines:max3010xChartSettings.lines as any,
                        worker:plotworker
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
                        this.__props.innerText = `Latest:: Red: ${data.red[data.red.length-1]}; IR: ${data.ir[data.ir.length-1]}; Die Temp: ${data.max_dietemp};`
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
                style:{height:'200px'},
                __onrender:function(div:HTMLElement){    
                    let canvas = div.querySelector('#chart') as HTMLCanvasElement;
                    let overlay = div.querySelector('#overlay') as HTMLCanvasElement;
                
                    let plotter = new WGLPlotter({
                        canvas,
                        overlay,
                        lines:mpu6050ChartSettings.lines as any,
                        worker:plotworker
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
                        this.__props.innerText = `Latest:: AX: ${data.ax[data.ax.length-1]}; AY: ${data.ay[data.ay.length-1]}; AZ: ${data.ay[data.ay.length-1]}; GX: ${data.ay[data.ay.length-1]}; GY: ${data.ay[data.ay.length-1]}; GZ: ${data.ay[data.ay.length-1]}; DIE_TEMP: ${data.mpu_dietemp}`
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
                style:{height:'200px'},
                __onrender:function(div:HTMLElement){    
                    let canvas = div.querySelector('#chart') as HTMLCanvasElement;
                    let overlay = div.querySelector('#overlay') as HTMLCanvasElement;
                
                    let plotter = new WGLPlotter({
                        canvas,
                        overlay,
                        lines:bme280ChartSettings.lines as any,
                        worker:plotworker
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
                        this.__props.innerText = `Latest:: Temp: ${data.temp[data.temp.length-1]}; Pressure: ${data.pressure[data.pressure.length-1]}; Altitude: ${data.altitude[data.altitude.length-1]}; Humidity: ${data.humidity[data.humidity.length-1]};`
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
                style:{height:'200px'},
                __onrender:function(div:HTMLElement){    
                    let canvas = div.querySelector('#chart') as HTMLCanvasElement;
                    let overlay = div.querySelector('#overlay') as HTMLCanvasElement;
                
                    let plotter = new WGLPlotter({
                        canvas,
                        overlay,
                        lines:ads131m08ChartSettings.lines as any,
                        worker:plotworker
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
                        this.__props.innerText = `Latest:: 0:${data['0'][data['0'].length-1]}; 1:${data['1'][data['1'].length-1]}; 2:${data['2'][data['2'].length-1]}; 3:${data['3'][data['3'].length-1]}; 4:${data['4'][data['4'].length-1]}; 5:${data['5'][data['5'].length-1]}; 6:${data['6'][data['6'].length-1]}; 7:${data['7'][data['7'].length-1]};`;
                    }
                }
            },
            ln:{
                __element:'hr'
            }
        }
    }
});
