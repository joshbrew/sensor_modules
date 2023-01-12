export * as alert from '../alerts/arbitrary' // Alert declared in separate file

export * as algorithm from '../algorithms/arbitrary' // Algorithm declared in separate file
import { state } from '../globals'
import { arbitrary } from '../workers'

export const name = 'Arbitrary Module' // The name of the module

export const subscriptions = [ 'state.arbitrary' ] // Subscriptions to automatically instantiate

// The user interface of the module
export const ui = {

    __element: 'div', // What to display on the page

    // How to style what's on the page
    style: {
        padding: '10px 25px',
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


        // This component is used to generate data for the arbitrary module using an arbitrary worker
        toggle:{
            subId: undefined,
            __element:'button',
            style: {
                position: 'absolute',
                top: '0px',
                right: '0px'
            },

            innerText:'Start',

            onclick: function () {

                if (this.subId) {
                    this.innerText = 'Start'
                    arbitrary.run('destroySubprocess', this.subId)
                    this.subId = undefined
                } else {

                    
                        arbitrary.run('createSubprocess', ['arbitrary',{transform: (function(inp) {return Math.sin(inp)}).toString() }]).then((id) => {
                        console.log("Created subprocess for arbitrary worker:", id)
                        arbitrary.subscribe(id,  (value) => state.arbitrary = { value })
                        this.subId = id
                        this.innerText = 'Stop'

                        // Animate the arbitrary worker transformation
                        const animation = () => {
                            const now = Date.now() / 1000
                            arbitrary.run('runSubprocess', now); // Generating data for arbitrary worker
                            if (this.subId) setTimeout(animation, 1000/60)
                        }
                        
                        animation()
                        
                    })
                
                }
            }
        }
    },

    // The reaction to updated data after passing through the algorithm + alert
    __operator: function (data) {
        this.__children.readout.__children.value.innerHTML = data.toFixed(3)
    }
}