import {WebglLinePlotUtil, WebglLinePlotProps} from '../../../webgl-plot-utils/webgl-plot-utils'//'webgl-plot-utils';//
globalThis.plotter = new WebglLinePlotUtil();

import canvasworker from './canvas.worker'

import { CanvasControls, CanvasProps, workerCanvasRoutes } from 'graphscript/services/worker/WorkerCanvas' //../../../GraphServiceRouter/services/worker/WorkerCanvas'//'graphscript/services/worker/WorkerCanvas';

// provide the functions for the canvas routes, in our case wrapping the webglplot renderer instead of our own canvas render
const init = (options, canvas, context) => {

    globalThis.plotter.initPlot(options);

    let onresize = (o) => {    
        canvas.width = canvas.clientWidth; canvas.height = canvas.clientHeight;
        options.overlay.width = canvas.clientWidth; options.overlay.height = canvas.clientHeight;
        (( globalThis.plotter.plots[options._id].plot as any).webgl as WebGLRenderingContext).viewport(0, 0, canvas.width, canvas.height);
    }

    if(typeof window !== 'undefined') window.addEventListener('resize',onresize);
    else canvas.addEventListener('resize',onresize);

    setTimeout(()=>{onresize(canvas)},10);
}

const update = (options, canvas, context, input) => {
    globalThis.plotter.update(options._id, input);
}

const clear = (options, canvas, context) => {
    globalThis.plotter.deinitPlot(options._id);   
}

export let plot:CanvasControls

export let options: CanvasProps & {
        overlay?:HTMLCanvasElement, 
        worker?:boolean|Worker|string|Blob|MessagePort, 
        route?:string
    } & WebglLinePlotProps

export let canvas: WebglLinePlotProps['canvas']
export let overlay: WebglLinePlotProps['overlay']

export const failed = false


function create(context) {

    const options = context.options
    options.init = init;
    options.update = update;
    options.clear = clear;

    // Grab Canvas from DOM
    if (typeof context.overlay === 'string') context.overlay = document.querySelector(context.overlay) as HTMLCanvasElement;
    if (typeof context.canvas === 'string') context.canvas = document.querySelector(context.canvas) as HTMLCanvasElement;

    options.canvas = context.canvas;
    options.overlay = context.overlay;
    const originalOptions = {...options}

    try {
        if(options.worker) {

            try {

                if (typeof canvasworker === 'object') options.worker = false; // Text compilation doesn't work yet...
                
                if(options.worker === true) {
                    options.worker = new Worker(canvasworker);
                } else if (typeof options.worker === 'string' || options.worker instanceof Blob) options.worker = new Worker(options.worker as any);
                
                if(options.overlay) {
                    let offscreen = (options.overlay as any).transferControlToOffscreen();
                    options.overlay = offscreen;
                    options.transfer = [options.overlay];
                }

                context.plot = workerCanvasRoutes.Renderer(options) as CanvasControls;
            } catch (e) {
                originalOptions.worker = false;
                console.warn('Could not create canvas with worker. Will try to use a standard canvas instead.', originalOptions, e)
            }
        }

        if (!context.plot) context.plot = workerCanvasRoutes.Renderer(originalOptions) as CanvasControls;


    } catch (e){
        console.error('Could not create a plot using the current options', e)
        context.failed = true
    }

    return context.plot
}

export default function (args) {
    if (!this.failed){
        if (!this.plot) create(this) // NOTE: Using global scope will result in issues since the (wrapper) promise is not awaited
        if (this.plot) this.plot.update(args);
    }
}