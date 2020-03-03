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
    
    hoverReplaceImage(); // смена картинки при наведении курсора
    
    calcInputNumber(100); // расчет стоимости услуги
    
    sendForm(); // отправка формы
});