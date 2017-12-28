# Axis

Language spec

## Axis parsing method

1. Checks for `undefined` `null` and proprely outuputs error
2. Checks if there are no tokens left to end
3. Checks if current point is Object or Array
    - If Object follow access pattern
    - If Index follow access pattern
    - If Array follow recursive pattern
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