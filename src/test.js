const axis = require("../bin/index.js")
var assert = require('chai').assert;

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

// describe('Access depth', () =>  {
//     it("Strings should not have depth", () => {
//        const code = "data -> name -> [1]" 
//        assert.equal(axis.isDeep("Hello"), false)
//     })
//     it("Numbers should not have depth", () => {
//        const code = "data -> name -> [1]" 
//        assert.equal(axis.isDeep(213141), false)
//     })
//     it("Booleans should not have depth", () => {
//        const code = "data -> name -> [1]" 
//        assert.equal(axis.isDeep(true), false)
//     })
//     it("Objects should have depth", () => {
//        const code = "data -> name -> [1]" 
//        assert.equal(axis.isDeep({hello: "goodbye"}), true)
//     })
//     it("Simple arrays should not have depth", () => {
//        const code = "data -> name -> [1]" 
//        assert.equal(axis.isDeep([1,2,3]), false)
//     })
//     it("Complex arrays should have depth", () => {
//        const code = "data -> name -> [1]" 
//        assert.equal(axis.isDeep([{}, {}]), true)
//     })
// })

describe('Spec examples', () => {
    const specTests = [
        { data: { name: "One" } },
        [{ data: { name: "One" } }],
        { data: [{ name: "One" }] },
        [{ data: [{ name: "One" }] }],
        [{ data: [{ name: ["One"] }]}],
        [[{ data: [{ name: ["One"] }] }]]
    ]

    specTests.forEach((testData, i)=> {
        it("should return ['One'] as a result", () => {
        const code = "data -> name" 
        assert(JSON.stringify(axis.parse(code, testData)) === '["One"]', `Result should match spec ${i}`)
        })
    });
})

describe('index access', () =>  {
    it("should return ['right'] as a result", () => {
       const code = "data -> name -> [1]" 
       assert.equal(JSON.stringify(axis.parse(code, {data: { name: ['wrong', 'right']}})), '["right"]')
    })
})

describe('single token access', () => {
    it("should return a list of 5 ids", () => {
        const testData = require('./testInput.json')
        const code = "_id"
        const value = axis.parse(code, testData)
        assert.equal(value.length, 5, 'there should be 5 ids')
    })
    it("should return a list of 15 friends", () => {
        const testData = require('./testInput.json')
        const code = "friends"
        const value = axis.parse(code, testData)
        assert.equal(value.length, 15, 'there should be 15 friends')
    })
})