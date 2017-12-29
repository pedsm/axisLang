"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parse(axisCode, dataInput) {
    var tokens = typeof (axisCode) === "string" ? tokenize(axisCode) : axisCode;
    var result = access(axisCode, dataInput);
    if (Array.isArray(result)) {
        return flatten(result);
    }
    return [result];
}
exports.parse = parse;
function access(axisCode, dataInput) {
    var tokens = typeof (axisCode) === "string" ? tokenize(axisCode) : axisCode;
    if (dataInput == null) {
        throw new Error("Data passed is invalid, are you sure you filled in the second argument?");
    }
    if (tokens.length === 0) {
        return [dataInput];
    }
    var token = tokens[0];
    var data;
    try {
        data = typeof (dataInput) === "string" ? JSON.parse(dataInput) : dataInput;
    }
    catch (e) {
        throw new Error("Data could not be parsed, are you sure there is a " + token.value + "(" + token.index + ") in \"" + dataInput);
    }
    if (Array.isArray(data)) {
        return data.map(function (a) { return access(tokens, a); });
    }
    var curPos = data[token.value];
    if (curPos == null) {
        throw new Error("Data point " + token.value + "(" + token.index + ") not valid did you mean \"" + Object.keys(data) + "\"");
    }
    if (Array.isArray(curPos)) {
        if (tokens.length === 1) {
            return curPos;
        }
        if (tokens[1].value.match(/^\[[0-9]*\]$/) !== null) {
            var index = parseInt(tokens[1].value.slice(1)[0], 10);
            return access(tokens.slice(2), curPos[index]);
        }
        if (curPos == null) {
            throw new Error("Data point " + token.value + "(" + token.index + ") not valid did you mean \"" + Object.keys(data) + "\"");
        }
        return curPos.map(function (a) { return access(tokens.slice(1), a); });
    }
    if (tokens.length === 1) {
        return curPos;
    }
    return access(tokens.slice(1), curPos);
}
exports.access = access;
function tokenize(axisCode) {
    return axisCode
        .split("")
        .filter(function (a) { return a !== " "; })
        .join("")
        .split("->")
        .map(function (a, i) { return ({ value: a, index: i }); });
}
exports.tokenize = tokenize;
function flatten(arr) {
    return arr
        .reduce(function (flat, toFlatten) {
        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
}
exports.flatten = flatten;
//# sourceMappingURL=index.js.map