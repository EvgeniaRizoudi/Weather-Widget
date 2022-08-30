                        /* Data from API */

const apiUrl = prompt("Please paste the API url");

async function fetchData(url){
    const response = await fetch(url);
    const data = await response.json();
    return data;
}


$(".forecast-info").hide();


                        /* Current Weather Card */

function getTodaysWeather(data){    
        $ ("#current-temp").text(Math.round(data.current.temp) + " ");
        $(".temp-feeling").text("Feeling " + Math.round(data.current.feels_like) + " ℃");
        $(".humidity").text("Humidity " + data.current.humidity + " " + "%");
        $(".pressure").text("Pressure " + data.current.pressure + " " + "hPa");
        $(".clouds").text("Clouds " + data.current.clouds + " " + "%");
        $(".wind-sp").text("Wind Speed " + data.current.wind_speed + " " + "m/sec")
        $(".wind-deg").text("Wind Direction " + data.current.wind_deg + " " + "deg")
      }

      $(".details").click(function(){
        $("#weather-det").show();
      })


                            /* Changing Gif */
    
function changeImg(data){
    if(data.current.weather[0].main === "Clouds"){
        $("#temperature-card").css("background-image", "url(img/Clouds.gif)")
    }else if(data.current.weather[0].main === "Rain"){
        $("#temperature-card").css("background-image", "url(img/Rain.gif)")
    }else if(data.current.weather[0].main === "Clear"){
        $("#temperature-card").css("background-image", "url(img/Clear.gif)")
    }
}

                            /* Forecast */

function dateGenerator(data,i)
    {
     
    var date = new Date(data.daily[i].dt*1000).toDateString();
    return date;
}


 function btnDate(data,i){
    $((".dateBtn" + i)).text(dateGenerator(data,i));
} 
    
      


$('*[class^="dateBtn"]').click(function(){

    $(".weather-details-card").hide();
    $("#temperature-card").hide();
    $(".forecast-info").show();
    $("#maxTempChart").hide();

})


function forecastData(data,i){
    const meanValueTemp = (data.daily[i].temp.day + data.daily[i].temp.night) / 2;
    const meanValueFeel = (data.daily[i].feels_like.day + data.daily[i].feels_like.night) / 2;
  
    $ (".temperature-forecast").text("Temperature " + Math.round(meanValueTemp) + " ℃");
    $(".feelsLike-forecast").text("Feeling " + Math.round(meanValueFeel) + " ℃");
    $(".humidity-forecast").text("Humidity " + data.daily[i].humidity + " " + "%");
    $(".pressure-forecast").text("Pressure " + data.daily[i].pressure + " " + "hPa");
    $(".clouds-forecast").text("Clouds " + data.daily[i].clouds + " " + "%");
    $(".wind-sp-forecast").text("Wind Speed " + data.daily[i].wind_speed + " " + "m/sec")
    $(".wind-deg-forecast").text("Wind Direction " + data.daily[i].wind_deg + " " + "deg")
    }

                                /* API Images */

function imageSelector(data,i){

    const imgToday = data.current.weather[0].icon;
    const imgNextDays = data.daily[i].weather[0].icon;
    const imgUrlToday = "http://openweathermap.org/img/wn/" + imgToday + "@2x.png";
    const imgUrlNext = "http://openweathermap.org/img/wn/" + imgNextDays + "@2x.png";

    $(".weather-img").attr("src", imgUrlToday);
    $(".forecast-img").attr("src", imgUrlNext);
}


                              /* Max Temp Chart */
function maxTempChart(data){
  const ctx = $("#maxTempChart");
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [dateGenerator(data,1), dateGenerator(data,2), dateGenerator(data,3), dateGenerator(data,4), dateGenerator(data,5), dateGenerator(data,6), dateGenerator(data,7)],
        datasets: [{
            label: 'Max Temperature',
            data: [(Math.round(data.daily[0].temp.max)), (Math.round(data.daily[1].temp.max)), (Math.round(data.daily[2].temp.max)), (Math.round(data.daily[3].temp.max)), (Math.round(data.daily[4].temp.max)), (Math.round(data.daily[5].temp.max)), (Math.round(data.daily[6].temp.max))],
            borderColor: [
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 5
        }]
    },
    options: {
        scales: {
            y: {
                ticks: {
                    color: 'rgba(251, 251, 251)'
                },
                grid: {
                    display: false
                },
                beginAtZero: true,
                max: 45  
            },
            x: {
                ticks: {
                    color: 'rgba(251, 251, 251)'
                },
                grid: {
                    display: false
                },
            }
        },
        responsive: true,
        color: 'rgba(251, 251, 251)',
    }
});}
 
$(".chart-btn").click(function(){
    $("#maxTempChart").show();
}) 

                                /* Go Back Btn */

      
 function goBack(){
    $(".go-back-btn").click(function(){
        $(".collapse-item").collapse('toggle');
        $(".forecast-info").hide();
        $("#temperature-card").show();  
    })
 }                              

 goBack();

                                /* Calling All */

data = fetchData(apiUrl);
data.then(data => {
      getTodaysWeather(data);
      $(".date").text(dateGenerator(data,0));
      for(let i=0; i<8; i++){
        btnDate(data,i);
        btnClick(i);
        imageSelector(data,i);
    }
    maxTempChart(data); 
    changeImg(data);
    function btnClick(i){ 
        $((".dateBtn" + i)).click(function(){
           forecastData(data,i);
        })};
});    
        





   








 






