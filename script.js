'use strict';

let week = [
    'Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'
];

let blockWeek = document.getElementById('blockWeek'),
    day = new Date().getDay();

for (let i = 0; i < week.length; i++) {

    if (day === i) {
        blockWeek.innerHTML += '<p><strong>' + week[i] + '</strong></p>';
    } else if (i === 0) {
        blockWeek.innerHTML += '<p><em>' + week[i] + '</em></p>';
    } else if (i === 6) {
        blockWeek.innerHTML += '<p class="AppC"><em>' + week[i] + '</em></p>';
    } else {
        blockWeek.innerHTML += '<p>' + week[i] + '</p>';
    }
}