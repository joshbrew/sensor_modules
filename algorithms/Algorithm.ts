import Alert, { AlertSettingsInput } from '../alerts/Alert';

export type AlertAlgorithm = (value: number) => boolean;

export type AlgorithmSettings = {
    operator: Function,
    alert?: AlertSettingsInput
}


class Algorithm {
    settings: AlgorithmSettings;
    errored: boolean = false

    constructor(settings?: AlgorithmSettings) {
        this.set(settings)
    }

    set(settings?: AlgorithmSettings) {
        
        if (settings) {
            this.settings = settings;
        }

        else console.log('No configuration object provided to Algorithm.set()')
        this.errored = false;
    }

    apply = (data) => this.settings.operator(data)
}

export default Algorithm