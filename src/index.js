function formatDate(date) {
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

let dateElement = document.querySelector("#current-date");
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

  axios.get(apiURL).then(displayCurrentWeather);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function displayCurrentWeather(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector(".current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
}

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
