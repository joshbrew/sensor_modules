import {Howl} from 'howler'

export type AlertAlgorithm = (value: number) => boolean;

type AlertSettings = {
    condition: AlertAlgorithm,
    message: (value: number) => string | string
}

class Alert {
    settings: AlertSettings;
    errored: boolean = false

    constructor(settings?: AlertSettings) {
        this.set(settings)
    }

    set(settings?: AlertSettings) {
        if (settings) this.settings = settings;
        else console.log('No configuration object provided to Alert.set()')
        this.errored = false;

    }

    check(value) {
        if (this.settings) {
            if(this.settings.condition(value)) this.throw(value)
        } else {
            if (!this.errored) {
                this.errored = true;
                console.log('Invalid configuration object has been set for Alert')
            }
        }
    }

    throw(value) {
        const message = (typeof this.settings.message === 'string') ? this.settings.message : this.settings.message(value) ;
        new Howl({src:'./sounds/alarm.wav'}).play();
        let elm = document.getElementById('alertbar') as HTMLElement;
        elm.style.backgroundColor = 'red';
        elm.style.color = 'white';
        elm.innerHTML = message;
    }
}

export default Alert