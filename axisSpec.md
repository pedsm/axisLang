# Axis

Language spec

## AxisLang fundamentals

1. Return type is constant
    - Axis will always return an Array regardless if there is one item or many, this enforces users that code with Axis is designed to cater for multiple outputs cases which will work for a single output case
2. Everything that can be infered will be infered
    - A user writing Axis code must never require to specify anything that can be assumed, no parameter types should be defined as these can be defined later on
3. Axis strives for ambiguity
    - An axis expression should ideally work for many types of inputs 
    - For example a JSON API that returns a JSON object or multiple JSON objects should ideally be able to be handled by the same axis expression
4. Axis errors must be beutifully handled
    - Axis should be smart enough to understand its errors and inform them to the developer and not simply break the program
    - All errors must contain suggestions such as possible typo corrections.

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


## Real world examaples

### postcode.io

A postcode API for UK based post codes works extremely well with Axis. A request such as `http://api.postcodes.io/postcodes/ox495nu` will return

```json
{
    "status": 200,
    "result": {
        "postcode": "OX49 5NU",
        "quality": 1,
        "eastings": 464447,
        "northings": 195647,
        "country": "England",
        "nhs_ha": "South Central",
        "longitude": -1.06977254466896,
        "latitude": 51.6559271444373,
        "european_electoral_region": "South East",
        "primary_care_trust": "Oxfordshire",
        "region": "South East",
        "lsoa": "South Oxfordshire 011B",
        "msoa": "South Oxfordshire 011",
        "incode": "5NU",
        "outcode": "OX49",
        "parliamentary_constituency": "Henley",
        "admin_district": "South Oxfordshire",
        "parish": "Brightwell Baldwin",
        "admin_county": "Oxfordshire",
        "admin_ward": "Chalgrove",
        "ccg": "NHS Oxfordshire",
        "nuts": "Oxfordshire",
        "codes": {
            "admin_district": "E07000179",
            "admin_county": "E10000025",
            "admin_ward": "E05009735",
            "parish": "E04008109",
            "parliamentary_constituency": "E14000742",
            "ccg": "E38000136",
            "nuts": "UKJ14"
        }
    }
}
```
Meanwhile `http://api.postcodes.io/postcodes/ox495nu/nearest` will return 
```json
{
  "status": 200,
  "result": [
    {
      "postcode": "OX49 5NU",
      "quality": 1,
      "eastings": 464447,
      "northings": 195647,
      "country": "England",
      "nhs_ha": "South Central",
      "longitude": -1.06977254466896,
      "latitude": 51.6559271444373,
      "european_electoral_region": "South East",
      "primary_care_trust": "Oxfordshire",
      "region": "South East",
      "lsoa": "South Oxfordshire 011B",
      "msoa": "South Oxfordshire 011",
      "incode": "5NU",
      "outcode": "OX49",
      "distance": 0,
      "parliamentary_constituency": "Henley",
      "admin_district": "South Oxfordshire",
      "parish": "Brightwell Baldwin",
      "admin_county": "Oxfordshire",
      "admin_ward": "Chalgrove",
      "ccg": "NHS Oxfordshire",
      "nuts": "Oxfordshire",
      "codes": {
        "admin_district": "E07000179",
        "admin_county": "E10000025",
        "admin_ward": "E05009735",
        "parish": "E04008109",
        "parliamentary_constituency": "E14000742",
        "ccg": "E38000136",
        "nuts": "UKJ14"
      }
    }
  ]
}
```

Although the `/nearest` end point will return an Array of results, any Axis expression will work equally with both end points, requiring developers to write less code.

Expressions such as `result -> region` or `result -> postcode` will both work equally on both endpoints and many others if they stay consistent. 

## Axis access method

1. Checks for `undefined` or `null` and proprely outuputs error
2. Parse the data into JS Objects
3. Checks if current point is Object or Array
    - If Object access and pass the parameters down to recursive call
    - If Array 
        - Check for index and deal with it
        - Else perform normal map access
4. Return end result ALWAYS as Array