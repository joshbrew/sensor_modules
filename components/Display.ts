
export type ContainerInfo = {
    header?: string,
    [x:string]: any
}

class Container { 

    [x:string]: any

    __element = 'div'

    style = {
        border: '1px solid white',
        borderRadius: '10px',
        padding: '10px',
        margin: '10px',
        flex: '1 1 250px'
    }

    __children = {
        header:{
            __element: 'h3',
            innerHTML: 'Graph Visualization',
            style: {
                fontSize: '1.0em',
                margin: '0px',
                paddingBottom: '10px'
            }
        },
        body: {
            __element: 'div',
            style:{ height:'200px' }
        },
    } as any

    constructor (info: ContainerInfo) {
        Object.assign(this, info) // First assign to self
        if (info.header) this.__children.header.innerHTML = info.header;
    }

}

export default Container;