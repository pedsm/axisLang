const axis = require("../bin/index.js")
var assert = require('assert');
console.log(axis.tokenize)

describe('Tokenize', () => {
    it('should return 3 tokens', () => {
        const code = "axis -> code -> test"
        assert.equal(axis.tokenize(code).length, 3)
    })
    it('token 4 should be an index token', () => {
        const code = "axis -> code -> test -> [5]"
        assert.equal(axis.tokenize(code)[3].value, '[5]')
    })
})

describe('Spec examples', () => {
    it("should return ['One'] as a result", () => {
       const code = "data -> name" 
       assert.equal(JSON.stringify(axis.parse({ data: { name: "One" } }), '["One"]'))
    })
    it("should return ['One'] as a result", () => {
       const code = "data -> name" 
       assert.equal(JSON.stringify(axis.parse([{ data: { name: "One" } }]), '["One"]'))
    })
    it("should return ['One'] as a result", () => {
       const code = "data -> name" 
       assert.equal(JSON.stringify(axis.parse({ data: [{ name: "One" }] }), '["One"]'))
    })
    it("should return ['One'] as a result", () => {
       const code = "data -> name" 
       assert.equal(JSON.stringify(axis.parse([{ data: [{ name: "One" }] }]), '["One"]'))
    })
    it("should return ['One'] as a result", () => {
       const code = "data -> name" 
       assert.equal(JSON.stringify(axis.parse([{ data: [{ name: ["One"] }] }]), '["One"]'))
    })
    it("should return ['One'] as a result", () => {
       const code = "data -> name" 
       assert.equal(JSON.stringify(axis.parse([[{ data: [{ name: ["One"] }]}]]), '["One"]'))
    })
})

describe('index access', () =>  {
    it("should return ['One'] as a result", () => {
       const code = "data -> name -> [1]" 
       assert.equal(JSON.stringify(axis.parse({data: { name: ['wrong', 'right']}}), '["right"]'))
    })
})