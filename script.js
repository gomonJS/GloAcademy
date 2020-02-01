'use strict';

let week = [
    'Воскресенье', 'Суббота', 'Пятница', 'Четверг', 'Среда', 'Вторник', 'Понедельник'
];

let blockWeek = document.getElementById('blockWeek'),
    day = new Date().getDay();

let newWeek = week;

for (let i = newWeek.length - 1; i >= 0; i--) {

    if (day === i) {
        blockWeek.innerHTML += '<p><strong>' + newWeek[i] + '</strong></p>';
    } else if (i === 0) {
        blockWeek.innerHTML += '<p><em>' + newWeek[i] + '</em></p>';
    } else if (i === 1) {
        blockWeek.innerHTML += '<p class="AppC"><em>' + newWeek[i] + '</em></p>';
    } else {
        blockWeek.innerHTML += '<p>' + newWeek[i] + '</p>';
    }
}