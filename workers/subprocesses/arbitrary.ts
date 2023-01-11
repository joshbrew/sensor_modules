import { SubprocessContext } from "graphscript";

export const name = 'arbitrary'

export const structs = {}

export const oncreate = ((ctx: SubprocessContext) => {

    function parseFunctionFromText(method = '') {
        //Get the text inside of a function (regular or arrow);
        let getFunctionBody = (methodString) => {
            return methodString.replace(/^\W*(function[^{]+\{([\s\S]*)\}|[^=]+=>[^{]*\{([\s\S]*)\}|[^=]+=>(.+))/i, '$2$3$4');
        }

        let getFunctionHead = (methodString) => {
            let startindex = methodString.indexOf('=>') + 1;
            if (startindex <= 0) {
                startindex = methodString.indexOf('){');
            }
            if (startindex <= 0) {
                startindex = methodString.indexOf(') {');
            }
            return methodString.slice(0, methodString.indexOf('{', startindex) + 1);
        }

        let newFuncHead = getFunctionHead(method);
        let newFuncBody = getFunctionBody(method);


        let newFunc;
        if (newFuncHead.includes('function')) {
            let varName = newFuncHead.split('(')[1].split(')')[0]
            newFunc = new Function(varName, newFuncBody);
        } else {
            if (newFuncHead.substring(0, 6) === newFuncBody.substring(0, 6)) {
                //newFuncBody = newFuncBody.substring(newFuncHead.length);
                let varName = newFuncHead.split('(')[1].split(')')[0]
                //console.log(varName, newFuncHead ,newFuncBody);
                newFunc = new Function(varName, newFuncBody.substring(newFuncBody.indexOf('{') + 1, newFuncBody.length - 1));
            }
            else {
                try { newFunc = (0, eval)(newFuncHead + newFuncBody + "}"); } catch { }
            }
        }

        return newFunc;

    }

    if (typeof ctx.transform === 'string') ctx.transform = parseFunctionFromText(ctx.transform);
    // if (typeof ctx.transform === 'string') ctx.transform = ctx.utils.parseFunctionFromText(ctx.transform); // Ideally we can just do this...
})

export const ondata = ((ctx: SubprocessContext, data: { [key: string]: any } | any) => {
    if (ctx.transform) {
        const res = ctx.transform(data);
        return res
    }
})

export const props = {}