import  { Howl } from 'howler'

export type AlertAlgorithm = (value: number) => boolean;

export type AlertSettings = {
    condition: AlertAlgorithm,
    preprocess: (buffer: number[]) => number // Return a single value
    message: string | ((value?: number) => string)
    bufferLength?: number
}

export type AlertSettingsInput = {
    preprocess?: AlertSettings['preprocess'],
    message: AlertSettings['message'],
    bufferLength?: AlertSettings['bufferLength']
    condition: AlertSettings['condition']
}

class Alert {
    settings: AlertSettings;
    errored: boolean = false
    buffer: number[] = []
    latest: number[];

    history: Function[] = []

    constructor(settings?: AlertSettingsInput) {
        this.set(settings)
    }

    set(settings?: AlertSettingsInput) {
        if (settings) {
            if (!settings.preprocess) settings.preprocess = mean // Default to mean for preprocessing
            this.settings = settings as AlertSettings;
        }
        else console.log('No configuration object provided to Alert.set()')
        this.errored = false;

    }

    add(value: number | number[]) {
        const bufferLen = this.settings.bufferLength

        if (!Array.isArray(value)) value = [value];

        if (bufferLen) {
            this.buffer.push(...value);
            const diff = this.buffer.length - bufferLen;
            if(diff > 0) this.buffer = this.buffer.slice(diff);
        }

        this.latest = value;
    }

    check(value?: number | number[]) {

        if (value) this.add(value);

        const bufferLen = this.settings.bufferLength

        if(!bufferLen || bufferLen === this.settings.bufferLength) {

            const value = (!bufferLen) ? this.settings.preprocess(this.latest) : this.settings.preprocess(this.buffer);
            if (this.settings) {
                const toThrow = this.settings.condition(value as number);
                if (toThrow) return this.throw(value as number);
            }
            else {
                if (!this.errored) {
                    this.errored = true;
                    console.log('Invalid configuration object has been set for Alert')
                }
            }
        }
    }

    throw(value?: number) {
        const message = (typeof this.settings.message === 'string') ? this.settings.message : this.settings.message(value) ;

        let sound;
        if (value !== undefined) {
            sound = new Howl({src:'./alerts/sounds/alarm.wav'}); // Only play the sound if a value has been provided
            sound.play()
        }
        let elm = document.getElementById('alerts') as HTMLElement;

        elm.innerHTML = message;
        elm.style.opacity = '1';

        const reaction = () =>  elm.style.opacity = '0';

        const position = this.history.length
        this.history.push(reaction)
        setTimeout(() => {
            if (this.history.length === position + 1) {
                reaction()
                if (sound) sound.stop()
            }
        }, 3000)

        return true
    }
}

export default Alert


function mean(arr) {
    return arr.reduce((a, b) => a + b, 0) / arr.length
}