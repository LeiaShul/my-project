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
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  axios.get(apiUrl).then(showTemp)
}
function showTemp(response){
  let tempInPosition = response.data.main.temp;
  let temp = document.querySelector("#temp");
  temp.innerHTML = Math.round(tempInPosition);
  OutputCity.innerHTML = response.data.name;
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

let apiKey = "600157a0514e78d72315f525be6579c1";
let input = document.querySelector("#input");
input.addEventListener("submit", submit);
input.addEventListener("reset", Navigator);
let OutputCity = document.querySelector("#city");