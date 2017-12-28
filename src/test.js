const axis = require("../bin/index.js")
var assert = require('assert');
console.log(axis.tokenize)

describe('Tokenize', () => {
    it('should return 3 tokens', () => {
        const code = "axis -> code -> test"
        assert.equal(axis.tokenize(code).length, 3)
    })
})