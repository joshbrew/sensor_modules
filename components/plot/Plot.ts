import plotworker from './webglplot/canvas.worker'
import {WGLPlotter} from "./webglplot/plotter.js";
import { workers } from "device-decoder"; // '../device_debugger/src/device.frontend'//
import Container, { ContainerInfo } from '../Display';

type PlotInfo = {
    workers?: Plot['workers'],
    state: Plot['state'],
    getLines: Plot['getLines']
} & ContainerInfo

class Plot extends Container{ 

    workers = workers // NOTE: This isn't shared if used directly
    
    state?: string 

    getLines?: () => {[key:string]:any} | undefined

    constructor (info: PlotInfo) {
        super(info)

        this.__children.body.workers = this.workers
        this.__children.body.state = this.state

        this.__children.body.__onrender = function(div:HTMLElement){    
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
            }

            this.__children.body.__children = {
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
        this.getLines = info.getLines;
        if (info.workers) this.workers = info.workers;
        Object.defineProperty(this.__children.body, 'workers', { get: () => this.workers, enumerable: true })
        Object.defineProperty(this.__children.body, 'state', { get: () => this.state, enumerable: true })
        Object.defineProperty(this.__children.body, 'getLines', { get: () => this.getLines, enumerable: true })

    }

}

export default Plot;