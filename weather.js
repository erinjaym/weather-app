let weatherInformation = {};

function grabInput() {
  let citySelection = document.getElementById("search").value;
  getLocationDetails(citySelection);
}

const generateToken = (function () {
  let tokenGeneration = "47715d3c047fdb0a7399443d3242ba9f";
  function weatherApi() {
    return tokenGeneration;
  }
  return { weatherApi };
})();

function getLocationDetails(location) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${generateToken.weatherApi()}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      weatherInformation = response;
      populateWeather();
    })
    .catch((error) => {
      console.log(error);
    });
}

function populateWeather() {

  (function setBackgroundPic() {
    let findSnow = /snow/gi;
    let findRain = /rain/gi;
    let findClouds = /cloud/gi;
    let findClear = /clear/gi;

    let stringToSearch = weatherInformation.weather[0].description;
    if (stringToSearch.match(findSnow)) {
      let display = document.getElementById("background-wrapper");
      display.style.backgroundImage = "url('./images/snow.jpeg')"
    } else if (stringToSearch.match(findRain)) {
      let display = document.getElementById("background-wrapper");
      display.style.backgroundImage = "url('./images/rain.jpeg')";
    } else if (stringToSearch.match(findClouds)) {
      let display = document.getElementById("background-wrapper");
      display.style.backgroundImage = "url('./images/clouds.jpeg')";
    } else if (stringToSearch.match(findClear)) {
      let display = document.getElementById("background-wrapper");
      display.style.backgroundImage = "url('./images/clear.jpeg')";
    }
  })();

  let currentLocation = document.getElementById("location");
  currentLocation.textContent = weatherInformation.name;

  let currentTemperature = document.getElementById("temperature");
  let tempToFahrenheight = (1.8 * (parseInt(weatherInformation.main.temp) - 273) + 32).toFixed(1);
  currentTemperature.textContent = tempToFahrenheight + "°F";

  let humidity = document.getElementById("humidity");
  humidity.textContent = weatherInformation.main.humidity + "%";

  let conditions = document.getElementById("condition");
  conditions.textContent = weatherInformation.weather[0].description;

  let actualFeeling = document.getElementById("feels-like");
  let feelingToF = (1.8 * (parseInt(weatherInformation.main.feels_like) - 273) + 32).toFixed(1);
  actualFeeling.textContent = feelingToF + "°F";
}

(function getDefaultLocation() {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=Tokyo,JP&appid=47715d3c047fdb0a7399443d3242ba9f`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      weatherInformation = response;
      populateWeather();
    })
    .catch((error) => {
      console.log("Could not find location due to an error: " + error);
    });
})();

(function setUpInput() {
  let searchBar = document.getElementById("search");
  searchBar.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      grabInput();
    }
  });
})();
