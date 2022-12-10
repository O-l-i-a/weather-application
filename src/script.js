
let key = "c119ffef35b7245a5e03b6e5724ae961";
let lat = null;
let lon = null;
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thuesday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thuesday", "Friday", "Saturday"];
let todaysday = null;

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
    let city1 = city.toLowerCase();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city1}&appid=${key}&units=metric`;
    let rrr = `https://api.openweathermap.org/geo/1.0/direct?q=${city1}&limit=5&appid=${key}`;
    axios.get(rrr).then(displayTime);
    axios.get(url).then(displayWeather);

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
  todaysday = response.data.day_of_week;
  let minutes = a.substring(14, 16);
  let hours = a.substring(11, 13);
  let h2 = document.querySelector("#time");
  h2.innerHTML = `${days[response.data.day_of_week]} ${hours}:${minutes}`;
}
function moon_phase(number){
  let a = "";
  if (number === 0 || number === 1){
    a = `moon_images/new-moon.png`;
  }else if (number<0.25){
    a = `moon_images/BIS025.png`;
  }else if (number===0.25){
    a = `moon_images/gleich025.png`;
  }else if (number<0.5){
    a = `moon_images/bis05.png`;
  }else if (number===0.5){
    a = `moon_images/gleich05.png`;
  }else if (number<0.75){
    a = `moon_images/bis075.png`;
  }else if (number===0.75){
    a = `moon_images/gleich075.png`;
  }else if (number< 1){
    a = `moon_images/bis1.png`;
  }
  return a;
}
function repiatble(day, dayTemperature, eveningTemperature, humidity, wind, icon, moon, i){
  let y = `		
  <div class="weather-the-next-days" id = "forecast">
			<div class="row next-day">
				<div class="col-2">
					<img class = "image-for-the-next-days" src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Sun with some clouds">
				</div>
				<div class="col-2 centered">
					<span class="temperatur-next-day vertical-centered"> <span id = "dayTemperatureForecast${i}">${dayTemperature}</span><span class = "temperatureNextDays" id = "temperatureNextDays${i}">°C</span></span>
				</div>
				<div class="col-4 nameCentered">
					<div class="day-name">
						${day}
					</div>
					<div class="preciration-next-day">
						💧 ${humidity}% 💨 ${wind}km/h
					</div>
				</div>
				<div class="col-2 centered">
					<span class="temperatur-next-day vertical-centered"><span id = "dayTemperatureForecastlow${i}">${eveningTemperature}</span><span class = "temperatureNextDays" id = "temperatureNextDayslow${i}">°C</span></span>
				</div>
				<div class="col-2">
					<img src="${moon}" alt="" class="image-for-next-moon vertical-centered-images">
				</div>
			</div>
		</div>`;
    return y;
}
function displayForecast(response){
  let forecastElement = document.querySelector("#forecast");
  let forecast = "";
  let dayTemperature = null;
  let eveningTemperature = null;
  let i = 0;
  let humidity = null;
  let wind = null;
  let icon = null;
  let moon = null;
  days.forEach(function(){
    if(i <5){
    dayTemperature = Math.round(response.data.daily[i].temp.max);
    eveningTemperature = Math.round(response.data.daily[i].temp.min);
    humidity =  Math.round(response.data.daily[i].humidity);
    wind =  Math.round(response.data.daily[i].wind_speed);
    icon = response.data.daily[i].weather[0].icon;
    moon =  moon_phase(response.data.daily[i].moon_phase);
    forecast += repiatble(days[todaysday+i+1], dayTemperature, eveningTemperature, humidity, wind, icon,moon, i);
    i ++;}
  })
  forecastElement.innerHTML = forecast;
}

// Convertion from F to C


function changeToF(event){
    event.preventDefault();
    let temp = document.querySelector("#temperature");
    temp.innerHTML= Math.round(celsiusDegree*9/5+32);
    let i = 0;
    while (i < 5){
    let tempForecast =document.querySelector(`#dayTemperatureForecast${i}`);
    let tempForecast2 = tempForecast.innerHTML;
    tempForecast.innerHTML = Math.round(Number(tempForecast2)*9/5+32);
    i++;
    }
    i = 0;
    while (i < 5){
      let tempForecast =document.querySelector(`#dayTemperatureForecastlow${i}`);
      let tempForecast2 = tempForecast.innerHTML;
      tempForecast.innerHTML = Math.round(Number(tempForecast2)*9/5+32);
      i++;
    }
    i = 0;
    while (i < 5){
      let forecast = document.querySelector(`#temperatureNextDays${i}`);
      forecast.innerHTML = "°F";
      i++;
    }
    i = 0;
    while (i < 5){
      let forecast = document.querySelector(`#temperatureNextDayslow${i}`);
      forecast.innerHTML = "°F";
      i++;
    }
    metric.classList.remove("inactive");
    imperial.classList.add("inactive");
    
}
function changeToC(event){
    event.preventDefault();
    let temp = document.querySelector("#temperature");
    temp.innerHTML= celsiusDegree;
    let i = 0;
    while (i < 5){
      let tempForecast =document.querySelector(`#dayTemperatureForecast${i}`);
      let tempForecast2 = tempForecast.innerHTML;
      tempForecast.innerHTML = Math.round((Number(tempForecast2)-32)*5/9);
      i++;
    }
    i = 0;
     while (i < 5){
      let tempForecast =document.querySelector(`#dayTemperatureForecastlow${i}`);
      let tempForecast2 = tempForecast.innerHTML;
      tempForecast.innerHTML = Math.round((Number(tempForecast2)-32)*5/9);
      i++;
    }
    i = 0;
    while (i < 5){
      let forecast = document.querySelector(`#temperatureNextDays${i}`);
      forecast.innerHTML = "°C";
      i++;
    }
    i = 0;
    while (i < 5){
      let forecast = document.querySelector(`#temperatureNextDayslow${i}`);
      forecast.innerHTML = "°C";
      i++;
    }
    imperial.classList.remove("inactive");
    metric.classList.add("inactive");
    let forecast = document.querySelector("#temperatureNextDays");
    forecast.innerHTML = "°C";
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
  lat = response.data.coord.lat;
  lon = response.data.coord.lon;
  let forecastLink = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}&units=metric`
  axios.get(forecastLink).then(displayForecast);
}
function displayCity(response){
  let city = response.data.name;
  let main = document.querySelector(".city-name");
  main.innerHTML = city;
}
function navigate(){
  navigator.geolocation.getCurrentPosition(savePosition);
}
function defaultWeather(){
    let h1 = document.querySelector("h1");
    let cityDefault = "New York";
    h1.innerHTML = cityDefault;
    let weatherLink = `https://api.openweathermap.org/data/2.5/weather?q=${cityDefault}&appid=${key}&units=metric`;
    let timeLink = `https://api.openweathermap.org/geo/1.0/direct?q=${cityDefault}&limit=5&appid=${key}`;
    axios.get(weatherLink).then(displayWeather);
    axios.get(timeLink).then(displayTime);

}
let current = document.querySelector("#button-addon3");
current.addEventListener("click", navigate);

let search = document.querySelector("#search");
search.addEventListener("click", searching);

let imperial = document.querySelector("#farengeit");
let metric = document.querySelector("#celsius");
let celsiusDegree = null;
imperial.addEventListener("click", changeToF);
metric.addEventListener("click", changeToC);

document.addEventListener("DOMContentLoaded", defaultWeather);
document.addEventListener("DOMContentLoaded", navigate);

