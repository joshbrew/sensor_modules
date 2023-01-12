import Module from "./Module"

export type DisplayInfo = {
    [x:string]: any
} & Partial<Module>

const merge = (o, override) => {
    for (let key in override) {
        const oVal = o[key]
        const val = override[key]
        if (oVal && typeof oVal === 'object' && typeof val === 'object')  merge(o[key], val)
        else {
            try { o[key] = val } catch {}
        }
    }
}

class Display extends Module { 

    [x:string]: any

    __element = 'div'

    style = {
        position: 'relative',
        border: '1px solid white',
        // borderRadius: '10px',
        margin: '10px',
        flex: '1 1 250px'
    }

    __children = {
        header:{
            __element: 'h3',
            innerHTML: 'Graph Visualization',
            style: {
                background: 'black',
                fontSize: '1.0em',
                margin: '0px',
                padding: '10px'
            }
        },
        ui: {
            __element: 'div',
            style:{ 
                height:'200px',
                overflowY: 'scroll',
                fontSize: '12px',
                background: '#1b1a1a',
            }
        },
    } as any

    constructor (info: DisplayInfo) {
        super(info)

        const copy = Object.assign({}, info) // Copy original info

        // Save original children
        if ( copy.__children ){
            const newChildren = copy.__children
            delete copy.__children
            for (let key in newChildren) {
                if (!this.__children[key]) this.__children[key] = newChildren[key]
                else merge(this.__children[key], newChildren[key])
            }
        }

        merge(this, copy) // Merge properties to self

        if (copy.name) this.__children.header.innerHTML = info.name;
    }

}

export default Display;