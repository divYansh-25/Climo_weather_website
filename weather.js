let city = document.getElementById("city");
let country = document.getElementById("country");
let temp = document.getElementById("temp");
let images = document.getElementById("img");
// let input = document.getElementById("input").value;
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

let API_KEY = "a9c8bbab47d7a752c0963453fab539ca";

const getWeather = async function(search) {
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=metric`,
  );
  console.log(response);

  let data = await response.json();
  console.log(data);


  let latt = data.coord.lat;
  // console.log(latt);
  let lonn = data.coord.lon;
  // console.log(lonn);

  // const getforecast = async function() {
  //   let respon = await fetch(`https://api.openweathermap.org/data/2.5/forecast/hourly?lat=${latt}&lon=${lonn}&appid=${API_KEY}`);
  //   console.log(respon);
  
  //   let da = await respon.json();
  //   console.log(da);
  
  //   // ht1.innerHTML = da.list[0].main.temp + "°C";
  //   // ht2.innerHTML = da.list[1].main.temp + "°C";
  //   // ht3.innerHTML = da.list[2].main.temp + "°C";
  //   // ht4.innerHTML = da.list[3].main.temp + "°C";
  
  //   if(da.cod == "400") {
  //     ht1.innerHTML ="--";
  //     ht2.innerHTML ="--";
  //     ht3.innerHTML ="--";
  //     ht4.innerHTML ="--";
  //   }
  //   if(da.cod == "404") {
  //     ht1.innerHTML ="--";
  //     ht2.innerHTML ="--";
  //     ht3.innerHTML ="--";
  //     ht4.innerHTML ="--";
  //   }
  // }
  // getforecast();


  if(data.cod == "400") {
    alert("Please enter a valid city name");
    city.innerHTML = "City not found";
    country.innerHTML = "";
    temp.innerHTML = "";
    type.innerHTML = "";
    humidity.innerHTML = "Humidity : --";
    wind.innerHTML = "Wind Speed : --";
    pressure.innerHTML = "Pressure : --";
  }
  if(data.cod == "404") {
    alert("City not found");
    city.innerHTML = "City not found";
    country.innerHTML = "";
    temp.innerHTML = "";
    type.innerHTML = "";
    humidity.innerHTML = "Humidity : --";
    wind.innerHTML = "Wind Speed : --";
    pressure.innerHTML = "Pressure : --";
  }
  if(data.cod == "401") {
    alert("City not found");
    city.innerHTML = "City not found";
    country.innerHTML = "";
    temp.innerHTML = "";
    type.innerHTML = "";
    humidity.innerHTML = "Humidity : --";
    wind.innerHTML = "Wind Speed : --";
    pressure.innerHTML = "Pressure : --";
  }


  city.innerHTML = data.name;
  temp.innerHTML = data.main.temp + "°C";
  tt=data.sys.country;
  if(tt == "IN"){
    country.innerHTML = "India";
  }else{
    country.innerHTML = data.sys.country;
  }

  // type.innerHTML = data.weather[0].description;
  type.innerHTML = data.weather[0].main;
  humidity.innerHTML = "Humidity : " + data.main.humidity + " %";
  wind.innerHTML = "Wind Speed : " + data.wind.speed + " m/s";
  pressure.innerHTML = "Pressure : " + data.main.pressure + " hPa";

  if(type.innerHTML == "Clouds"){
    images.src="images/cloudy.jpg";
  }else if(type.innerHTML == "Rain"){
    images.src="images/rainy.jpg";
  }else if(type.innerHTML == "Clear"){
    images.src="images/sunny.png";}
  else if(type.innerHTML == "Mist"){
    images.src="images/mist.jpg";}
  else if(type.innerHTML == "Snow"){
    images.src="images/snowy.jpg";}
  else if(type.innerHTML == "Thunderstorm"){
    images.src="images/lightning.jpg";
  }else if(type.innerHTML == "Drizzle"){
    images.src="images/drizzle.jpg";}
  else if(type.innerHTML == "Smoke"){
    images.src="images/smoke.jpg";}
  else if(type.innerHTML == "Dust"){
    images.src="images/dust.jpg";}
    else if(type.innerHTML == "Fog"){
    images.src="images/foggy.jpg";}
  else if(type.innerHTML == "Sand"){
    images.src="images/sand.jpg";}
  else if(type.innerHTML == "Squall"){
    images.src="images/squall.jpg";}
  else if(type.innerHTML == "Tornado"){
    images.src="images/tornado.jpg";
  }   

  function formatTime(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString();
  }



  c1.innerHTML = formatTime(data.sys.sunrise);
  c2.innerHTML = formatTime(data.sys.sunset);
  c3.innerHTML = data.visibility/1000 + " km";
}

function myFun(){
    search=input.value;
    getWeather(search);
}

function myFun1(){
    search="ghaziabad";
    getWeather(search);
}


let day = document.getElementById("day");
let date = document.getElementById("date");
let time = document.getElementById("tim");
let d = new Date();
time.innerHTML = d.toLocaleString("default", { hour: "2-digit", minute: "2-digit" });
day.innerHTML = d.toLocaleString("default", { weekday: "long" });
date.innerHTML = d.toLocaleString("default", { month: "long", day: "numeric",year: "numeric" });
