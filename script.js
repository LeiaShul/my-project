let now = new Date;
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];
let time = `${now.getHours()}:${now.getMinutes()}`;
let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${day} ${time}`;

function submit(event) {
  event.preventDefault();
  let InputCity = document.querySelector("#input-city");
  let city = InputCity.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}
function showTemp(response) {
  console.log(response);
  let tempInPosition = response.data.main.temp;

  temp.innerHTML = Math.round(tempInPosition);
  OutputCity.innerHTML = response.data.name;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = response.data.wind.speed;
  let main = document.querySelector("#main");
  main.innerHTML = response.data.weather[0].main;
  let icon = document.querySelector("#icon");
  iconCode = response.data.weather[0].icon;
  converterLink.innerHTML = "°F";
  degrees.innerHTML = "°C";

  icon.setAttribute(
    "src", `http://openweathermap.org/img/wn/${iconCode}@2x.png`
  )
}
function Navigator(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(Position)
}
function Position(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrlLoc = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  axios.get(apiUrlLoc).then(showTemp)
}
function converter(event) {
  event.preventDefault();
  if (converterLink.innerHTML === "°F") {
    converterLink.innerHTML = "°C";
    degrees.innerHTML = "°F";
    temp.innerHTML = Math.round(temp.innerHTML * 1.8 + 32);
  }
  else {
    degrees.innerHTML = "°C";
    converterLink.innerHTML = "°F";
    temp.innerHTML = Math.round((temp.innerHTML - 32) / 1.8);
  }

}

let apiKey = "600157a0514e78d72315f525be6579c1";
let temp = document.querySelector("#temp");
let input = document.querySelector("#input");
input.addEventListener("submit", submit);
input.addEventListener("reset", Navigator);
let converterLink = document.querySelector("#converter");
converterLink.addEventListener("click", converter)
let degrees = document.querySelector("#degrees");
let OutputCity = document.querySelector("#city");

