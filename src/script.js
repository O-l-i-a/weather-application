let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thuesday", "Friday", "Saturday"];
let date = new Date();
let h2 = document.querySelector("#time");
let minutes = date.getMinutes();
if (minutes<10){
    minutes=`0${minutes}`;
}
h2.innerHTML = `${days[date.getDay()]} ${date.getHours()}:${minutes}`;
document.addEventListener("DOMContentLoaded", navigate);

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
    axios.get(url).then(displayWeather);
}
document.addEventListener("DOMContentLoaded", navigate )
let search = document.querySelector("#search");
search.addEventListener("click", searching);


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

let imperial = document.querySelector("#farengeit");
let metric = document.querySelector("#celsius");
let celsiusDegree = null;
imperial.addEventListener("click", changeToF);
metric.addEventListener("click", changeToC);


//Current Weather


let key = "c119ffef35b7245a5e03b6e5724ae961";
function savePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let call = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
  axios.get(call).then(displayWeather);
  axios.get(call).then(displayCity);
}
function displayWeather(response) {
  celsiusDegree = Math.round(response.data.main.temp);
  let h1 = document.querySelector("#temperature");
  h1.innerHTML = celsiusDegree;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );  

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