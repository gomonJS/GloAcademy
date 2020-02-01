'use strict';

let week = [
    'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'
];

let blockWeek = document.getElementById('blockWeek'),
    day = new Date().getDay();

for (let i = 0; i < week.length; i++) {

    if (day === i) {
        blockWeek.innerHTML += '<p><strong>' + week[i] + '</strong></p>';
    } else if (i === 5) {
        blockWeek.innerHTML += '<p><em>' + week[i] + '</em></p>';
    } else if (i === 6) {
        blockWeek.innerHTML += '<p><em>' + week[i] + '</em></p>';
    } else {
        blockWeek.innerHTML += '<p>' + week[i] + '</p>';
    }
}