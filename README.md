# Axis Lang

![logo](logo/axisLogo.svg)
A data-driven syntax

## What it does

Axis allows for quick access of data in JSON, ideal for APIs. Axis is designed to be a self adapting syntax. This means that Axis will understand the data that it is given by receiving a ambiguous syntax it allows for fast data retrieval.


## Examples

What it looks like

```haskell
data -> attributes -> title
```

This expression will extract the title inside of attributes which is inside of data. Because Axis is designed to be ambiguous, attributes could be an array of objects and Axis will still work as it will identify the content that is parsing.

## How to use it

Simply create an Axis parser instance and use the parse function, with an expression. The function will return an array with all the results it can find.

The following code will return `[JSON API paints my bikeshed!]`
```javascript
{
  "data": [{
    "type": "articles",
    "id": "1",
    "attributes": {
      "title": "JSON API paints my bikeshed!",
      "body": "The shortest article. Ever.",
      "created": "2015-05-22T14:56:29.000Z",
      "updated": "2015-05-22T14:56:28.000Z"
    },
    "relationships": {
      "author": {
        "data": {"id": "42", "type": "people"}
      }
    }
  }],
  "included": [
    {
      "type": "people",
      "id": "42",
      "attributes": {
        "name": "John",
        "age": 80,
        "gender": "male"
      }
    }
  ]
}
```
