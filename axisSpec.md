# Axis

Language spec

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
{data: {name: "One"}}
```
#### Root is Array
```json
[{data: {name: "One"}}]
```

#### Data is Array
```json
{data: [{name: "One"}]}
```

#### Data and root is Array
```json
[{data: [{name: "One"}]}]
```

#### Data, root and name is Array
```json
[{data: [{name: ["One"]}]}]
```