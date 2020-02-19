window.addEventListener('DOMContentLoaded', function () {

    'use strict';

    let timesOfDay = document.querySelector('#times_of_day span'),
        dayOf = document.querySelector('#day span'),
        currentTime = document.querySelector('#current_time span'),
        newYear = document.querySelector('#new_year span');

    let dateNow = new Date();

    let time = dateNow.getHours();

    if (time >= 4 && time <= 12) {
        timesOfDay.textContent = 'Доброе утро';
    } else if (time > 12 && time <= 16) {
        timesOfDay.textContent = 'Добрый день';
    } else if (time > 16 && time <= 24) {
        timesOfDay.textContent = 'Добрый вечер';
    } else {
        timesOfDay.textContent = 'Доброй ночи';
    }

    let day = dateNow.getDay();

    let weekDay = ['Воскресение', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

    weekDay.forEach((element, k) => {

        if (day === k) {
            dayOf.textContent = element;
        }
    });

    let timeNow = new Date();

    currentTime.textContent = `${timeNow.getHours()}:${timeNow.getMinutes()}:${timeNow.getSeconds()}`;

    let timeNext = new Date('31 December 2020').getTime(),
        timeCurrent = new Date().getTime(),
        remaning = (timeNext - timeCurrent) / 1000,
        countDay = remaning / 60 / 60 / 24;
    
    newYear.textContent = Math.floor(countDay);
});