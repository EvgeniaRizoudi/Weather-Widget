/* Data from API */
const apiUrl = prompt("Please paste the API url");

async function fetchData(url){
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

/* Current Weather Card */
function getTodaysWeather(todays_data){    
        $ ("#current-temp").text(Math.round(todays_data.temp) + " ");
        $(".temp-feeling").text(`Feeling ${Math.round(todays_data.feels_like)}℃`);
        $(".humidity").text(`Humidity ${todays_data.humidity}%`);
        $(".pressure").text(`Pressure ${todays_data.pressure}hPa`);
        $(".clouds").text(`Clouds ${todays_data.clouds}%`);
        $(".wind-sp").text(`Wind Speed ${todays_data.wind_speed}m/sec`);
        $(".wind-deg").text(`Wind Direction ${todays_data.wind_deg}deg`);
}

/* Changing Gif */   
function changeBgImg(todays_data_weather){
    $("#temperature-card").css("background-image", `url(img/${todays_data_weather[0].icon}.gif)`);
}

/* Forecast */
function dateToString(date){
   return new Date(date.dt*1000).toDateString();
}

function dateToButton(next_dates,i){
    $((".dateBtn" + i)).text(dateToString(next_dates[i]));
} 
    
function getNextDatesData(date){
    const meanValueTemp = Math.round(date.temp.day + date.temp.night) / 2;
    const meanValueFeel = Math.round(date.feels_like.day + date.feels_like.night) / 2;
    $(".temperature-forecast").text(`Temperature  ${meanValueTemp}℃`);
    $(".feelsLike-forecast").text(`Feeling ${meanValueFeel}℃`);
    $(".humidity-forecast").text(`Humidity ${date.humidity}%`);
    $(".pressure-forecast").text(`Pressure ${date.pressure}hPa`);
    $(".clouds-forecast").text(`Clouds ${date.clouds}%`);
    $(".wind-sp-forecast").text(`Wind Speed ${date.wind_speed}m/sec`);
    $(".wind-deg-forecast").text(`Wind Direction ${date.wind_deg}deg`);
}

/* API Images */

function getTodaysImgFromApi(data){
    const imgToday = data.current.weather[0].icon;
    const imgUrlToday = `http://openweathermap.org/img/wn/${imgToday}@2x.png`;
    $(".weather-img").attr("src", imgUrlToday); 
}

function getNextDaysImgFromApi(data,i){
    const imgNextDays = data.daily[i].weather[0].icon;
    const imgUrlNext = `http://openweathermap.org/img/wn/${imgNextDays}@2x.png`;
    $(".forecast-img").attr("src", imgUrlNext);
}


/* Max Temp Chart */
function maxTempChart(dates){
  const ctx = $("#maxTempChart");
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [dateToString(dates[1]), dateToString(dates[2]), dateToString(dates[3]), dateToString(dates[4]), dateToString(dates[5]), dateToString(dates[6]), dateToString(dates[7])],
        datasets: [{
            label: 'Max Temperature',
            data: [(Math.round(dates[0].temp.max)), (Math.round(dates[1].temp.max)), (Math.round(dates[2].temp.max)), (Math.round(dates[3].temp.max)), (Math.round(dates[4].temp.max)), (Math.round(dates[5].temp.max)), (Math.round(dates[6].temp.max))],
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
/* Go Back Btn */
  
function goBackButton(){
    $(".go-back-btn").click(function(){
        $(".collapse-item").collapse('toggle');
        $(".forecast-info").hide();
        $("#temperature-card").show();  
    })
}                              

 

/* Calling All */
$(".forecast-info").hide();

goBackButton();

$(".details").click(function(){
    $("#weather-det").show();
})
    
$('*[class^="dateBtn"]').click(function(){
    $(".weather-details-card").hide();
    $("#temperature-card").hide();
    $(".forecast-info").show();
    $("#maxTempChart").hide();
})

$(".chart-btn").click(function(){
    $("#maxTempChart").show();
}) 

data = fetchData(apiUrl).then(data => {
      getTodaysWeather(data.current);
      $(".date").text(dateToString(data.current,0));
      for(let i=0; i<8; i++){
        dateToButton(data.daily,i);
        btnClick(i);
        }
    getTodaysImgFromApi(data);
    maxTempChart(data.daily); 
    changeBgImg(data.current.weather);
function btnClick(i){ 
        $((".dateBtn" + i)).click(function(){
            getNextDatesData(data.daily[i]);
            getNextDaysImgFromApi(data,i);
        })};
});    
        



   








 






