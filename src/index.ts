// class Axis {
//     constructor() {
//         this.items = [];
//     }

//     static tokenize(expression) {
//         return expression
//             .split('->')
//             .map(a =>
//                 a.split('')
//                 .filter(a => a !== ' ')
//                 .reduce((a, b) => a+b)
//             )
//     }

//     access(tokens, data) {
//         // First check undefined
//         let current = data
//         if (tokens.length == 0) {
//             this.items.push(current)
//             return
//         }
//         for(let i = 0; i < tokens.length; i++) {
//             log(`checking for ${tokens[i]} in ${}\n\n`)
//             if(tokens.length === 0 ) {
//                 log(`Found new entry total = ${this.items.length}`)
//                 this.items.push(current)
//                 return
//             }
//             // deal with array
//             if(Array.isArray(current[tokens[i]])) {
//                 // check for index access
//                 if(tokens.length > 2) {
//                     if(tokens[i+1].match(/^\[[0-9]*\]$/) !== null) {
//                         log('found index')
//                         current = current[tokens[i]]
//                         this.access(tokens.slice(i+2), current[parseInt(tokens[i+1].slice(1))])
//                         return
//                     }
//                 }
//                 // Recursive map magic
//                 log('function instance terminated thanks to recursive map')
//                 current[tokens[i]].map(a => {
//                     this.access(tokens.slice(i+1), a)
//                 })
//                 return
//             } else {
//                 // Deal with end of the function
//                 log(i, tokens.length)
//                 if(i === tokens.length - 1) {
//                     log(`Found new entry total = ${this.items.length}`)
//                     this.items.push(current[tokens[i]])
//                     return
//                 }
//                 // Deal with undefined
//                 log(typeof current[tokens[i]] == 'undefined')
//                 if (typeof current[tokens[i]] === 'undefined') {
//                     throw new Error(`${tokens[i]}(index ${i}) does not exits on ${JSON.stringify(current)}`)
//                 }
//                 // Move current
//                 current = current[tokens[i]]
//             }
//         }
//     }
//     parse(expression, data) {
//         this.items = []
//         this.access(Axis.tokenize(expression), data)
//         return this.items
//     }
// }
export function parse(
    axisCode: string | Token[],
    dataInput: string | object | any[] | undefined | null): any[] | Error {
    const tokens = typeof(axisCode) === "string" ? tokenize(axisCode) : axisCode
    const result = access(axisCode, dataInput)
    if (result instanceof Error) {
        return result
    }
    if (Array.isArray(result)) {
        return flatten(result)
    }
    return [result]
}

export function access(
    axisCode: string | Token[],
    dataInput: string | object | any[] | undefined | null): any[] | Error {
    const tokens = typeof(axisCode) === "string" ? tokenize(axisCode) : axisCode

    // Checks for undefined or null
    if (dataInput == null) {
        return new Error("Data passed is invalid")
    }

    // Return if reach end of the expression
    if (tokens.length === 0) {
        return [dataInput]
    }
    // Parse or not the data
    const token = tokens[0]
    const data: object | any[] = typeof(dataInput) === "string" ? JSON.parse(dataInput) : dataInput

    // console.log(`Current token ${token.value}`)
    // console.log(`Current dataPoint ${JSON.stringify(data)}`)

    // Check if the whole dataset is an array
    if (Array.isArray(data)) {
        if (tokens.length === 1) {
            return (<any> data)[token.value]
        }
        return data.map((a) => access(tokens, a))
    }
    const curPos = (<any> data)[token.value]
    // Check if the next point to be accesed is an array
    if (Array.isArray(curPos)) {
        if (tokens.length === 1) {
            return curPos
        }
        // indentify index accessor
        if (tokens[1].value.match(/^\[[0-9]*\]$/) !== null) {
            const index = parseInt(tokens[1].value.slice(1)[0], 10)
            return access(tokens.splice(2), curPos[index])
        }
        return curPos.map((a) => access(tokens.splice(1), a))
    }
    // This is a hack because typescript does not like the dictonary syntax
    if (tokens.length === 1) {
        return curPos
    }
    return access(tokens.splice(1), curPos)
}

export interface Token {
    value: string,
    index: number,
}

// Checks if item has access depth
export function isDeep(input: any[] | object | null | undefined | any): boolean {
    if (input == null) {
        throw new Error("Input undefined or null")
    }
    const type = typeof(input)
    if (type === "string" || type === "number" || type === "boolean") {
        return false;
    }
    if (Array.isArray(input)) {
        return input
        .map((a) => Array.isArray(a) || typeof(a) === "object")
        .reduce((a, b) => a || b , false)
    }
    if (type === "object") {
        return true
    }
    return false
}

export function tokenize(axisCode: string): Token[] {
    return axisCode
        .split("")
        .filter((a) => a !== " ")
        .join("")
        .split("->")
        .map((a, i) => ({ value: a, index: i }))
}

export function flatten(arr: any[]): any[] {
    return arr
    .reduce((flat, toFlatten) =>
        flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten)
        , [])
}

const code = "data -> name -> [1]"
console.log(parse(code, {data: { name: ["wrong", "right"]}}))