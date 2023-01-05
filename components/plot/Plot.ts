import plotworker from './webglplot/canvas.worker'
import {WGLPlotter} from "./webglplot/plotter.js";
import { workers } from "device-decoder"; // '../device_debugger/src/device.frontend'//

type PlotInfo = {
    workers: Plot['workers'],
    state: Plot['state'],
    header: string,
    readoutListeners: {[key:string]:Function},
    getLines: Plot['getLines']
}

class Plot { 
    workers = workers // NOTE: This isn't shared if used directly
    state?: string 
    getLines?: () => {[key:string]:any} | undefined
    __element = 'div'
    __children = {
        header:{
            __element: 'div',
            innerHTML: 'Graph Visualization'
        },
        chartarea:{
            workers: this.workers,
            state: this.state,
            __element:'div',
            style:{ height:'200px' },
            __onrender:function(div:HTMLElement, node){    
                let canvas = div.querySelector('#chart') as HTMLCanvasElement;
                let overlay = div.querySelector('#overlay') as HTMLCanvasElement;
            
                const lines = this.getLines();

                let plotter = new WGLPlotter({
                    canvas,
                    overlay,
                    lines,
                    worker:plotworker,
                    generateNewLines:false
                });

                if (this.state) {
                    (plotter as any).__listeners = {
                        [`state.${this.state}`]:function(data) { 
                            this.__operator(data); 
                        }
                    }
                }

                this.workers.add(plotter);
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
            __listeners: {}
        },
        ln:{
            __element:'hr'
        }
    }

    constructor (info: PlotInfo) {
        this.state = info.state;
        this.__children.header.innerHTML = info.header;
        this.__children.readout.__listeners = info.readoutListeners
        this.getLines = info.getLines;

        if (info.workers) this.workers = info.workers;
        Object.defineProperty(this.__children.chartarea, 'workers', { get: () => this.workers, enumerable: true })
        Object.defineProperty(this.__children.chartarea, 'state', { get: () => this.state, enumerable: true })
        Object.defineProperty(this.__children.chartarea, 'getLines', { get: () => this.getLines, enumerable: true })

    }

}

export default Plot;