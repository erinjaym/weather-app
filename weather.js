

let weatherInformation = {};

function grabInput(){
let citySelection = document.getElementById('city').value;
getLocationDetails(citySelection);
}

const generateToken = (function (){
let tokenGeneration = "47715d3c047fdb0a7399443d3242ba9f"
function weatherApi() {
    return tokenGeneration;
}
return {weatherApi}
})();

//getLocationDetails("Denver");
function getLocationDetails (location) {
fetch (`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${generateToken.weatherApi()}`)
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
    setBackgroundPic();
    function setBackgroundPic () {
        let findSnow = /snow/ig;
        let findRain = /rain/ig;
        let findClouds = /cloud/ig;
        let findClear = /clear/ig;

        let stringToSearch = weatherInformation.weather[0].description;

        if (stringToSearch.match(findSnow)){
            document.body.style.backgroundImage = "url('./images/snow.jpeg')";
        }else if(stringToSearch.match(findRain)){
            document.body.style.backgroundImage = "url('./images/rain.jpeg')";
        }else if (stringToSearch.match(findClouds)){
            document.body.style.backgroundImage = "url('./images/clouds.jpeg')";
        }else if (stringToSearch.match(findClear)){
            document.body.style.backgroundImage = "url('./images/clear.jpeg')";
        }
    };


    let currentLocation = document.getElementById('location');
    currentLocation.textContent = weatherInformation.name;

    let currentTemperature = document.getElementById('temperature');
    let tempToFahrenheight = 1.8 * (parseInt(weatherInformation.main.temp)-273) + 32;
    currentTemperature.textContent = tempToFahrenheight + "°F";

    let humidity = document.getElementById('humidity');
    humidity.textContent = weatherInformation.main.humidity + '%';

    let conditions = document.getElementById('condition');
    conditions.textContent = weatherInformation.weather[0].description;
    console.log(weatherInformation);

    let actualFeeling = document.getElementById('feels-like'); 
    let feelingToF = 1.8 * (parseInt(weatherInformation.main.feels_like)-273) + 32;
    actualFeeling.textContent = feelingToF + "°F";
}

(function getDefaultLocation() {
    fetch (`https://api.openweathermap.org/data/2.5/weather?q=Tokyo,JP&appid=47715d3c047fdb0a7399443d3242ba9f`)
    .then(function(response){
        return response.json();
    })
    .then(function(response){
    weatherInformation = response;
    populateWeather();
    })
    .catch ((error) => { console.log(error);});
    })();
    



