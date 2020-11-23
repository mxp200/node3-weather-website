const request = require('request')

const forecast = ({latitude, longitude}, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=241e382c15c5a2e54a9351d2e7243110&query=' + latitude + ',' + longitude + '&units=m'

    request( { url, json: true }, (error, {body} = {}) => {
        if (error) {
            callback('Error communicating with forecast service.', undefined)
        } else if (body.success === false) {
            callback('No location found with given coordinates. Please input a valid coordinate', undefined)
        } else {
            console.log(body.current)
            callback(undefined, body.current)
        }
    })
}

module.exports = forecast