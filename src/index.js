import "@babel/polyfill";
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';

elementClosest(window);

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import clickAnchor from './modules/clickAnchor';
import tabs from './modules/tabs';
import slider from './modules/slider';
import sliderCarousel from './modules/sliderCarousel';
import hoverReplaceImage from './modules/hoverRerlaceImage';
import calcInputNumber from './modules/calcInputNumber';
import sendForm from './modules/sendForm';

document.addEventListener('DOMContentLoaded', () => {

    'use strict';
    
    countTimer('5 march 2020'); // старт таймера
    
    toggleMenu(); // события меню навигации
    
    togglePopUp(); // модальное окно
    
    clickAnchor(); // прокрутка по якорям
    
    tabs(); // переключение табов
    
    slider(); // слайдер

    const carousel = new sliderCarousel({
        main: '.companies-wrapper',
        wrap: '.companies-hor',
        slidesToShow: 4,
        infinity: true,
        responsive: [
            {
                breakpoint: 1024,
                slideToShow: 3
            },
            {
                breakpoint: 768,
                slideToShow: 2
            },
            {
                breakpoint: 480,
                slideToShow: 1
            },
        ]
    });

    carousel.init();
    
    hoverReplaceImage(); // смена картинки при наведении курсора
    
    calcInputNumber(100); // расчет стоимости услуги
    
    sendForm(); // отправка формы
});