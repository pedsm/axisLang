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