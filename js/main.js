
  /* ************************************/
//Function to open and close menubar..
/* ************************************/
const API_ID = "cec3b30dccb0f96060f72b13e5260056";
const API_PROGNOS = "api.openweathermap.org/data/2.5/forecast?"; // + lat={lat}&lon={lon}
const ICON_ID = "http://openweathermap.org/img/w/"; // + 10d.png
var dayWeek;
var date;
var time;
var temp;
var loc;
var icon;
var humidity;
var wind;
var direction;

var day1, day2, day3, day4, day5;

class Weather {
  constructor(dayWeek, date, temp, loc, icon, humidity, wind, direction){
    this.dayWeek = dayWeek;
    this.date = date;
    this.temp = temp;
    this.loc = loc;
    this.icon = icon;
    this.humidity = humidity;
    this.wind = wind;
    this.direction = direction;
  }
}

  function updateByZip(zip){
    var url = "http://api.openweathermap.org/data/2.5/weather?" +
              "zip=" + zip +
              "&APPID=" + API_ID;
      sendRequest(url);
  } 

  
function updateByGeo(lat, lon){
    var url = "http://api.openweathermap.org/data/2.5/weather?" +
              "lat=" + lat +
              "&lon=" + lon +
              "&APPID=" + API_ID;
    sendRequest(url);    
}

//Get actual date month/day/year
function getDate(){
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();
  if(dd<10) {
      dd = '0'+dd
  } 
  if(mm<10) {
      mm = '0'+mm
  } 
  today = mm + '/' + dd + '/' + yyyy;
  // console.log("Today is: " + today);
  return today;
}

//Function to get current time with setInterval..
function getTime(){ 
  var x = setInterval(function() {   
    var today = new Date();
    var currentTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    time = document.getElementById("time"); 
    time.innerHTML = currentTime;
  }, 1000);  
}


//Get the day of the week
function getDayWeek(){
    var d = new Date();
    var n = d.getDay();
    console.log(n)
    switch(n){
        case 1:
          return "Monday"
        break;

        case 2:
          return "Tuesday"
        break;

        case 3:
          return "Wednesday"
        break;

        case 4:
          return "Thursday"
        break;

        case 5:
          return "Friday"
        break;

        case 6:
          return "Saturday"
        break;

        case 7:
          return "Sunday"
        break;
    }
}

//Kelvin to Celsius
function k2c(kelvin){
  return Math.round(kelvin - 273.15);
}

//Kelvin to Farhenraid
function k2f(kelvin){
return Math.round(kelvin * (9/5) - 273.15);
}

  function sendRequest(url){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
      if(xmlhttp.readyState == 4 && xmlhttp.status == 200){ // 4-recieved package 200- ok
         var data = JSON.parse(xmlhttp.responseText);
         console.log(data);
         var weather = new Weather(
                      getDayWeek(), 
                      getDate(), 
                      k2c(data.main.temp) + "&#x2103;", 
                      data.name, 
                      data.weather[0].id, 
                      data.main.humidity + " %", 
                      data.wind.speed + " mph",
                      data.wind.deg + "/" + degreeToDirection(data.wind.deg));

         update(weather);
      } 
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
 
 }

 /******************************************************* */
 /*****PROGNOS ****************************************** */
 /******************************************************* */


 function updatePrognos(lat, lon){
  var url = "http://api.openweathermap.org/data/2.5/forecast?" + 
            "lat=" + lat +
            "&lon=" + lon +
            "&APPID=" + API_ID;
  sendRequestPrognos(url);
  console.log("*******************************************");
  console.log(url);
  console.log("*******************************************");

}

function createDetailPrognosView(datum, tempMax, tempMin, iconCode, dayNumber){
  console.log("*********** PROGNOS ************");
  console.log("Datum: " + datum, "TempMax: " + tempMax, 
              "TempMin: " + tempMin, "Icon:" + iconCode);

  let date = datum.split(" ");
  console.log("DATE" + date[0]);

  //Days
  document.getElementById("datum" + dayNumber).innerHTML = date[0];
  document.getElementById("prog_icon" + dayNumber).setAttribute("src", ICON_ID + iconCode + ".png"); 
  document.getElementById("temp_max" + dayNumber).innerHTML ="Max: " +  k2c(tempMax) + " &#x2103";
  document.getElementById("temp_min" + dayNumber).innerHTML ="Min: "  + k2c(tempMin) + " &#x2103";


}

