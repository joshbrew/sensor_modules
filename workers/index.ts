// Core Worker Scripts
import { workers } from "device-decoder"; // '../device_debugger/src/device.frontend'//
import gsworker from 'device-decoder/src/stream.big.worker' // '../device_debugger/src/stream.big.worker'//

// Worker Utilities
import { loadSubprocess } from "./utils/load";

// Subprocess Templates
import * as arbitrarySubprocess from './subprocesses/arbitrary'

export const arbitrary = workers.addWorker({url:gsworker})
loadSubprocess.call(arbitrary, arbitrarySubprocess)


export default workers