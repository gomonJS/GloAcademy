import allModalCallBack from "./modules/allModalCallBack";

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    /**
     *  @param {'класс модального окна', 'кнопка вызова модального окна'}
     *
     *  Все модальные окна
     *
     */
    allModalCallBack('.popup-call', 'a.call-btn');
    allModalCallBack('.popup-discount', 'button.discount-btn');
    allModalCallBack('.popup-check', 'button.check-btn');
    allModalCallBack('.popup-consultation', 'button.consultation-btn');
});
