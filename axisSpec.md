# Axis

Language spec

## Axis code fundamentals

1. Return type is constant
    - Axis will always return an Array regardless if there is one item or many, this enforces users that code with Axis to cater for multiple outputs cases which automatically works for a single output case
2. Everything that can be infered will be infered
    - A user writing Axis code must never require to specify anything that can be assumed, no parameter types should be defined as these can be defined later on
3. Axis strives for ambiguity
    - An axis expression should ideally work for many types of inputs 
    - For example a JSON API that returns a JSON object or multiple JSON objects should ideally be able to be handled by the same axis expression
4. Axis errors must be beutifully handled
    - Axis should be smart enough to understand its errors and inform them to the developer and not simply break the program
    - All errors must contain suggestions such as possible typo corrections.

## Axis access method

1. Checks for `undefined` `null` and proprely outuputs error
2. Parse the data into JS Objects
3. Checks if current point is Object or Array
    - If Object access and pass the parameters down
    - If Array 
        - Check for index and deal with it
        - Else perform normal map access
4. Return end result ALWAYS as Array

## Axis Methods

### public
- access(axisCode: string, data: string | object | array)

### private
- tokenize


## Examples
All of these data structures must return the exact same result for the following expression
```haskell
data -> name
```

### Allowed structures
#### No Arrays
```json
{
    "data": {
        "name": "One"
    }
}
```
#### Root is Array
```json
[
    {
        "data": {
            "name": "One"
        }
    }
]
```

#### Data is Array
```json
{
    "data": [
        {
            "name": "One"
        }
    ]
}
```

#### Data and root is Array
```json
[
    {
        "data": [
            {
                "name": "One"
            }
        ]
    }
]
```

#### Data, root and name is Array
```json
[
    {
        "data": [
            {
                "name": [
                    "One"
                    ]
            }
        ]
    }
]
```

All of these examples should return `["One"]`.