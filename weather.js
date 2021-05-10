

let weatherInformation = {};

function grabInput(){
let citySelection = document.getElementById('city').value;
getLocationDetails(citySelection);

}

//getLocationDetails("Denver");
function getLocationDetails (location) {
fetch (`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=47715d3c047fdb0a7399443d3242ba9f`)
.then(function(response){
    return response.json();
})
.then(function(response){
weatherInformation = response;
populateWeather();
})
.catch ((error) => { console.log(error);});
}

// on submit say hey populate the weather 
function populateWeather(){
        let currentLocation = document.getElementById('location');
        currentLocation.textContent = weatherInformation.name;

    let currentTemperature = document.getElementById('temperature');
    let tempToFahrenheight = 1.8 * (parseInt(weatherInformation.main.temp)-273) + 32;
    currentTemperature.textContent = tempToFahrenheight;

    let humidity = document.getElementById('humidity');
    humidity.textContent = weatherInformation.main.humidity;

/*
    let conditions = document.getElementById('conditions');
    conditions.textContent = weatherInformation.weather[802].description;
    console.log(weatherInformation); */

    let actualFeeling = document.getElementById('feels-like'); // might still not pull
    let whyNoWork = 1.8 * (parseInt(weatherInformation.main.feels_like)-273) + 32;
    actualFeeling.textContent = whyNoWork;


}




