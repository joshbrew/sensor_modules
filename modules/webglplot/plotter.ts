import {WebglLinePlotUtil, WebglLinePlotProps} from 'webgl-plot-utils';//'../../../webgl-plot-utils/webgl-plot-utils'//
let plotter = new WebglLinePlotUtil();

import canvasworker from './canvas.worker'

import { CanvasControls, CanvasProps, workerCanvasRoutes } from 'graphscript/services/worker/WorkerCanvas' //../../../GraphServiceRouter/services/worker/WorkerCanvas'//'graphscript/services/worker/WorkerCanvas';

// provide the functions for the canvas routes, in our case wrapping the webglplot renderer instead of our own canvas render
const init = (options, canvas, context) => {
    plotter.initPlot(options);
    
    let onresize = (o) => {    
        canvas.width = canvas.clientWidth; canvas.height = canvas.clientHeight;
        options.overlay.width = canvas.clientWidth; options.overlay.height = canvas.clientHeight;
        ((plotter.plots[options._id].plot as any).webgl as WebGLRenderingContext).viewport(0, 0, canvas.width, canvas.height);
    }

    if(typeof window !== 'undefined') window.addEventListener('resize',onresize);
    else canvas.addEventListener('resize',onresize);

    setTimeout(()=>{onresize(canvas)},10);

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


function create(context) {

    const options = context.options
    options.init = init;
    options.update = update;
    options.clear = clear;

    if(options.worker) {

        if(options.worker === true) options.worker = new Worker(canvasworker);
        else if (typeof options.worker === 'string' || options.worker instanceof Blob) options.worker = new Worker(options.worker as any);
        
        if(options.overlay) {
            let offscreen = (options.overlay as any).transferControlToOffscreen();
            options.overlay = offscreen;
            options.transfer = [options.overlay];
        }
    }

    context.plot = workerCanvasRoutes.Renderer(options) as CanvasControls;
    return context.plot
}

export default function (args) {
    if (!this.plot) create(this) // NOTE: Using global scope will result in issues since the (wrapper) promise is not awaited
    this.plot.update(args);
}