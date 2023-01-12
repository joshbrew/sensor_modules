export * as alert from '../alerts/arbitrary' 
export * as algorithm from '../algorithms/arbitrary' 

export const name = 'Arbitrary Module'

export const states = [ 'state.arbitrary' ]

export const ui = {

    __element: 'div',

    style: {
        padding: '10px 25px'
    },

    __children: {
        paragraph: {
            __element: 'p',
            innerHTML: 'This arbitrary module will process data generated using Math.sin to throw an alert when the sine output approaches one.',
        }
    },
    __operator: (data) => {
        console.log('Processed', data) // TODO: Get this to actually throw...
    }
}