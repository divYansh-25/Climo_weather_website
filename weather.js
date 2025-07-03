let city = document.getElementById("city");
let country = document.getElementById("country");
let temp = document.getElementById("temp");
let images = document.getElementById("img");
let type = document.getElementById("type");
let pressure = document.getElementById("pressure");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let ht1 = document.getElementById("hour1temp");
let ht2 = document.getElementById("hour2temp");
let ht3 = document.getElementById("hour3temp");
let ht4 = document.getElementById("hour4temp");
let c1 = document.getElementById("c1t");
let c2 = document.getElementById("c2t");
let c3 = document.getElementById("c3t");
let c4 = document.getElementById("c4t");
let input = document.getElementById("input");

let day = document.getElementById("day");
let date = document.getElementById("date");
let time = document.getElementById("tim");

const unsplashKey = "3MJl4ZcCS2WuZJbYi808v20W5qypjkQ30vV6Z2Zft8M"; // ⬅️ Replace with your actual Unsplash API key
const API_KEY = "a9c8bbab47d7a752c0963453fab539ca";


function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000); // visible for 3 seconds
}






// Event listener to detect Enter key in input
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    myFun();
  }
});

// Unsplash background function
function getCityImage(search) {
  fetch(`https://api.unsplash.com/search/photos?query=${search}&client_id=${unsplashKey}`)
    .then(res => res.json())
    .then(data => {
      if (data.results && data.results.length > 0) {
        const imageUrl = data.results[0].urls.regular;
        const timeBox = document.querySelector(".time");
        timeBox.style.backgroundImage = `url(${imageUrl})`;
        timeBox.style.backgroundSize = "cover";
        timeBox.style.backgroundPosition = "center";
        day.style.color = "white";
        date.style.color = "white";
      } else {
        url("images/cbg.jpg");
        timeBox.style.backgroundImage = url("images/cbg.jpg");
        day.style.color = "black";
        date.style.color = "black";
      }
    })
    .catch(err => console.error("Image fetch error:", err));
}

// Main weather function
const getWeather = async function (search) {
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=metric`
  );

  let data = await response.json();

  if (data.cod == "400" || data.cod == "404" || data.cod == "401") {
    showToast("City Not Found");
    city.innerHTML = "City not found";
    country.innerHTML = "";
    temp.innerHTML = "";
    type.innerHTML = "";
    humidity.innerHTML = "Humidity : --";
    wind.innerHTML = "Wind Speed : --";
    pressure.innerHTML = "Pressure : --";
    return;
  }

  city.innerHTML = data.name;
  temp.innerHTML = data.main.temp + "°C";
  let tt = data.sys.country;
  country.innerHTML = tt == "IN" ? "India" : tt;
  type.innerHTML = data.weather[0].main;






  const iconCode = data.weather[0].icon;
  images.src = `http://openweathermap.org/img/wn/${iconCode}@4x.png`;
  if(type.innerHTML=="Clear"){
    images.src = "images/sunny.png";
  }

  humidity.innerHTML = "Humidity : " + data.main.humidity + " %";
  wind.innerHTML = "Wind Speed : " + data.wind.speed + " m/s";
  pressure.innerHTML = "Pressure : " + data.main.pressure + " hPa";

  // switch (type.innerHTML) {
  //   case "Clouds": images.src = "images/cloudy.jpg"; break;
  //   case "Rain": images.src = "images/rainy.jpg"; break;
  //   case "Clear": images.src = "images/sunny.png"; break;
  //   case "Mist": images.src = "images/mist.jpg"; break;
  //   case "Snow": images.src = "images/snowy.jpg"; break;
  //   case "Thunderstorm": images.src = "images/lightning.jpg"; break;
  //   case "Drizzle": images.src = "images/drizzle.jpg"; break;
  //   case "Smoke": images.src = "images/smoke.jpg"; break;
  //   case "Dust": images.src = "images/dust.jpg"; break;
  //   case "Fog": images.src = "images/foggy.jpg"; break;
  //   case "Sand": images.src = "images/sand.jpg"; break;
  //   case "Squall": images.src = "images/squall.jpg"; break;
  //   case "Tornado": images.src = "images/tornado.jpg"; break;
  // }

  function formatTime(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString();
  }

  c1.innerHTML = formatTime(data.sys.sunrise);
  c2.innerHTML = formatTime(data.sys.sunset);
  c3.innerHTML = data.visibility / 1000 + " km";
}

// Search city on button click or Enter
function myFun() {
  let search = input.value.trim();
  if (search === "") {
    showToast("Please Enter a valid City Name");


    return;
  }
  getWeather(search);
  getCityImage(search);
}

// Geolocation search
function myFun1() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  } else {
    // alert("Geolocation is not supported by this browser.");
    showToast("Geolocation is not supported by this browser.");

  }

  function successCallback(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          const cityName = data[0].name;
          getWeather(cityName);
          getCityImage(cityName);
        } else {
          
          showToast("Unable to determine your location.");
        }
      })
      .catch(() => {
        showToast("Failed to fetch location data.");
      });
  }

  function errorCallback(error) {
    showToast("Location access denied or unavailable.");
    console.error(error);
  }
}

// Time & date setup 
let d = new Date();
time.innerHTML = d.toLocaleString("default", { hour: "2-digit", minute: "2-digit" });
day.innerHTML = d.toLocaleString("default", { weekday: "long" });
date.innerHTML = d.toLocaleString("default", { month: "long", day: "numeric", year: "numeric" });

window.onload = () => {
  // input.focus();
};