function getCurrentDay(datum){
  let splitDay = datum.split("/");
  return splitDay[1];
}

function getApiDate(date){
  // var date = "2018-03-20 00:00:00";
  let split1 = date.split(" ");
  let split2 = split1[0].split("-");
  return split2[2];
}

 //Function to get the Prognos..
 function sendRequestPrognos(url){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function(){
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200){ // 4-recieved package 200- ok
       var data = JSON.parse(xmlhttp.responseText);
       console.log(data);
      let actualDate = getDate();
      console.log("Actual Day: " + getCurrentDay(actualDate));


      // if(getCurrentDay(actualDate) != getApiDate(data.list[i].dt_txt)){
      //   console.log(getCurrentDay("HOJE: " + actualDate));
      //   console.log(getApiDate(data.list[i].dt_txt));

      // }


       console.log("****DATA-PROG");
       console.log("Actual Date: " + actualDate);
       console.log(data.list[3].weather[0].id);
       console.log(data.list[3].main.temp_max);
       console.log(data.list[3].main.temp_min);
       console.log(data.list[3].dt_txt);
       console.log(data.list[3].weather[0].icon);

        createDetailPrognosView(  data.list[8].dt_txt
                                , data.list[8].main.temp_max
                                , data.list[8].main.temp_min
                                , data.list[8].weather[0].icon
                                , 1);

        createDetailPrognosView(  data.list[16].dt_txt
                                , data.list[16].main.temp_max
                                , data.list[16].main.temp_min
                                , data.list[16].weather[0].icon
                                , 2);

        createDetailPrognosView(  data.list[24].dt_txt
                                , data.list[24].main.temp_max
                                , data.list[24].main.temp_min
                                , data.list[24].weather[0].icon
                                , 3);

        createDetailPrognosView(  data.list[32].dt_txt
                                , data.list[32].main.temp_max
                                , data.list[32].main.temp_min
                                , data.list[32].weather[0].icon
                                , 4);

        createDetailPrognosView(  data.list[39].dt_txt
                                , data.list[39].main.temp_max
                                , data.list[39].main.temp_min
                                , data.list[39].weather[0].icon
                                , 5);

       console.log(data.list);
    } 
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();

}

/******************************************************* */


window.onload = function(){
  icon = document.getElementById("icon");
  loc = document.getElementById("location");
  dayWeek = document.getElementById("day-week");
  date = document.getElementById("date");
  
  temp = document.getElementById("temperature");
  humidity = document.getElementById("humidity");
  wind = document.getElementById("wind");  
  direction = document.getElementById("direction");
  

  //If browser support geolocation..
  if(navigator.geolocation){

    var showPosition = function(position){
      updateByGeo(position.coords.latitude, position.coords.longitude);

      updatePrognos(position.coords.latitude, position.coords.longitude);/*********PROGNOS*********/
      console.log("Latitude: " + position.coords.latitude);
      console.log("Longitude: " + position.coords.longitude);
	  }
    let coordinate = navigator.geolocation.getCurrentPosition(showPosition);
    
    
  }else{
    var zip = window.prompt("Could not discover your location! What is your Zip Code?");
    updateByZip(zip);
  }

}

// Update the app values..
function update(weather){ 
  wind.innerHTML = weather.wind;
  direction.innerHTML = weather.direction;
  humidity.innerHTML = weather.humidity;
  loc.innerHTML = weather.loc;
  temp.innerHTML = weather.temp;
  icon.src = "images/codes/" + weather.icon + ".png";
  dayWeek.innerHTML = weather.dayWeek;
  date.innerHTML = weather.date;
  //Set the hours..
  getTime();
}

// Wind direction
function degreeToDirection(degrees){
  var range = 360/16;
  var low = 360 - range/2;
  var high = (low + range) % 360;
  var angles = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", 
              "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];

  for( i in angles ) {
    if(degrees >= low && degrees < high){
        console.log(angles[i]);
        return angles[i];
    }

    low = (low + range) % 360;
    high = (high + range) % 360;
  }
  return "N";
}






// fetch(apiUrl)
//   .then(
//     function(response) {
//       if (response.status !== 200) {
//         console.log('Looks like there was a problem. Status Code: ' +
//           response.status);
//         return;
//       }

//       // Examine the text in the response
//       response.json().then(function(data) {
//         console.log(data);
//       });
//     }
//   )
//   .catch(function(err) {
//     console.log('Fetch Error :-S', err);
//   });
