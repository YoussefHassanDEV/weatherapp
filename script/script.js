"use strict";
let input = document.querySelector("#cityName")
let apiKey = '55e712cfda2d4c67b5e210723240101  ';
let loc='cairo'
async function fetchWeatherDataCurrent(val) {
    loc = val;
    if (loc === '') {
        loc = 'cairo'
    }

    let apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${loc}&aqi=no`;

    let response = await fetch(apiUrl);
    if (response.ok) {
        let data = await response.json();
        let cityName = data.location.name;
        let Temp = data.current.temp_c
        let weathericon = `<img src="${data.current.condition.icon}" alt="CDN Image"></img>`
        let stat = data.current.condition.text
        let windDegree = data.current.wind_degree
        let umber = data.current.humidity;
        let speed = data.current.wind_kph;
        showcurrent(cityName, Temp, weathericon, stat, windDegree, umber, speed)
    } else {
        loc = 'cairo'
        console.error('Request failed with status:', response.status);
    }
}
async function fetchWeatherDataCurrent3days(val) {
     loc = val;
    if (loc === '') {
        loc = 'cairo'
    }
    let apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${loc}&days=3`;
    let response = await fetch(apiUrl);
    if (response.ok) {
        let data = await response.json();
        let day1MaxTemp = data.forecast.forecastday[0].day.maxtemp_c
        let day2MaxTemp = data.forecast.forecastday[1].day.maxtemp_c
        let day1MinTemp = data.forecast.forecastday[0].day.mintemp_c
        let day2MinTemp = data.forecast.forecastday[0].day.mintemp_c
        let day1text = data.forecast.forecastday[0].day.condition.text
        let day2text = data.forecast.forecastday[1].day.condition.text
        let weathericon1 = `<img src="${data.forecast.forecastday[0].day.condition.icon}" alt="CDN Image"></img>`
        let weathericon2 = `<img src="${data.forecast.forecastday[1].day.condition.icon}" alt="CDN Image"></img>`
        showtomorow(day1MaxTemp, day1MinTemp, weathericon1, day1text)
        showdayafter(day2MaxTemp, day2MinTemp, weathericon2, day2text)

        console.log()
    } else {
        loc = 'cairo'
        console.error('Request failed with status:', response.status);
    }

}
function showcurrent(cityname, temp, weathericon, stat, windDegree, umber, speed) {
    const currentDate = new Date();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = daysOfWeek[currentDate.getDay()];
    const dayNumber = currentDate.getDate(); // Get the day number (1-31)
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthName = monthNames[currentDate.getMonth()];
    let cartona = ``;
    cartona = `                <div class="d-flex justify-content-between " id="top">
    <h2>${currentDay}</h2>
    <h2>${dayNumber},${monthName}</h2>
</div>
<div>
    <h1 class="fs-2">${cityname}
    </h1>
</div>
<div>
    <h1 class="fs-1 d-flex">${temp} °C</h1>
</div>
<div class="d-flex">${weathericon} ${stat}</div>
<div class="d-flex">
    <div class="ms-5 d-flex" ><img src="./gallery/icon-umberella.png" alt=""> <div class="mx-1">${umber}</div> % </img></div>
    <div class="ms-5 d-flex"><img src="./gallery/icon-wind.png" alt=""></img> <div class="mx-1">${speed}</div> </div>
    <div class="ms-5 d-flex"><img src="./gallery/icon-compass.png" alt=""></img><div class="mx-1">${windDegree}</div></div>
</div>`
    document.querySelector("#current").innerHTML = cartona
}
function showtomorow(dayMaxTemp, dayMinTemp, weathericon, daytext) {
    const currentDate = new Date();
    const tomorrowDate = new Date(currentDate);
    tomorrowDate.setDate(currentDate.getDate() + 1); // Set to tomorrow's date

    const dayNumber = tomorrowDate.getDate(); // Get tomorrow's day number (1-31)
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthName = monthNames[tomorrowDate.getMonth()]; // Get tomorrow's month name (January - December)
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = dayNames[tomorrowDate.getDay()]; // Get tomorrow's day name (Sunday - Saturday)
    let cartona = ``;
    cartona = `                <div class="d-flex justify-content-between " id="top">
    <h2>${dayName}</h2>
    <h2>${dayNumber},${monthName}</h2>
</div>
<div>
    <h1 class="fs-1 d-flex">${dayMaxTemp} °C</h1>
    <h3 class="fs-3 d-flex">${dayMinTemp} °C</h3>

</div>
<div class="d-flex">${weathericon} ${daytext}</div>
</div>`
    document.querySelector("#tomorow").innerHTML = cartona

}
function showdayafter(dayMaxTemp, dayMinTemp, weathericon, daytext) {
    const currentDate = new Date();
    const dayAfterTomorrowDate = new Date(currentDate);
    dayAfterTomorrowDate.setDate(currentDate.getDate() + 2); // Set to the day after tomorrow's date

    const dayNumber = dayAfterTomorrowDate.getDate(); // Get the day after tomorrow's day number (1-31)
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthName = monthNames[dayAfterTomorrowDate.getMonth()]; // Get the month name of the day after tomorrow (January - December)
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = dayNames[dayAfterTomorrowDate.getDay()]; // Get the day name of the day after tomorrow (Sunday - Saturday)

    console.log('The day after tomorrow is', dayNumber, 'of', monthName); // Output the day after tomorrow's day number and month name
    console.log('The day after tomorrow is', dayName); // Output the day after tomorrow's day name
    let cartona = ``;
    cartona = `                <div class="d-flex justify-content-between " id="top">
    <h2>${dayName}</h2>
    <h2>${dayNumber},${monthName}</h2>
</div>
<div>
    <h1 class="fs-1 d-flex">${dayMaxTemp} °C</h1>
    <h3 class="fs-3 d-flex">${dayMinTemp} °C</h3>

</div>
<div class="d-flex">${weathericon} ${daytext}</div>
</div>`
    document.querySelector("#dayafter").innerHTML = cartona

}
input.addEventListener("keydown", function () {
    display()
})
fetchWeatherDataCurrent("cairo")
fetchWeatherDataCurrent3days("cairo")
function display() {
    fetchWeatherDataCurrent(input.value)
    fetchWeatherDataCurrent3days(input.value)
}
