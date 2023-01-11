// -------------------------------------------------------
// -----------------   Loader Function   -----------------
// -------------------------------------------------------

// NOTE: It is not possible to add a subprocess template from the main thread UNLESS YOU MANUALLY STRINGIFY FUNCTIONS
// We may want to add a worker.add() function that will do this for us
export function loadSubprocess(template) {
    const copy = Object.assign({}, template)
    if (typeof copy.oncreate === 'function') copy.oncreate = copy.oncreate.toString()
    if (typeof copy.ondata === 'function') copy.ondata = copy.ondata.toString()

    this.run('addSubprocessTemplate', [
        copy.name, 
        copy.structs,
        copy.oncreate,
        copy.ondata,
        copy.props
    ]).then((success) => {
        if (success) console.log("Successfully added subprocess to worker!")
    }) 
}