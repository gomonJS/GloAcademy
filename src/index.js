'use strict';

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
import addTextAltImage from './modules/addTextAltImage';
import calcInputNumber from './modules/calcInputNumber';
import sendForm from './modules/sendForm';

// старт таймера
countTimer('27 february 2020');

// события меню навигации
toggleMenu();

// модальное окно
togglePopUp();

// прокрутка по якорям
clickAnchor();

// переключение табов
tabs();

// слайдер
slider();

// смена картинки при наведении курсора
hoverReplaceImage();

// добавление alt
addTextAltImage();

// расчет стоимости услуги
calcInputNumber(100);

// отправка формы
sendForm();