const rp = require('request-promise')

log = a => {}

class Axis {
    constructor() {
        this.items = [];
    }

    static tokenize(expression) {
        return expression
            .split('->')
            .map(a =>
                a.split('')
                .filter(a => a !== ' ')
                .reduce((a, b) => a+b)
            )
    }

    access(tokens, data) {
        // First check undefined
        let current = data
        if (tokens.length == 0) {
            this.items.push(current)
            return
        }
        for(let i = 0; i < tokens.length; i++) {
            log(`checking for ${tokens[i]} in ${JSON.stringify(current)}\n\n`)
            if(tokens.length === 0 ) {
                log(`Found new entry total = ${this.items.length}`)
                this.items.push(current)
                return
            }
            // deal with array
            if(Array.isArray(current[tokens[i]])) {
                // check for index access
                if(tokens.length > 2) {
                    if(tokens[i+1].match(/^\[[0-9]*\]$/) !== null) {
                        log('found index')
                        current = current[tokens[i]]
                        this.access(tokens.slice(i+2), current[parseInt(tokens[i+1].slice(1))])
                        return
                    }
                }
                // Recursive map magic
                log('function instance terminated thanks to recursive map')
                current[tokens[i]].map(a => {
                    this.access(tokens.slice(i+1), a)
                })
                return
            } else {
                // Deal with end of the function
                log(i, tokens.length)
                if(i === tokens.length - 1) {
                    log(`Found new entry total = ${this.items.length}`)
                    this.items.push(current[tokens[i]])
                    return
                }
                // Deal with undefined
                log(typeof current[tokens[i]] == 'undefined')
                if (typeof current[tokens[i]] === 'undefined') {
                    throw new Error(`${tokens[i]}(index ${i}) does not exits on ${JSON.stringify(current)}`)
                }
                // Move current
                current = current[tokens[i]]
            }
        }
    }
    parse(expression, data) {
        this.access(Axis.tokenize(expression), data)
        return this.items
    }
}

module.exports = Axis

parser = new Axis()
axisCode = 'hits -> hits -> _source -> version'
url = 'http://localhost:7777/rand'

// console.log(parser.tokenize(axisCode));

rp(url)
    .then((response) => {
        // parser.access(Axis.tokenize(axisCode), JSON.parse(response))
        // console.log(parser.items)
        console.log(parser.parse(axisCode, JSON.parse(response)))
    })
    .catch(e => console.error(e))
