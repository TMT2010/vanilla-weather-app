function formatDate(date) {
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let min = date.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }

  let dayIndex = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let day = days[dayIndex];

  return `${day} ${hour}:${min}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#day-forecast");
  let days = ["Sun", "Mon", "Tues", "Wed"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
      <div class="five-day-forecast">${day}</div>
            <img src="https://ssl.gstatic.com/onebox/weather/64/cloudy.png" alt="sunny" width="55"
            />
            <div class="lo-hi">
             <span class="low"> 45°
               </span>
               <span class="hi">56°</span>
             </div>
          </div>`;
  });
  forecastHTML = forecastElement + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let dateElement = document.querySelector("#todaysDate");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

function getForecast(coordinates) {
  let apiKey = "c9a1d00cde81ec7b52d8f92a4b7a5348";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function getWeather(response) {
  let iconElement = document.querySelector("#icon");

  document.querySelector("#mainCity").innerHTML = response.data.name;
  document.querySelector(".main-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weatherDescription").innerHTML =
    response.data.weather[0].main;

  document.querySelector("#pressure").innerHTML = Math.round(
    response.data.main.pressure
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function displayCelsius(event) {
  event.preventDefault();
  let tempElement = document.querySelector(".main-temp");

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let celsiusTemp = ((tempElement.innerHTML - 32) * 5) / 9;
  tempElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusLink = document.querySelector("#celsiusLink");
celsiusLink.addEventListener("click", displayCelsius);

function displayfahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector(".main-temp");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (tempElement.innerHTML * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fahrenheitTemp);
}

let fahrenheitLink = document.querySelector("#fahrenheitLink");
fahrenheitLink.addEventListener("click", displayfahrenheit);

function search(cityName) {
  let apiKey = "c0439477745b320addbedcd6c06eaeea";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(getWeather);
}

function submitCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#searchBox").value;
  search(cityName);
}
search("Charlotte");
let searchBox = document.querySelector("#searchForm");
searchBox.addEventListener("submit", submitCity);
displayForecast();
