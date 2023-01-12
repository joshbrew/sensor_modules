// This file is the top-level appplication environment. It is responsible for (1) loading the tree, and (2) high-level controls that sit outside of that tree.

import { workers } from "device-decoder"; // '../device_debugger/src/device.frontend'//
import { htmlloader } from 'graphscript'//'../graphscript/'
import { arbitrary } from "./modules";

import "style.css"

import tree from './tree'

// Ensure that the workers will render html
workers.__node.loaders.html = htmlloader;

// Load the entire tree into the workers
workers.load(tree);

// Trigger an arbitrary alert when the user presses 'a'
window.onkeydown = (ev) => {
    if (ev.key === 'a') {
        if ( arbitrary.alert) arbitrary.alert.throw();
    }
}