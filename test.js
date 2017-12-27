const rp = require('request-promise')
rp.get('https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592')
    .then(response => {
        const axislang = require('./index.js')
        let axis = new axislang()
        let expression = 'location -> latitude'
        try{
            let titles = axis.parse(expression, JSON.parse(response))
            console.log(titles)
        } catch (e){
            console.error(e)
        }
    })
    .catch(e => e)

