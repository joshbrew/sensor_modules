import {WebglLinePlotUtil, WebglLinePlotProps} from 'webgl-plot-utils';
let plotter = new WebglLinePlotUtil();

import canvasworker from './canvas.worker'

import { CanvasControls, CanvasProps, workerCanvasRoutes } from 'graphscript/services/worker/WorkerCanvas' //../../../GraphServiceRouter/services/worker/WorkerCanvas'//'graphscript/services/worker/WorkerCanvas';

// provide the functions for the canvas routes, in our case wrapping the webglplot renderer instead of our own canvas render
const init = (options, canvas, context) => {
    plotter.initPlot(options);
}

const update = (options, canvas, context, input) => {
    //console.log('update plotter')
    plotter.update(options._id, input);
}

const clear = (options, canvas, context) => {
    plotter.deinitPlot(options._id);   
}

export let plot:CanvasControls

export let options: CanvasProps & {
        overlay?:HTMLCanvasElement, 
        worker?:boolean|Worker|string|Blob|MessagePort, 
        route?:string
    } & WebglLinePlotProps


export function create() {

    const options = this.options
    options.init = init;
    options.update = update;
    options.clear = clear;

    if(options.worker) {

        if(options.worker === true) options.worker = new Worker(canvasworker);
        else if (typeof options.worker === 'string' || options.worker instanceof Blob) options.worker = new Worker(options.worker as any);
        
        if(options.overlay) {
            options.overlay = (options.overlay as any).transferControlToOffscreen();
            options.transfer = [options.overlay];
        }
    }

    this.plot = workerCanvasRoutes.Renderer(options) as CanvasControls;
    return this.plot
}

export default function (...args) {
    if (!this.plot) this.create()
    this.plot.update(...args);
}