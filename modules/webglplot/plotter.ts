import {WebglLinePlotUtil, WebglLinePlotProps} from 'webgl-plot-utils';
let plotter = new WebglLinePlotUtil();

import canvasworker from './canvas.worker'

import { CanvasControls, CanvasProps, workerCanvasRoutes } from 'graphscript/services/worker/WorkerCanvas' //../../../GraphServiceRouter/services/worker/WorkerCanvas'//'graphscript/services/worker/WorkerCanvas';


export default function newPlot(
    options:CanvasProps & {
        overlay?:HTMLCanvasElement, 
        worker?:boolean|Worker|string|Blob|MessagePort, 
        route?:string
    } & WebglLinePlotProps
) {

    //provide the functions for the canvas routes, in our case wrapping the webglplot renderer instead of our own canvas render
    let init = (options, canvas, context) => {
        plotter.initPlot(options);
    }

    let update = (options, canvas, context, input) => {
        //console.log('update plotter')
        plotter.update(options._id, input);
    }

    let clear = (options, canvas, context) => {
        plotter.deinitPlot(options._id);   
    }

    //let draw = (options, canvas, context) => {}

    options.init = init;
    options.update = update;
    options.clear = clear;
    //options.draw = draw;

    if(options.worker) {

        if(options.worker === true) {
            options.worker = new Worker(canvasworker);
        }
        else if (typeof options.worker === 'string' || options.worker instanceof Blob) {
            options.worker = new Worker(options.worker as any);
        }

        if(options.overlay) {
            options.overlay = (options.overlay as any).transferControlToOffscreen();
            options.transfer = [options.overlay];
        }
    }

    return workerCanvasRoutes.Renderer(options as any) as CanvasControls;

}