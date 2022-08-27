$(".forecast-info").hide()
            
            
            /* Date Function */
            
            function getOnlyDate(nextDays){
                let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
                let months = ["January", "February", "March", "April", "May", "June",
                            "July", "August", "September", "October", "November", "December"]
               
                let currentDate = new Date();
                let day = days[currentDate.getDay()];
                let date = currentDate.getDate();
                let month = months[currentDate.getMonth()];
                let year = currentDate.getFullYear();
               
                return day + " " + date + " " + month + " " + year + " "
            }
          
            
            
            
            
            $(".date").text(getOnlyDate()); 




                

                    /* API Info Display */


function getDataFromApi(){

fetch ("https://api.openweathermap.org/data/2.5/onecall?lat=40.58725980318928&lon=22.948223362612612&exclude=hourly,minutely&appid=11b0499bd13ab56063de7565a440eb97&units=metric")
.then(response =>{
  return response.json();
}).then(data =>{
    
                    /* Temperature */

    $ ("#current-temp").text(Math.round(data.current.temp) + " ");
    $(".temp-feeling").text("Feeling " + Math.round(data.current.feels_like) + " ℃");
    $(".humidity").text("Humidity " + data.current.humidity + " " + "%");
    $(".pressure").text("Pressure " + data.current.pressure + " " + "hPa");
    $(".clouds").text("Clouds " + data.current.clouds + " " + "%");
    $(".wind-sp").text("Wind Speed " + data.current.wind_speed + " " + "m/sec")
    $(".wind-deg").text("Wind Direction " + data.current.wind_deg + " " + "deg")
 
  })}

                    /* Image */


function image(response){
  fetch ("https://api.openweathermap.org/data/2.5/onecall?lat=40.58725980318928&lon=22.948223362612612&exclude=hourly,minutely&appid=11b0499bd13ab56063de7565a440eb97&units=metric"
  ).then(response =>{

    return response.json();

  }).then(data =>{

    const img = data.current.weather[0].icon;
    const imgUrl = "http://openweathermap.org/img/wn/" + img + "@2x.png";
    $(".weather-img").attr("src",imgUrl);
  
  })
  }
 
                    /*Background-image*/
    
function bgImage(response){
fetch ("https://api.openweathermap.org/data/2.5/onecall?lat=40.58725980318928&lon=22.948223362612612&exclude=hourly,minutely&appid=11b0499bd13ab56063de7565a440eb97&units=metric"
 ).then(response =>{
                    
 return response.json();
                    
 }).then(data =>{

  if(data.current.weather[0].id >= 200 && data.current.weather[0].id <= 232){

    $(".weather-details-card").css("background-image","url(" + "img/thunder.jpg" + ")");

  }else if(data.current.weather[0].id >= 300 && data.current.weather[0].id <= 321 || data.current.weather[0].id >= 520 && data.current.weather[0].id <= 531){
    
    $(".weather-details-card").css("background-image","url(" + "img/thunder.jpg" + ")");

  }else if(data.current.weather[0].id >= 500 && data.current.weather[0].id <= 531){
    
    $(".weather-details-card").css("background-image","url(" + "img/thunder.jpg" + ")");

  }else if(data.current.weather[0].id >= 600 && data.current.weather[0].id <= 622){
   
    $(".weather-details-card").css("background-image","url(" + "img/thunder.jpg" + ")");

  }else if(data.current.weather[0].id >= 700 && data.current.weather[0].id <= 781){
    
    $(".weather-details-card").css("background-image","url(" + "img/thunder.jpg" + ")");

  }else if(data.current.weather[0].id === 800){
   
    $(".weather-details-card").css("background-image","url(" + "img/clear-sky.jpg" + ")");
 } else if(data.current.weather[0].id >= 801 && data.current.weather[0].id <= 804){
    
    $(".weather-details-card").css("background-image","url(" + "img/cloudy-sky.jpg" + ")");
  
  }})}

  /*  function newTab(){
    const forecastBtn = $(".btn")

    $(document).ready(function(){
      forecastBtn.click(function(){
        $(".weather-details-card").slideUp();
      })
    })

   } */
  
 



   function pickNewDate(response){
  fetch ("https://api.openweathermap.org/data/2.5/onecall?lat=40.58725980318928&lon=22.948223362612612&exclude=hourly,minutely&appid=11b0499bd13ab56063de7565a440eb97&units=metric"
 ).then(response =>{
                    
 return response.json();
                    
 }).then(data =>{
  

 /*  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1) */

 $(".dateBtn1").text();
 $(".dateBtn2").text(data.daily[1].dt);   
 $(".dateBtn3").text(data.daily[2].dt);
 $(".dateBtn4").text(data.daily[3].dt);
 $(".dateBtn5").text(data.daily[4].dt);
 $(".dateBtn6").text(data.daily[5].dt);
 $(".dateBtn7").text(data.daily[6].dt);   
 $('*[class^="dateBtn"]').click(function(){

  $(".weather-details-card").slideUp();
  $(".weather-details-card").replaceWith($(".forecast-info").show());

  const meanValueTemp = (data.daily[0].temp.day + data.daily[0].temp.night) / 2
  const meanValueFeel = (data.daily[0].feels_like.day + data.daily[0].feels_like.night) / 2

  $ (".temperature-forecast").text("Temperature " + Math.round(meanValueTemp) + " ℃");
  $(".feelsLike-forecast").text("Feeling " + Math.round(meanValueFeel) + " ℃");
  $(".humidity-forecast").text("Humidity " + data.daily[0].humidity + " " + "%");
  $(".pressure-forecast").text("Pressure " + data.daily[0].pressure + " " + "hPa");
  $(".clouds-forecast").text("Clouds " + data.daily[0].clouds + " " + "%");
  $(".wind-sp-forecast").text("Wind Speed " + data.daily[0].wind_speed + " " + "m/sec")
  $(".wind-deg-forecast").text("Wind Direction " + data.daily[0].wind_deg + " " + "deg")


})
})}

var today = (new Date().toISOString().split('T')[0])+1;
console.log(today);









getDataFromApi();
image();
bgImage();
imageNextDay();
pickNewDate();