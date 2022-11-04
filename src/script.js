// let weather = {
//   "paris": {
//     temp: 19.7,
//     humidity: 80
//   },
//   "tokyo": {
//     temp: 17.3,
//     humidity: 50
//   },
//   "lisbon": {
//     temp: 30.2,
//     humidity: 20
//   },
//   "san francisco": {
//     temp: 20.9,
//     humidity: 100
//   },
//   "oslo": {
//     temp: -5,
//     humidity: 20
//   }
// };
// let city = prompt("Enter the city name");
// let arrayWithNames = Object.keys(weather);
// city = city.toLowerCase().trim();
// let a = 0;
// while(a < arrayWithNames.length){
//     if (arrayWithNames[a] === city){
//         city = city.charAt(0).toUpperCase() + city.slice(1);
//         alert(`The temperature in ${city} is ${Math.round(weather[arrayWithNames[a]].temp)}°C | ${Math.round((weather[arrayWithNames[a]].temp * 9 / 5) + 32)}°F with humidity ${weather[arrayWithNames[a]].humidity}%`);
//         break;
//     }
//     else{
//         a +=1;
//     }
// }
// if (a === arrayWithNames.length){
//     alert(`Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`);
// }
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thuesday", "Friday", "Saturday"];
let date = new Date();
let h2 = document.querySelector("#time");
let minutes = date.getMinutes();
if (minutes<10){
    minutes=`0${minutes}`;
}
h2.innerHTML = `${days[date.getDay()]} ${date.getHours()}:${minutes}`;

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

let search = document.querySelector("#search");
search.addEventListener("click", searching);

function changeToF(event){
    event.preventDefault();
    let temp = document.querySelector("#temperature");
    let temp2 = temp.innerHTML;
    temp.innerHTML= Math.round(Number(temp2)*9/5+32);
}
function changeToC(event){
    event.preventDefault();
    let temp = document.querySelector("#temperature");
    let temp2 = temp.innerHTML;
    temp.innerHTML= Math.round((Number(temp2)-32)*5/9);
}

let fff = document.querySelector("#farengeit");
let ccc = document.querySelector("#celsius");

fff.addEventListener("click", changeToF);
ccc.addEventListener("click", changeToC);


let key = "c119ffef35b7245a5e03b6e5724ae961";
function savePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let call = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
  console.log(call);
  axios.get(call).then(displayWeather);
  axios.get(call).then(displayCity);
}
function displayWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let h1 = document.querySelector("#temperature");
  h1.innerHTML = temperature;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  console.log(response.data);
  

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