const path = require('path');
const express = require('express');
const hbs = require('hbs');

const utils = require('./utils');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Rohan Surve'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        aboutMessage: 'I am Rohan Surve, the developer of this application. I am thrilled to bring you this simple but powerful application to know the current weather of any region around the globe. It uses data from mapbox.com and weatherstack.com!',
        name: 'Rohan Surve'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpMessage: 'This is our 24/7 help center. Please ask me if you need any help with the app.',
        name: 'Rohan Surve'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide a valid address'
        })
    }
    
    utils.geocode(req.query.address, (error, geocodeData) => {
        if (error) {
            return res.send({
                error: error
            })
        }
    
        utils.forecast(geocodeData.latitude, geocodeData.longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                'query address': req.query.address,
                'Location': geocodeData.location,
                'Weather description': forecastData.Weather_description,
                'Current Temperature': forecastData.Current_Temperature,
                'Feels Like': forecastData.Feels_Like,
                'Wind_Speed': forecastData.Wind_Speed,
                'Wind_Direction': forecastData.Wind_Direction,
                'Precipitation': forecastData.Precipitation
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.products) {
        return res.send({
            error: 'You must provide a product item.'
        })
    }

    console.log(req.query.location);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help Page Not Found',
        errorMessage: 'The Help article you are looking for was not found.',
        name: 'The Jedi Master'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page Not Found',
        errorMessage: 'The page you are looking for was not found.',
        name: 'The Jedi Master'
    });
})

// app.com
// app.com/help
// app.com/about

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
})