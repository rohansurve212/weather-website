const weatherForm = document.querySelector('form');
const searchQuery = document.getElementById('searchQuery');
const messageOne = document.getElementById('messageOne');
const messageTwo = document.getElementById('messageTwo');
// const messageThree = document.getElementById('messageThree');
// const messageFour = document.getElementById('messageFour');

const windDirLongFormLookUp = {
    'N' : 'North',
    'NbE' : 'North by East',
    'NNE' : 'North-Northeast',
    'NEbN' : 'Northeast by North',
    'NE' : 'Northeast',
    'NEbE' : 'Northeast by East',
    'ENE' : 'East-Northeast',
    'EbN' : 'East by North',
    'E' : 'East',
    'EbS' : 'East by South',
    'ESE' : 'East-Southeast',
    'SEbE' : 'Southeast by East',
    'SE' : 'Southeast',
    'SEbS' : 'Southeast by South',
    'SSE' : 'South-Southeast',
    'SbE' : 'South by East',
    'S' : 'South',
    'SbW' : 'South by West',
    'SSW' : 'South-Southwest',
    'SWbS' : 'Southwest by South',
    'SW' : 'Southwest',
    'SWbW' : 'Southwest by West',
    'WSW' : 'West-Southwest',
    'WbS' : 'West by South',
    'W' : 'West',
    'WbN' : 'West by North',
    'WNW' : 'West-Northwest',
    'NWbW' : 'Northwest by West',
    'NW' : 'Northwest',
    'NWbN' : 'Northwest by North',
    'NNW' : 'North-Northwest',
    'NbW' : 'North by West'
}

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = searchQuery.value;

    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
                messageTwo.textContent = "";
            } else {
                const wind_dir = windDirLongFormLookUp[data['Wind_Direction']];
                messageOne.textContent = `Location: ${data['Location']}`;
                messageTwo.textContent = `The current forecast for ${location} is, ${data['Weather description']}. The temperature right now is ${data['Current Temperature']} and it feels like ${data['Feels Like']}. The wind speed is ${data['Wind_Speed']} and is blowing in the ${wind_dir} direction. There is a ${data['Precipitation']}% chance of rain.`;
            }
        })
    })
})
