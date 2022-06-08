function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Tue", "Wed", "Thu"];
  forecast.forEach(function (forecastDay) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
    <div class="weather-forecast" id="forecast">
         
            
              <div class="weather-forecast-date">${forecastDay.dt}</div>
              <img
                src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
                alt=""
                width="42"
              />
              <div class="weather-forecast-temp">
                <span class="weather-temp-max">${forecastDay.temp.max}</span>
                <span class="weather-temp-min">${forecastDay.temp.min}</span>
              
            </div>
          </div>
        </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  searchCity(cityInput.value);
}

function searchCity(city) {
  let apiKey = "04a4c6b7d36ff0119bbd7e0ebcad102c";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiURL).then(showWeather);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function showPosition(position) {
  let h2 = document.querySelector("h1");
  h2.innerHTML = `Lat: ${position.coords.latitude} & Lon: ${position.coords.longitude} Temp:`;
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);

function getForecast(coordinates) {
  let apiKey = "04a4c6b7d36ff0119bbd7e0ebcad102c";
  let apiURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}units=metric`;
  axios.get(apiURL).then(displayForecast);
}

function showWeather(response) {
  let cityElement = document.querySelector("h1");
  let temperatureElement = document.querySelector("#current-temp");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#windSpeed");
  let descriptionElement = document.querySelector("#description");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  windSpeedElement.innerHTML = `Wind Speed: ${Math.round(
    response.data.wind.speed
  )} km/h`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);
