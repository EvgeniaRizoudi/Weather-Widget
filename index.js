/* Data from API: Placing the correct API key makes the widget functional*/
const apiKey = prompt("Please paste the API key");
const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=40.58725980318928&lon=22.948223362612612&exclude=hourly,minutely&appid=${apiKey}&units=metric`;

async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

/*  Current Weather Card: Pushes the desirable data to the corresponding HTML elements*/
function getTodaysWeather(todays_data) {
    $("#current-temp").text(Math.round(todays_data.temp));
    $(".temp-feeling").text(`Feeling ${Math.round(todays_data.feels_like)}℃`);
    $(".humidity").text(`Humidity ${todays_data.humidity}%`);
    $(".pressure").text(`Pressure ${todays_data.pressure}hPa`);
    $(".clouds").text(`Clouds ${todays_data.clouds}%`);
    $(".wind-sp").text(`Wind Speed ${todays_data.wind_speed}m/sec`);
    $(".wind-deg").text(`Wind Direction ${todays_data.wind_deg}deg`);
}

/* Changing Gif: Alters the background Gif according to the current weather*/
function changeBgImg(todays_data_weather) {
    $("#temperature-card").css(
        "background-image",`url(img/${todays_data_weather[0].icon}.gif)`
    );
}

/* Forecast*/
/* API dt to string date*/
function dateToString(date) {
    return new Date(date.dt * 1000).toDateString();
}

/* Pushes the date to the buttons*/
function dateToButton(next_dates, i) {
    $((".dateBtn" + i)).text(dateToString(next_dates[i]));
}

/*Pushes the desirable data to the corresponding HTML elements*/
function getNextDatesData(date) {
    const meanValueTemp = Math.round((date.temp.day + date.temp.night) / 2);
    const meanValueFeel = Math.round((date.feels_like.day + date.feels_like.night) / 2);
    $(".temperature-forecast").text(`Temperature ${meanValueTemp}℃`);
    $(".feelsLike-forecast").text(`Feeling ${meanValueFeel}℃`);
    $(".humidity-forecast").text(`Humidity ${date.humidity}%`);
    $(".pressure-forecast").text(`Pressure ${date.pressure}hPa`);
    $(".clouds-forecast").text(`Clouds ${date.clouds}%`);
    $(".wind-sp-forecast").text(`Wind Speed ${date.wind_speed}m/sec`);
    $(".wind-deg-forecast").text(`Wind Direction ${date.wind_deg}deg`);
}

/* API Images: Fetches the correct weather image from the API*/
function getTodaysImgFromApi(data) {
    const imgToday = data.current.weather[0].icon;
    const imgUrlToday = `http://openweathermap.org/img/wn/${imgToday}@2x.png`;
    $(".weather-img").attr("src", imgUrlToday);
}

function getNextDaysImgFromApi(data, i) {
    const imgNextDays = data.daily[i].weather[0].icon;
    const imgUrlNext = `http://openweathermap.org/img/wn/${imgNextDays}@2x.png`;
    $(".forecast-img").attr("src", imgUrlNext);
}

/*  Max Temp Chart: Presents the maximum temperature for the next seven days using the API data*/
function maxTempChart(dates) {
    const ctx = $("#maxTempChart");
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [
                dateToString(dates[1]),
                dateToString(dates[2]),
                dateToString(dates[3]),
                dateToString(dates[4]),
                dateToString(dates[5]),
                dateToString(dates[6]),
                dateToString(dates[7])
            ],
            datasets: [
                {
                    label: 'Max Temperature',
                    data: [
                        (Math.round(dates[0].temp.max)),
                        (Math.round(dates[1].temp.max)),
                        (Math.round(dates[2].temp.max)),
                        (Math.round(dates[3].temp.max)),
                        (Math.round(dates[4].temp.max)),
                        (Math.round(dates[5].temp.max)),
                        (Math.round(dates[6].temp.max))
                    ],
                    borderColor: ['rgba(251, 251, 251)'],
                    borderWidth: 2
                }
            ]
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
                    }
                }
            },
            responsive: true,
            color: 'rgba(251, 251, 251)'
        }
    });
}

/* Calling All: Invoking all the functions needed to run the widget*/
$(".forecast-info").hide();

/* Turns the user back to the main card, closing all the other open cards*/
$(".go-back-btn").click(function () {
    $(".collapse-item").collapse('toggle');
    $(".forecast-info").hide();
    $("#temperature-card").show();
})

/* Displays the card with the current weather details*/
$(".details").click(function () {
    $("#weather-det").show();
})

/* Displays the forecast for the corresponding date,
 closing all the other open cards, 
 except for the one with the other dates*/
$('*[class^="dateBtn"]').click(function () {
    $(".weather-details-card").hide();
    $("#temperature-card").hide();
    $(".forecast-info").show();
    $("#maxTempChart").hide();
})

/* Displays the chart card*/
$(".chart-btn").click(function () {
    $("#maxTempChart").show();
})

fetchData(apiUrl).then(data => {
    getTodaysWeather(data.current);
    $(".date").text(dateToString(data.current, 0));
    for (let i = 0; i < 8; i++) {
        dateToButton(data.daily, i);
        $((".dateBtn" + i)).click(function () {
            getNextDatesData(data.daily[i]);
            getNextDaysImgFromApi(data, i);
        });
    }
    getTodaysImgFromApi(data);
    maxTempChart(data.daily);
    changeBgImg(data.current.weather);
});
