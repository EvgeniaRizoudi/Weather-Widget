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
        $(".temp-feeling").text(" ".concat("Feeling ", Math.round(todays_data.feels_like), "℃"));
        $(".humidity").text(" ".concat("Humidity ", todays_data.humidity, "%"));
        $(".pressure").text(" ".concat("Pressure ", todays_data.pressure, " hPa"));
        $(".clouds").text(" ".concat("Clouds ", todays_data.clouds, "%"));
        $(".wind-sp").text(" ".concat("Wind Speed ", todays_data.wind_speed, " m/sec"));
        $(".wind-deg").text(" ".concat("Wind Direction ", todays_data.wind_deg, " deg"));
      }

                            /* Changing Gif */
    
function changeBgImg(todays_data_weather){
    $("#temperature-card").css("background-image", "".concat(`url(img/${todays_data_weather[0].main}.gif)`))
}

                            /* Forecast */

function dateToString(date)
    {
    let dateStr = new Date(date.dt*1000).toDateString();
    return dateStr;
}

 function dateToButton(next_dates,i){
    $((".dateBtn" + i)).text(dateToString(next_dates[i]));
} 
    
function getNextDatesData(date){
    const meanValueTemp = (date.temp.day + date.temp.night) / 2;
    const meanValueFeel = (date.feels_like.day + date.feels_like.night) / 2;

    $ (".temperature-forecast").text(" ".concat("Temperature ", Math.round(meanValueTemp),"℃"));
    $(".feelsLike-forecast").text(" ".concat("Feeling ", Math.round(meanValueFeel), "℃"));
    $(".humidity-forecast").text(" ".concat("Humidity ", date.humidity, "%"));
    $(".pressure-forecast").text(" ".concat("Pressure ", date.pressure," hPa"));
    $(".clouds-forecast").text(" ".concat("Clouds ", date.clouds,"%"));
    $(".wind-sp-forecast").text(" ".concat("Wind Speed ", date.wind_speed ," m/sec"));
    $(".wind-deg-forecast").text(" ".concat("Wind Direction ", date.wind_deg ," deg"));
    }

                                /* API Images */

function getImgFromApi(data,i){

    console.log(i)
    const imgToday = data.current.weather[0].icon;
    const imgNextDays = data.daily[i].weather[0].icon;
    const imgUrlToday = "".concat("http://openweathermap.org/img/wn/",imgToday,"@2x.png");
    const imgUrlNext = "".concat("http://openweathermap.org/img/wn/", imgNextDays,"@2x.png");

    $(".weather-img").attr("src", imgUrlToday);
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

data = fetchData(apiUrl);
data.then(data => {
      getTodaysWeather(data.current);
      $(".date").text(dateToString(data.daily,0));
      for(let i=0; i<8; i++){
        dateToButton(data.daily,i);
        btnClick(i);
    }
    maxTempChart(data.daily); 
    changeBgImg(data.current.weather);
    function btnClick(i){ 
        $((".dateBtn" + i)).click(function(){
            getNextDatesData(data.daily[i]);
            getImgFromApi(data,i);
        })};
});    
        



   








 






