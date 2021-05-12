const request = require('request');
/* const chalk = require('chalk');

// const successColorCode = chalk.bgGreen.black;
// const successColorCodeWithStyle = chalk.bold.bgYellow.black;
// const failureColorCode = chalk.bgRed;

// Creating a utility function that takes an address and returns the coordinates */

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoicm9oYW5zdXJ2ZTIxMiIsImEiOiJja256cmF5a3YwMmJwMm9wZXpnemU2cTlrIn0.HXyotjBZpJ2n3G6eZjG79g&limit=1`;

    request({ url: url, json: true }, (error, response) => {
        if(error) {
            callback('Unable to connect to the weather service.', undefined);
        } else if (response.body.features.length === 0) {
            callback('Unable to find coordinates for the entered location. Try again with a different search term.', undefined);
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            });
        }
    });
}

// Creating a utility function that takes coordinates as input and returns the weather data for those coordinates

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=98cdd2e265ec64dd7c641a89ff34072f&query=${longitude},${latitude}`;

    request({ url, json: true }, (error, response) => {

        if (error) {
            callback('Unable to connect to the weather service.', undefined);
        } else if (response.body.error) {
            callback(response.body.error.info, undefined);
        } else {
            callback(undefined, {
                Weather_description: response.body.current.weather_descriptions[0],
                Current_Temperature: `${response.body.current.temperature}°C`,
                Feels_Like: `${response.body.current.feelslike}°C`,
                Wind_Speed: `${response.body.current.wind_speed} kmph`,
                Wind_Direction: `${response.body.current.wind_dir}`,
                Precipitation: (response.body.current.precip * 100)
            });
        }
    });
}


module.exports = {
    geocode: geocode,
    forecast: forecast
}

