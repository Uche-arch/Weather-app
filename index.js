const apiKey = "34dcd4f24f9af487b23f30d402944ced";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");


window.addEventListener("keydown", add);
function add(event) {
  switch (event.key) {
    case "Enter":
      checkWeather();
      break;
  }
}

async function checkWeather() {
  const city = searchBox.value.trim(); // <-- Get the city from the input field
  saveWeather();
  // Check if the city is empty
  if (!city) {
    alert("Please enter a city name.");
    return; // Stop the function if no city is provided
  }

  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if(response.status == 404){
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  }else{
    let data = await response.json();
    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.floor(data.main.temp) + "&deg;c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "./img/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "./img/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "./img/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "./img/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "./img/mist.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
    
    searchBox.value = "";
  }
}

searchBtn.addEventListener("click", checkWeather);





function saveWeather(){
  localStorage.setItem("weather", city);
}
function showWeather(){
  city = localStorage.getItem("weather");
  searchBox.innerHTML = city;
}
document.addEventListener("DOMContentLoaded", showWeather());
console.log(city = localStorage.getItem("weather"));
