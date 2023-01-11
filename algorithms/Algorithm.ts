import Alert, { AlertSettingsInput } from '../alerts/Alert';

export type AlertAlgorithm = (value: number) => boolean;

type AlgorithmSettings = {
    operator: Function,
    alert: AlertSettingsInput
}


class Algorithm {
    settings: AlgorithmSettings;
    errored: boolean = false
    alert: Alert;

    constructor(settings?: AlgorithmSettings) {
        this.set(settings)
    }

    set(settings?: AlgorithmSettings) {
        if (settings) {
            this.settings = settings;
            if (this.settings.alert) {
                this.alert = new Alert(this.settings.alert)
            }
        }
        else console.log('No configuration object provided to Algorithm.set()')
        this.errored = false;
    }

    apply = (data) => {
        const value = this.settings.operator(data)
        if (this.alert) this.alert.check(value)
        return value
    }
}

export default Algorithm