
let key = "c119ffef35b7245a5e03b6e5724ae961";
let lat = null;
let lon = null;
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thuesday", "Friday", "Saturday"];


function searching(event){
    event.preventDefault();
    let h1 = document.querySelector("h1");
    let input = document.querySelector("#search-enjine");
    let city = input.value;
    city = city.toLowerCase();
    let firstLetter = city.charAt(0);
    let firstLetterCap = firstLetter.toUpperCase();
    let remainingLetters = city.slice(1);
    city = firstLetterCap + remainingLetters;
    h1.innerHTML = city;
    let apiKey = "c119ffef35b7245a5e03b6e5724ae961";
    city = city.toLowerCase();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    let rrr = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;
    axios.get(url).then(displayWeather);
    axios.get(rrr).then(displayTime);

}
function displayTime(response){
  lon = response.data[0].lon;
  lat = response.data[0].lat;
  let region = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=${key}`;
  axios.get(region).then(displayTime2);
  //let timeThere = `http://worldtimeapi.org/api/timezone/America/Argentina/Salta`

}
function displayTime2(response){
  let timezone =response.data.timezone;
  let timeThere = `https://worldtimeapi.org/api/timezone/${timezone}`;
  axios.get(timeThere).then(displayTime3);
}
function displayTime3(response){
  let a = response.data.datetime;
  let minutes = a.substring(14, 16);
  let hours = a.substring(11, 13);
  let h2 = document.querySelector("#time");
  h2.innerHTML = `${days[response.data.day_of_week]} ${hours}:${minutes}`;
}



// Convertion from F to C


function changeToF(event){
    event.preventDefault();
    let temp = document.querySelector("#temperature");
    temp.innerHTML= Math.round(celsiusDegree*9/5+32);
    metric.classList.remove("inactive");
    imperial.classList.add("inactive");

}
function changeToC(event){
    event.preventDefault();
    let temp = document.querySelector("#temperature");
    temp.innerHTML= celsiusDegree;
    imperial.classList.remove("inactive");
    metric.classList.add("inactive");
}




//Current Weather



function savePosition(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  let call = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
  axios.get(call).then(displayWeather);
  axios.get(call).then(displayCity);
  let date = new Date();
  let h2 = document.querySelector("#time");
  let minutes = date.getMinutes();
  if (minutes<10){
    minutes=`0${minutes}`;
  }
  h2.innerHTML = `${days[date.getDay()]} ${date.getHours()}:${minutes}`;
}
function displayWeather(response) {
  celsiusDegree = Math.round(response.data.main.temp);
  let h1 = document.querySelector("#temperature");
  h1.innerHTML = celsiusDegree;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );  
  let windSpeed = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#wind");
  wind.innerHTML = windSpeed;
  let humidity = Math.round(response.data.main.humidity);
  humidityInDokument = document.querySelector("#humidity");
  humidityInDokument.innerHTML = humidity;
}
function displayCity(response){
  let city = response.data.name;
  let main = document.querySelector(".city-name");
  main.innerHTML = city;
}
function navigate(){
  navigator.geolocation.getCurrentPosition(savePosition);
}
let current = document.querySelector("#button-addon3");
current.addEventListener("click", navigate);


document.addEventListener("DOMContentLoaded", navigate);

let search = document.querySelector("#search");
search.addEventListener("click", searching);


let imperial = document.querySelector("#farengeit");
let metric = document.querySelector("#celsius");
let celsiusDegree = null;
imperial.addEventListener("click", changeToF);
metric.addEventListener("click", changeToC);