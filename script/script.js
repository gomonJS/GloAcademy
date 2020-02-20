window.addEventListener('DOMContentLoaded', () => {

    'use strict';

    /**
     * 
     * @param {дата конца отсчета счетчика: 31 december 2020} deadline 
     */
    const countTimer = (deadline) => {

        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds'),
            idInterval = '';

        const getTimeRemaining = () => {

            let dateStop = new Date(deadline).getTime(), // дата окончания
            dateNow = new Date().getTime(), // текущая дата
            timeRemaning = (dateStop - dateNow) / 1000, // Разница между датами | получение секунд
            seconds = Math.floor(timeRemaning % 60), // получение секунд
            minutes = Math.floor((timeRemaning / 60) % 60), // количетво минут
            hours = Math.floor(timeRemaning / 60 / 60); // количество часов

            return {timeRemaning, hours, minutes, seconds};
        };

        const updateClock = () => {

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
        };

        idInterval = setInterval(updateClock, 1000);
    };

    // старт таймера
    countTimer('22 february 2020');

    /**
     * 
     * @param {} 
     * 
     * навигация сайта
     */
    const toggleMenu = () => {

        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            menuItems = menu.querySelectorAll('ul>li'),
            closeBtn = document.querySelector('.close-btn');

        const handlerMenu = () => {

            menu.classList.toggle('active-menu');
        };

        btnMenu.addEventListener('click', handlerMenu);

        closeBtn.addEventListener('click', handlerMenu);

        menuItems.forEach((element) => element.addEventListener('click', handlerMenu));
    };

    // события меню навигации
    toggleMenu();

    /**
     * Модальное окно
     */
    const togglePopUp = () => {

        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupClose = document.querySelector('.popup-close');

        let idShow, count = 0, screenWidth = window.screen.width;

        const fadeShow = () => {
            
            count++;
            popup.style.opacity = `${count}%`;

            if (count < 100) {
                idShow = setTimeout(fadeShow, 0.1);
            } else {
                clearTimeout(idShow);
                count = 0;
            }
        };

        popupBtn.forEach((element) => {

            element.addEventListener('click', () => {

                popup.style.display = 'flex';

                if (screenWidth > 768) {

                    fadeShow();
                } else {
                    popup.style.opacity = 1;
                }
            });
        });

        popupClose.addEventListener('click', () => {

            popup.style.display = 'none';
            popup.style.opacity = '0';
        });
    };

    // модальное окно
    togglePopUp();


    /**
     * 
     * Плавная прокрутка до якоря на странице
     */
    const clickAnchor = () => {

        let linkAnchors = document.querySelectorAll('a[href*="#"]');
        
        linkAnchors.forEach((element) => {

            element.addEventListener('click', (event) => {

                event.preventDefault();

                const idX = element.getAttribute('href').substr(1);

                document.getElementById(idX).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        });
    };

    clickAnchor();
});