let now = new Date;
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];
let time = `${now.getHours()}:${now.getMinutes()}`;
let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${day} ${time}`;
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function beginning() {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Kyiv&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);

}


function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(forecast);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5){
      forecastHTML = forecastHTML + `
      <div class="col">
        <div class="card text-center">
          <div class="card-body">
            <h5 class="card-title fs-6">${formatDay(forecastDay.dt)}</h5>
            <h6 class="card-subtitle text-muted ">
              <span id="min">${Math.round(forecastDay.temp.min)}</span>°/<span id="max">${Math.round(forecastDay.temp.max)}</span>°
            </h6>
            <p class="card-text">
              <img class="imgForecast" src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" width="60px">
            </p>
          </div>
        </div>
      </div>`
    }
  })
  
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let apiKey = "600157a0514e78d72315f525be6579c1";
  let apiUrl =`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function submit(event) {
  event.preventDefault();
  let InputCity = document.querySelector("#input-city");
  let city = InputCity.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);

}
function showTemp(response) {
  console.log(response);
  celsiusTemp = response.data.main.temp;
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let main = document.querySelector("#main");
  let icon = document.querySelector("#icon");

  temp.innerHTML = Math.round(celsiusTemp);
  OutputCity.innerHTML = response.data.name;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = response.data.wind.speed;
  main.innerHTML = response.data.weather[0].main;
  iconCode = response.data.weather[0].icon;
  converterLink.innerHTML = "°F";
  degrees.innerHTML = "°C";

  icon.setAttribute(
    "src", `http://openweathermap.org/img/wn/${iconCode}@2x.png`
  )
  getForecast(response.data.coord);
}
function Navigator(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(Position)
}
function Position(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  apiKey = "600157a0514e78d72315f525be6579c1";
  let apiUrlLoc = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  axios.get(apiUrlLoc).then(showTemp)
}
function converter(event) {
  event.preventDefault();
  let min = document.querySelectorAll("#min");
  let max = document.querySelectorAll("#max");
  if (converterLink.innerHTML === "°F") {
    converterLink.innerHTML = "°C";
    degrees.innerHTML = "°F";
    temp.innerHTML = Math.round(celsiusTemp * 1.8 + 32);
    min.forEach(function(min){
      min.innerHTML = Math.round(min.innerHTML * 1.8 + 32)
    });
    max.forEach(function(max){
      max.innerHTML = Math.round(max.innerHTML * 1.8 + 32)
    });
  }

  else {
    degrees.innerHTML = "°C";
    converterLink.innerHTML = "°F";
    temp.innerHTML = Math.round(celsiusTemp);
    min.forEach(function(min){
      min.innerHTML = Math.round((min.innerHTML - 32) / 1.8)
    });
    max.forEach(function(max){
      max.innerHTML = Math.round((max.innerHTML - 32) / 1.8)
    });
  }
}
let celsiusTemp = null;
let apiKey = "600157a0514e78d72315f525be6579c1";
let temp = document.querySelector("#temp");
let input = document.querySelector("#input");
input.addEventListener("submit", submit);
input.addEventListener("reset", Navigator);
let converterLink = document.querySelector("#converter");
converterLink.addEventListener("click", converter)
let degrees = document.querySelector("#degrees");
let OutputCity = document.querySelector("#city");
beginning();