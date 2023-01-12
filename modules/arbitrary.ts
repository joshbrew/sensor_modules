export * as alert from '../alerts/arbitrary' // Alert declared in separate file

export * as algorithm from '../algorithms/arbitrary' // Algorithm declared in separate file

export const name = 'Arbitrary Module' // The name of the module

export const subscriptions = [ 'state.arbitrary' ] // Subscriptions to automatically instantiate

// The user interface of the module
export const ui = {

    __element: 'div', // What to display on the page

    // How to style what's on the page
    style: {
        padding: '10px 25px'
    },

    
    // Children elements on the page
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

    // The reaction to updated data after passing through the algorithm + alert
    __operator: function (data) {
        this.__children.readout.__children.value.innerHTML = data.toFixed(3)
    }
}