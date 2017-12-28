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

// module.exports = Axis
// let log = a => {}

export default function access(
    axisCode: string | Token[],
    dataInput: string | object | any[] | undefined | null): any[] | Error {
    const tokens = typeof(axisCode) === "string" ? tokenize(axisCode) : axisCode

    // Checks for undefined or null
    if (dataInput == null) {
        debugger
        return new Error("Data passed is invalid")
    }
    // Parse or not the data
    const data: object | any[] = typeof(dataInput) === "string" ? JSON.parse(dataInput) : dataInput
    const token = tokens[0]

    console.log(`Current token ${token.value}`)
    console.log(`Current dataPoint ${JSON.stringify(data)}`)

    if (Array.isArray(data)) {
        if (tokens.length === 1) {
            return (<any> data)[token.value]
        }
        debugger
        return data.map((a) => access(tokens, a))
    }
    // This is a hack because typescript does not like the dictonary syntax
    const curPos = (<any> data)[token.value] 
    if (tokens.length === 1) {
        return curPos
    }
    return access(tokens.splice(1), curPos)
}

export interface Token {
    value: string,
    index: number,
}

export function tokenize(axisCode: string): Token[] {
    return axisCode
        .split("")
        .filter((a) => a !== " ")
        .join("")
        .split("->")
        .map((a, i) => ({ value: a, index: i }))
}

// const test = access("data -> names", {
//     data: {
//         names: [
//             "Hello",
//             "Hello1",
//             "Hello2",
//             "Hello3",
//         ],
//     },
// })
console.log(access("data -> name", { data: { name: "One" } }))
console.log(access("data -> name", [{ data: { name: "One" } }]))
console.log(access("data -> name", { data: [{ name: "One" }] }))
// console.log(access("data -> name", [{ data: [{ name: "One" }] }]))
// console.log(access("data -> name", [{data: [{name: ["One"]}]}]))