import { initDevice } from "device-decoder";

import * as components from './components/index.js';


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
                    console.log(data)
                    components.eeg.default(data)
                    components.emg.default(data)

                }, //ads131m08 (main)
                '0003cafe-b0ba-8bad-f00d-deadbeef0000':(data:{
                    red:number[],
                    ir:number[],
                    max_dietemp:number,
                    timestamp:number
                })=>{

                    console.log(data)
                    components.heg.default(data)

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
                    console.log(data)
                    components.generic.accelerometer({
                        x:data.ax,
                        y:data.ay,
                        z:data.az,
                        timestamp: data.timestamp
                    })

                    components.generic.gyroscope({
                        x:data.gx,
                        y:data.gy,
                        timestamp: data.timestamp
                    })

                }, //mpu6050
                '0005cafe-b0ba-8bad-f00d-deadbeef0000':(data:{
                    [key:string]:number[] })=>{
                    console.log(data)
                    components.eeg.default(data)
                    components.emg.default(data)

                }, //extra ads131 (if plugged in)
                '0006cafe-b0ba-8bad-f00d-deadbeef0000':(data:{
                    temp:number[],
                    pressure:number[],
                    humidity:number[], //if using BME, not available on BMP
                    altitude:number[]
                })=>{

                    console.log(data)
                    components.environment.temperature(data)
                    components.environment.pressure(data)
                    components.environment.humidity(data)
                    components.environment.altitude(data)

                } //bme280
            }
        }
    )
 }

 document.body.insertAdjacentElement('beforeend',connect)