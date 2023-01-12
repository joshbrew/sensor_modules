import plotworker from './webglplot/canvas.worker'
import {WGLPlotter} from "./webglplot/plotter.js";
import { workers } from "device-decoder"; // '../device_debugger/src/device.frontend'//
import Container, { DisplayInfo } from '../Display';
import {WebglLineProps} from 'graphscript-services'

type PlotInfo = {
    workers?: Plot['workers'],
    state: Plot['state'],
    lines: WebglLineProps
} & DisplayInfo

class Plot extends Container { 

    workers = workers // NOTE: This isn't shared if used directly
    
    state?: string 

    lines:{ [key:string]:WebglLineProps }

    constructor (info: PlotInfo) {
        super(info)

        this.__children.ui.workers = this.workers
        this.__children.ui.state = this.state

        this.__children.ui.__onrender = function(div:HTMLElement){    
                let canvas = div.querySelector('#chart') as HTMLCanvasElement;
                let overlay = div.querySelector('#overlay') as HTMLCanvasElement;
            
                const lines = this.lines;

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
            }

            this.__children.ui.__children = {
                chart:{
                    __element:'canvas',
                    style:{height:'100%', width:'100%', backgroundColor:'black'}
                },
                overlay:{
                    __element:'canvas',
                    style:{height:'100%', width:'100%', transform:'translateY(-102%)'}
                }
            }

        this.state = info.state;
        this.lines = info.lines;
        if (info.workers) this.workers = info.workers;
        Object.defineProperty(this.__children.ui, 'workers', { get: () => this.workers, enumerable: true })
        Object.defineProperty(this.__children.ui, 'state', { get: () => this.state, enumerable: true })
        Object.defineProperty(this.__children.ui, 'lines', { get: () => this.lines, enumerable: true })

    }

}

export default Plot;