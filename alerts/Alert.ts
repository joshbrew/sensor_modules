import  {Howl } from 'howler'

export type AlertAlgorithm = (value: number) => boolean;

export type AlertSettings = {
    condition: AlertAlgorithm,
    message: string | ((value?: number) => string)
    bufferLength?: number
}

class Alert {
    settings: AlertSettings;
    errored: boolean = false
    buffer: number[] = []
    latest: number[];

    history: Function[] = []

    constructor(settings?: AlertSettings) {
        this.set(settings)
    }

    set(settings?: AlertSettings) {
        if (settings) this.settings = settings;
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

            const value = (!bufferLen) ? mean(this.latest) : mean(this.buffer);
            if (this.settings) {
                const toThrow = this.settings.condition(value)
                if (toThrow) return this.throw(value)
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
        // if (value !== undefined) new Howl({src:'./sounds/alarm.wav'}).play(); // Only play the sound if a value has been provided
        let elm = document.getElementById('alertbar') as HTMLElement;
        elm.innerHTML = message;
        elm.style.opacity = '1';

        const reaction = () =>  elm.style.opacity = '0';

        const position = this.history.length
        this.history.push(reaction)
        setTimeout(() => {
            if (this.history.length === position + 1) reaction()
        }, 3000)

        return true
    }
}

export default Alert


function mean(arr) {
    return arr.reduce((a, b) => a + b, 0) / arr.length
}