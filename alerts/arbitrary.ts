let refractoryPeriod = 1000
let canTrigger = true

export const message = `<h2>Arbitrary Alert</h2><p>This alert has been thrown</p>`

export const condition = (value) => {

    if (canTrigger){
        const triggered = (1 - value) < 0.05
        if (triggered) {
            canTrigger = false
            setTimeout(() => canTrigger = true, refractoryPeriod)
        }

        return triggered
    } else return false
}
