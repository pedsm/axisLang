define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function access(axisCode, data) {
        var tokens = tokenize(axisCode);
    }
    exports.default = access;
    function tokenize(axisCode) {
        return axisCode
            .split("")
            .filter(function (a) { return a === " "; })
            .join("")
            .split("->")
            .map(function (a, i) { return ({ value: a, index: i }); });
    }
    exports.tokenize = tokenize;
});
//# sourceMappingURL=index.js.map