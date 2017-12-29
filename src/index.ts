export function parse(
    axisCode: string | Token[],
    dataInput: string | object | any[] | undefined | null): any[] {
    const tokens = typeof(axisCode) === "string" ? tokenize(axisCode) : axisCode
    const result = access(axisCode, dataInput)
    if (Array.isArray(result)) {
        return flatten(result)
    }
    return [result]
}

export function access(
    axisCode: string | Token[],
    dataInput: string | object | any[] | undefined | null): any[] {
    const tokens = typeof(axisCode) === "string" ? tokenize(axisCode) : axisCode

    // Checks for undefined or null
    if (dataInput == null) {
        throw new Error("Data passed is invalid, are you sure you filled in the second argument?")
    }

    // Return if reach end of the expression
    if (tokens.length === 0) {
        return [dataInput]
    }
    // Parse or not the data
    const token = tokens[0]
    let data: object | any[]
    try {
        data = typeof(dataInput) === "string" ? JSON.parse(dataInput) : dataInput
    } catch (e) {
        throw new Error(
            `Data could not be parsed, are you sure there is a ${token.value}(${token.index}) in "${dataInput}`,
        )
    }

    // console.log(`Current token ${token.value}`)
    // console.log(`Current dataPoint ${JSON.stringify(data)}`)

    // Check if the whole dataset is an array
    if (Array.isArray(data)) {
        // if (tokens.length === 1) {
        //     const next = (<any> data)[token.value]
        //     // if (next == null) {
        //     //     // Throw token error
        //     //     throw new Error(
        //     //         `Data point ${token.value}(${token.index}) not valid did you mean "${Object.keys(data)}"`,
        //     //     )
        //     // }
        //     return next
        // }
        return data.map((a) => access(tokens, a))
    }
    const curPos = (<any> data)[token.value]
    if (curPos == null) {
        throw new Error(
            `Data point ${token.value}(${token.index}) not valid did you mean "${Object.keys(data)}"`,
        )
    }
    // Check if the next point to be accesed is an array
    if (Array.isArray(curPos)) {
        if (tokens.length === 1) {
            return curPos
        }
        // indentify index accessor if there is one
        if (tokens[1].value.match(/^\[[0-9]*\]$/) !== null) {
            const index = parseInt(tokens[1].value.slice(1)[0], 10)
            return access(tokens.slice(2), curPos[index])
        }
        if (curPos == null) {
            throw new Error(`Data point ${token.value}(${token.index}) not valid did you mean "${Object.keys(data)}"`)
        }
        return curPos.map((a) => access(tokens.slice(1), a))
    }
    // This is a hack because typescript does not like the dictonary syntax
    if (tokens.length === 1) {
        return curPos
    }
    return access(tokens.slice(1), curPos)
}

export interface Token {
    value: string,
    index: number,
}

// Checks if item has access depth
// export function isDeep(input: any[] | object | null | undefined | any): boolean {
//     if (input == null) {
//         throw new Error("Input undefined or null")
//     }
//     const type = typeof(input)
//     if (type === "string" || type === "number" || type === "boolean") {
//         return false;
//     }
//     if (Array.isArray(input)) {
//         return input
//         .map((a) => Array.isArray(a) || typeof(a) === "object")
//         .reduce((a, b) => a || b , false)
//     }
//     if (type === "object") {
//         return true
//     }
//     return false
// }

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
