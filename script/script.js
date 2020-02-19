window.addEventListener('DOMContentLoaded', function () {

    'use strict';

    // timer
    function countTimer (deadline) {

        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds'),
            idInterval = '';

        function getTimeRemaining () {

            let dateStop = new Date(deadline).getTime(), // дата окончания
            dateNow = new Date().getTime(), // текущая дата
            timeRemaning = (dateStop - dateNow) / 1000, // Разница между датами | получение секунд
            seconds = Math.floor(timeRemaning % 60), // получение секунд
            minutes = Math.floor((timeRemaning / 60) % 60), // количетво минут
            hours = Math.floor(timeRemaning / 60 / 60); // количество часов

            return {timeRemaning, hours, minutes, seconds};
        }

        function updateClock () {

            let timer = getTimeRemaining();
        
            if (timer.hours < 10 ) {
                timerHours.textContent = '0' + timer.hours;
            } else {
                timerHours.textContent = timer.hours;
            }

            if (timer.minutes < 10) {
                timerMinutes.textContent = '0' + timer.minutes;
            } else {
                timerMinutes.textContent = timer.minutes;
            }

            if (timer.seconds < 10) {
                timerSeconds.textContent = '0' + timer.seconds;
            } else {
                timerSeconds.textContent = timer.seconds;
            }

            if (timer.timeRemaning <= 0) {

                clearInterval(idInterval);
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }
        }

        idInterval = setInterval(updateClock, 1000);
    }

    countTimer('20 february 2020');
});