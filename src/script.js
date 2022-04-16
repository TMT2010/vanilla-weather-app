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

let dateElement = document.querySelector("#todaysDate");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

function getWeather(response) {
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
}

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
