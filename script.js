'use strict';


const outDate = document.getElementById('outDate');


// 'Сегодня Вторник, 4 февраля 2020 года, 21 час 5 минут 33 секунды'

const userDate = {

    day: 0,
    dayWeek: 0,
    month: 0,
    year: 0,
    hour: 0,
    minets: 0,
    seconds: 0,

    checkDate: function () {

        const date = new Date();

        this.day = date.getDate();
        this.dayWeek = date.getDay();
        this.month = date.getMonth();
        this.year = date.getFullYear();
        this.hour = date.getHours();
        this.minets = date.getHours();
        this.seconds = date.getSeconds();
    },

    dateOutPut: function () {


    }
};

userDate.checkDate();

console.log(userDate.day);
console.log(userDate.dayWeek);
console.log(userDate.month);
console.log(userDate.year);
console.log(userDate.hour);
console.log(userDate.minets);
console.log(userDate.seconds);

console.log(Date.now());