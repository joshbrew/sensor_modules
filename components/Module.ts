import Alert, { AlertSettingsInput } from "../alerts/Alert"
import Algorithm, { AlgorithmSettings } from "../algorithms/Algorithm"

export type ModuleInput = {
    name?: string,
    algorithm?: AlgorithmSettings | Algorithm
    alert?: AlertSettingsInput | Alert,
    ui?: any,
    states?: any[]
}

export default class Module {

    name: string = 'Module'

    // Data Management
    alert?: Alert
    algorithm?: Algorithm
    #states: string[] = []
    get states() { return this.#states }
    set states(value: string[]) {
        this.#states = value
        const listeners = {}
        value.forEach(str => listeners[str] = true)
        this.__listeners = listeners
    }

    #ui?: any
    get ui() { return this.#ui }
    set ui(value: any) {
        this.__children.ui = value
    }

    // User Interface
    __element = 'div'
    __children: { ui?: ModuleInput['ui'] } = { }
    __listeners: {[x:string]: true} = {}

    constructor(settings: ModuleInput){
        this.set(settings)
    }

    set(settings?: ModuleInput) {

        if (settings){ 

            if (settings.name) this.name = settings.name

            // Set the alert
            let alert = settings.alert
            if (alert && !(alert instanceof Alert)) alert = new Alert(alert)
            this.alert = alert as Alert | undefined

            // Set the algorithm
            let algorithm = settings.algorithm
            if (algorithm && !(algorithm instanceof Algorithm)) algorithm = new Algorithm(algorithm)
            this.algorithm = algorithm as Algorithm | undefined

            // Set the UI
            if (settings.ui) this.ui = settings.ui

            if (settings.states) this.states = settings.states

        } else console.log('No configuration object provided to Module.set()')
    }

    __operator = (data: number | number[]) => {
        if (this.algorithm) data = this.algorithm.apply(data)
        if (this.alert) this.alert.check(data)
        return data
    }
}