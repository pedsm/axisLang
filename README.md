# Axis Lang

![travis](https://travis-ci.org/pedsm/axisLang.svg?branch=master)
![logo](logo/axisLogo.png)

A data-driven syntax

## What it does

Axis allows for quick access of data in JSON files or JavaScript data structures, ideal for APIs. Axis queries require the least possible amount of writing in order to access any JSON data


## Examples

What it looks like

```haskell
data -> attributes -> title
```

This expression will extract the title inside of attributes which is inside of data. Because Axis is designed to be ambiguous, attributes could be an array of objects and Axis will still work as it will identify the content that is parsing.

[Axis Language specs](https://github.com/pedsm/axisLang/blob/master/axisSpec.md) for more examples
### How to use it

Axis is used through a single method, simply provide an axis epression and a piece of data JSON string or Javascript object in order to query it

The following code will print all friends' names as an array

```javascript
const axis = require('axislang')
const data = require('./input.json') // input.json link below

const allFriends = axis.parse('friends -> name', data) // Returns
// [ 'Britney Hensley', 'Annmarie Ryan', 'Hess Decker', 'Bolton Shaffer', 'Ruth Caldwell', 'Medina Kline', 'Tami Duncan', 'Lawrence Hooper', 'Esperanza Hickman', 'Winnie Stark', 'Madeleine Luna', 'Petty Vance', 'Mcgee Roy', 'Baldwin Waters', 'Marie Neal' ]
console.log(allFriends) 
```
Look at [input.json](https://github.com/pedsm/axisLang/blob/master/src/testInput.json) 

Axis abstracts away the process of extracting information from inside complex json objects and transforms into a single redable expression.

### When to use it?

Axis is not designed to be perfomance oriented at least this parser in it's current state is not. However future implmentations may be, Axis is designed to avoid bugs and improve development speed, axis use a high level approach to accessing data where development speed may be more important than runtime speed.

Axis is extremely useful when working with any API or data source that uses JSON for data transfer. However it is not recommended for Big data applications.