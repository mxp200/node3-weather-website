const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname, '[__DIRNAME]')
// console.log(path.join(__dirname, '..', '/public'))

const app = express()
const port = process.env.PORT || 3000

// define paths for Express config
const publicDirectoryPath = path.join(__dirname, '..', '/public')
const viewsPath = path.join(__dirname, '../views')
const partialsPath = path.join(__dirname, '../partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Reuben'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Reuben'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        message: 'This is the help page',
        name: 'Reuben'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            errorMessage: 'No address specified. Please specify an address.'
        })
    }
    geoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            console.log(error)
            return res.send({
                errorMessage: error
            })
        }
    
        const data = {
            latitude,
            longitude,
            location
        }
        
        forecast( data, (error, {weather_descriptions, temperature, feelslike, observation_time}) => {
    
            if (error) {
                console.log(error)
                return res.send({
                    errorMessage: error
                })
            }
            
            // console.log(chalk.greenBright(location))
            // console.log(chalk.greenBright(weather_descriptions + '. It is currently ' + temperature + ' degrees out. It feels like ' + feelslike + ' degrees out.'))
            // console.log(process.argv[2])
            res.send({
                location,
                forecast: weather_descriptions + '. It is currently ' + temperature + ' degrees out. It feels like ' + feelslike + ' degrees out.',
                address: req.query.address,
                observation_time
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            errorMessage: 'No search specified. Please specify a search value.'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        errorMessage: 'Help article not found',
        name: 'Reuben'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ', port)
})