const request = require('request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibXhwMjAwIiwiYSI6ImNraGQ5NnJrejA0emIyc3A1bWRkYjBlcGkifQ.BksTj8u_YgZzJiBvqFETfw&limit=1&language=en'

    request( { url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to Location Services', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Please try another search', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode