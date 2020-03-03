'use strict';


let decCache = [], decCases = [2, 0, 1, 1, 1, 2];

/**
 * 
 * @param {*} number 
 * @param {*} label 
 * шаблон вывода расширения для секунд, минут, часов, 
 */
function decOfNum(number, label) {

    if (!decCache[number]) {
        decCache[number] = number % 100 > 4 && number % 100 < 20 ? 2 :
            decCases[Math.min(number % 10, 5)];
    }
    return label[decCache[number]];
}

function clock() {

    let d = new Date();
    let monthNum = d.getMonth();
    let day = d.getDate();
    let dayNum = d.getDay();
    let hours = d.getHours();
    let minutes = d.getMinutes();
    let seconds = d.getSeconds();

    const month = new Array(
        'Января', 'Февраля', 'Марта', 'Апреля',
        'Мая', 'Июня', 'Июля', 'Августа',
        'Сентября', 'Октября', 'Ноября', 'Декабря'
    );

    const dayWeek = new Array(
        'Воскресение', 'Понедельник', 'Вторник', 'Среда',
        'Четверг', 'Пятница', 'Суббота'
    );

    if (seconds <= 9) { seconds = '0' + seconds; }

    let dateTime = `
        Сегодня ${dayWeek[dayNum]}, ${day} ${month[monthNum]} ${d.getFullYear()} года,
        ${hours} ${decOfNum(hours, ['час', 'часа', 'часов'])} 
        ${minutes} ${decOfNum(minutes, ['минута', 'минуты', 'минут'])} 
        ${seconds} ${decOfNum(seconds, ['секунда', 'секунды', 'секунд'])}
    `;
// '04.02.2020 - 21:05:33'

    if (day <= 9) { day = '0' + day; }
    if (monthNum <= 9) { monthNum = '0' + monthNum; }
    if (hours <= 9) { hours = '0' + hours; }
    if (minutes <= 9) { minutes = '0' + minutes; }

    let dateTimeSmall = `
        ${day}.${monthNum}.${d.getFullYear()} - ${hours}:${minutes}:${seconds}
    `;

    if (dateTime) {
        document.getElementById("outDateOne").textContent = dateTime;
    }

    if (dateTimeSmall) {
        document.getElementById("outDateTwo").textContent = dateTimeSmall;
    }

    setTimeout(clock, 1000);
}

clock();