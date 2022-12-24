import { initDevice } from "device-decoder";
import { CanvasControls } from "graphscript/dist/services/worker/WorkerCanvas.js";

import * as components from './components/index.js';


import * as plotter from "./modules/webglplot/plotter.js";

let canvas = document.createElement('canvas');
let overlay = document.createElement('canvas');

canvas.style.backgroundColor = 'black';
canvas.style.position = 'absolute';
canvas.style.width = '100%';
canvas.style.height = '100%';
//canvas.width = 500;
//canvas.height = 500;
overlay.style.position = 'absolute';
overlay.style.width = canvas.style.width;
overlay.style.height = canvas.style.height;
// overlay.width = 500;
// overlay.height = 500;

document.body.appendChild(canvas);
document.body.appendChild(overlay);

let sampleCt = 1000;

const plotterInstance = Object.assign(Object.assign({}, plotter), {
    canvas,
    overlay,
    options: {
        worker: true, //use an offscreen canvas // TODO: Properly load workers from text
        overlayFont:'10px Verdana',
        overlayColor:'orange',
        generateNewLines: true,
        cleanGeneration: false,
        lines: {},
        //lineWidth: 0.004,
        
        // lines:{
        //     '0':{
        //         values:new Array(sampleCt).fill(0).map((v,i)=>{ return Math.sin(2*Math.PI*(5)*(Date.now()/1000+(i/sampleCt))); }),
        //         width:0.1,
        //         color:[0,255,255,1],
        //         ymin:-0.5
        //     },
        //     '1':{
        //         values:new Array(sampleCt).fill(0).map((v,i)=>{ return 1+Math.sin(2*Math.PI*(15)*(Date.now()/1000+(i/sampleCt))); }),
        //         //width:2,
        //         color:[0,255,0,1]
        //     },
        //     '2':{
        //         values:new Array(sampleCt).fill(0).map((v,i)=>{ return 2+0.5*Math.sin(2*Math.PI*(10)*(Date.now()/1000+(i/sampleCt))); }),
        //         //width:2,
        //         color:[255,255,0,1]
        //     },
        //     '3':{
        //         values:new Array(sampleCt).fill(0).map((v,i)=>{ return 0.5*Math.sin(2*Math.PI*(25)*(Date.now()/1000+(i/sampleCt))); }),
        //         //width:2,
        //         color:[0,255,0,1]
        //     },
        //     '4':{
        //         values:new Array(sampleCt).fill(0).map((v,i)=>{ return 0.5*Math.sin(2*Math.PI*(1)*(Date.now()/1000+(i/sampleCt))); }),
        //         //width:2,
        //         color:[0,255,0,1]
        //     },
        //     '5':{
        //         values:new Array(sampleCt).fill(0).map((v,i)=>{ return 0.5*Math.sin(2*Math.PI*(3)*(Date.now()/1000+(i/sampleCt))); }),
        //         //width:2,
        //         color:[0,255,0,1]
        //     }
        // }
    }
});



console.log("Plot: ", plotterInstance);

let count = 0;
let delay = 100;
let anim = () => {

    let now = Date.now()

    const arr1 = new Array(sampleCt).fill(0).map((v,i)=>{ return Math.sin(2*Math.PI*(5)*(now/1000+(i/sampleCt))); })
    const arr2 = new Array(sampleCt).fill(0).map((v,i)=>{ return 1+Math.sin(2*Math.PI*(15)*(now/1000+(i/sampleCt))); })
    const arr3 = new Array(sampleCt).fill(0).map((v,i)=>{ return 2+0.5*Math.sin(2*Math.PI*(10)*(now/1000+(i/sampleCt))); })
    const arr4 = new Array(sampleCt).fill(0).map((v,i)=>{ return 0.5*Math.sin(2*Math.PI*(25)*(now/1000+(i/sampleCt))); })
    const arr5 = new Array(sampleCt).fill(0).map((v,i)=>{ return 0.5*Math.sin(2*Math.PI*(1)*(now/1000+(i/sampleCt))); })
    const arr6 = new Array(sampleCt).fill(0).map((v,i)=>{ return 0.5*Math.sin(2*Math.PI*(3)*(now/1000+(i/sampleCt))); })

    const obj = {
        0:arr1,
        1:arr2,
        2:arr3,
        3:arr4,
        4:arr5,
        5:arr6
    }

    // const selected = count%6

    // plotterInstance.default({[selected]: obj[selected]})
    plotterInstance.default(obj)

    count+=sampleCt;
    // plotterInstance.default({
    //     '0':{
    //         values:arr1,
    //     },
    //     '1':arr2,
    //     '2':arr3,
    //     '3': arr4,
    //     '4': arr5,
    //     '5': arr6
    // })

     //setTimeout(() => {
        requestAnimationFrame(anim);
     //}, 100);
}

// Wait for three seconds to start animation
setTimeout(() => anim());

let connect = document.createElement('button');
connect.innerText = 'Connect'

connect.onclick = () => { 
    initDevice(
        'BLE',
        'nrf5x',
        {
            ondecoded:{ //after data comes back from codec
                '0002cafe-b0ba-8bad-f00d-deadbeef0000':(data:{
                    [key:string]:number[]
                })=>{
                    console.log(data);
                    components.eeg.default(data);
                    components.emg.default(data);
                }, //ads131m08 (main)
                '0003cafe-b0ba-8bad-f00d-deadbeef0000':(data:{
                    red:number[],
                    ir:number[],
                    max_dietemp:number,
                    timestamp:number
                })=>{
                    console.log(data);
                    components.heg.default(data);
                }, //max30102
                '0004cafe-b0ba-8bad-f00d-deadbeef0000':(data:{
                    ax:number[],
                    ay:number[],
                    az:number[],
                    gx:number[],
                    gy:number[],
                    mpu_dietemp:number,
                    timestamp:number
                })=>{
                    console.log(data);
                    components.generic.accelerometer({
                        x:data.ax,
                        y:data.ay,
                        z:data.az,
                        timestamp: data.timestamp
                    });
                    components.generic.gyroscope({
                        x:data.gx,
                        y:data.gy,
                        timestamp: data.timestamp
                    });
                }, //mpu6050
                '0005cafe-b0ba-8bad-f00d-deadbeef0000':(data:{
                    [key:string]:number[] })=>{
                    console.log(data);
                    components.eeg.default(data);
                    components.emg.default(data);

                }, //extra ads131 (if plugged in)
                '0006cafe-b0ba-8bad-f00d-deadbeef0000':(data:{
                    temp:number[],
                    pressure:number[],
                    humidity:number[], //if using BME, not available on BMP
                    altitude:number[]
                })=>{

                    console.log(data);
                    components.environment.temperature(data);
                    components.environment.pressure(data);
                    components.environment.humidity(data);
                    components.environment.altitude(data);

                } //bme280
            }
        }
    )
 }

 document.body.insertAdjacentElement('beforeend',connect)