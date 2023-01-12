export * as alert from '../alerts/arbitrary' 
export * as algorithm from '../algorithms/arbitrary' 

export const name = 'Arbitrary Module'

export const subscriptions = [ 'state.arbitrary' ]

export const ui = {

    __element: 'div',

    style: {
        padding: '10px 25px'
    },

    __children: {
        description: {
            __element: 'p',
            innerHTML: 'This arbitrary module will process data generated using Math.sin to throw an alert when the sine output approaches one'
        },

        readout: {
            __element: 'div',
            __children: {
                header: {
                    __element: 'h3',
                    innerHTML: 'Current Value'
                },

                value: {
                    __element: 'p',
                    innerHTML: 'N/A'
                }
            }
        },
    },

    __operator: function (data) {
        this.__children.readout.__children.value.innerHTML = data
    }
}