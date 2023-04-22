'use strict';

import {cities} from "./data.js";

for (let i = 0; i < cities.length; i++) {
    $('<option></option>').val(cities[i]).text(cities[i]).appendTo('select');
}
$('select').on('change', () => {
    const chosenCity = $('select').val();
    let apiString = 'https://api.openweathermap.org/data/2.5/weather?q=' + chosenCity + '&units=metric&APPID=5d066958a60d315387d9492393935c19';

    fetch(apiString)
        .then(response => response.json())
        .then(showData);
})
function showData(data) {
    const weatherDetails = [
        `Місто: ${data.name}`,
        `Температура: ${data.main.temp} °C`,
        `Атмосферний тиск: ${data.main.pressure * 0.75} мм рт ст`,
        `Загальний опис: ${data.weather[0].description}`,
        `Вологість: ${data.main.humidity}%`,
        `Швидкість вітру: ${data.wind.speed} м/с`,
        `Напрям вітру по віднощенню до північного полюсу: ${data.wind.deg}°`,
    ];
    $('.weather-details')?.remove()
    $('<div></div>').addClass('weather-details').appendTo('.main-container');
    $('<img></img>').attr('src', `https://openweathermap.org/img/w/${data.weather[0].icon}.png`).appendTo('.weather-details').hide().fadeIn(1500);
    weatherDetails.forEach(item => $('<p></p>').addClass('list').text(item).appendTo('.weather-details').hide().show(2000));
}


