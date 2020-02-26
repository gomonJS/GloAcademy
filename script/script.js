document.addEventListener('DOMContentLoaded', () => {

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
    countTimer('27 february 2020');

    /**
     * 
     * @param {} 
     * 
     * навигация сайта
     */
    const toggleMenu = () => {

        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu');

        const handlerMenu = () => {

            menu.classList.toggle('active-menu');
        };

        btnMenu.addEventListener('click', handlerMenu);

        menu.addEventListener('click', (event) => {

            let target = event.target;

            if (target.classList.contains('close-btn')) {
                handlerMenu();
            }

            if (target.closest('li')) {
                handlerMenu();
            }
        });
    };

    // события меню навигации
    toggleMenu();

    /**
     * Модальное окно
     */
    const togglePopUp = () => {

        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn');

        const screenWidth = window.screen.width;

        let idShow, count = 0;


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

        popup.addEventListener('click', (event) => {

            let target = event.target;

            if (target.classList.contains('popup-close')) {
                popup.style.display = 'none';
                popup.style.opacity = '0';
            } else {
                target = target.closest('.popup-content');
            
                if (!target) {
                    popup.style.display = 'none';
                    popup.style.opacity = '0';
                }
            }
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


    /**
     * 
     * Табы услуг
     */
    const tabs = () => {
        
        const
            // родитель табов 
            serviceHeader = document.querySelector('.service-header'),
            // коллекция табов
            tab = serviceHeader.querySelectorAll('.service-header-tab'),
            // коллеция контента для табов
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) => {

            for (let i = 0; i < tabContent.length; i++) {

                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        serviceHeader.addEventListener('click', (event) => {

            let target = event.target;
            target = target.closest('.service-header-tab');

            if (target) {
                
                tab.forEach((element, i) => {

                    if (element === target) {
                        toggleTabContent(i);
                    }
                });
            }
        });
    };

    tabs();


    /**
     * 
     * Слайдер
     */
    const slider = () => {

        const slider = document.querySelector('.portfolio-content'),
            slide = document.querySelectorAll('.portfolio-item'),
            portfolioDots = document.querySelector('.portfolio-dots');

            
        let currentSlide = 0,
            interval;

        // если есть слайды, создаем li
        if (slide) {
            
            for (let i = 0; i < slide.length; i++) {

                let e = document.createElement('li');
                e.classList.add('dot');
                portfolioDots.append(e);
            }
        }

        // созданные li
        const dot = document.querySelectorAll('.dot');

        const prevSlide = (elem, index, strClas) => {
            elem[index].classList.remove(strClas);
        };

        const nextSlide = (elem, index, strClas) => {
            elem[index].classList.add(strClas);
        };

        const autoPlaySlide = () => {

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;

            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 3000) => {

            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {

            clearInterval(interval);
        };

        slider.addEventListener('click', (event) => {

            event.preventDefault();

            let target = event.target;

            if (!target.matches('.portfolio-btn , .dot')) {
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((element, index) => {
                    if (element === target) {
                        currentSlide = index;
                    }
                });
            }

            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }

            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }
            
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });

        slider.addEventListener('mouseover', (event) => {

            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', (event) => {

            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                startSlide();
            }
        });

        startSlide(3500);
    };

    slider();


    /**
     * 
     * @param {}
     * 
     * Блок Наша команда. Наведение на фото меняется картинка
     */
    const hoverReplaceImage = () => {

        const command = document.getElementById('command');

        // старое занчение src картинки
        let tempImage = '';

        command.addEventListener('mouseover', (event) => {

            if (event.target.matches('.command__photo')) {
                tempImage = event.target.src;
                event.target.src = event.target.dataset.img;
            }
        });

        command.addEventListener('mouseout', (event) => {

            if (event.target.matches('.command__photo')) {
                event.target.src = tempImage;
            }
        });
    };

    hoverReplaceImage();


    /**
     * 
     * Картинки наша команда, дабавление текста в атрибут alt
     */
    const addTextAltImage = () => {

        const command = document.getElementById('command'),
            img = [...command.querySelectorAll('.command__photo')],
            description = command.querySelectorAll('.description');

        for (let item in img) {
            
            if (!img[item].alt) {
                img[item].alt = description[item].textContent;
            }
        }
    };

    addTextAltImage();


    /**
     * 
     * @param {} price
     * 
     * Ввод числа в расчет стоимости
     */
    const calcInputNumber = (price = 100) => {

        const calcBlock = document.querySelector('.calc-block'),
            inputNumber = calcBlock.querySelectorAll('input'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcCount = document.querySelector('.calc-count'),
            calcDay = document.querySelector('.calc-day'),
            totalValue = document.getElementById('total');

        // запрет ввода букв
        inputNumber.forEach((element) => {

            element.addEventListener('input', function (event) {

                event.target.value = event.target.value.replace(/[^0-9.-]/, '');
            });
        });

        const countSum = () => {

            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;
            let total = 0,
                countValue = 1,
                dayValue = 1;

            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }

            if (typeValue && squareValue) {
                total = Math.floor(price * typeValue * squareValue * countValue * dayValue);
            }

            totalValue.textContent = total;
        };

        calcBlock.addEventListener('change', (event) => {

            const target = event.target;

            // target.matches('.calc-type') || target.matches('.calc-square') ||
            // target.matches('.calc-count') || target.matches('.calc-day'

            if (target.matches('select') || target.matches('input')) {
                countSum();
            }
        });
        
    };

    calcInputNumber(100);

});