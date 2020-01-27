'use strict';

/*
Необходимо выполнить в отдельном JS файле, подключенному к отдельной HTML странице

Переменная lang может принимать 2 значения: 'ru' 'en'.

1. Написать условия при котором в зависимости от значения lang 
будут выводится дни недели на русском или английском языке. Решите задачу

- через if, 

- через switch-case 

- через многомерный массив без ифов и switch.

2. У нас есть переменная namePerson. Если значение этой переменной “Артем” 
то вывести в консоль “директор”, если значение “Максим” 
то вывести в консоль “преподаватель”, с любым другим значением вывести в консоль “студент”

- Решить задачу с помощью нескольких тернарных операторов, без использования if или switch

Запушить проект в репозиторий для усложненных заданий на GitHub
*/

let lang = document.getElementsByTagName('html')[0].getAttribute('lang'),
    day = document.querySelector('.day'),
    namePerson = 'Артем';

const ruDaysOfWeek = [
    'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'
];

const enDaysOfWeek = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
];

if (lang === 'ru') {

    ruDaysOfWeek.forEach(element => {
        day.innerHTML += '<p>'+ element +'</p>';
    });
    
} else if (lang === 'en') {

    enDaysOfWeek.forEach(element => {
        day.innerHTML += '<p>'+ element +'</p>';
    });

}

switch (lang) {
    
    case 'ru':
        ruDaysOfWeek.forEach(element => {
            day.innerHTML += '<p>'+ element +'</p>';
        });
        break;

    case 'en':
        enDaysOfWeek.forEach(element => {
            day.innerHTML += '<p>'+ element +'</p>';
        });
        break;
}

const arrayDaysOfWeek = [
    ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
    ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
];

console.log(lang === 'ru' ? arrayDaysOfWeek[0] : arrayDaysOfWeek[1]);

/*
2. У нас есть переменная namePerson. Если значение этой переменной “Артем” 
то вывести в консоль “директор”, если значение “Максим” то вывести в консоль “преподаватель”, 
с любым другим значением вывести в консоль “студент”
*/

namePerson = (namePerson ==='Артем') ? console.log('Директор') :
                (namePerson === 'Максим') ? console.log('Преподаватель') :
                (namePerson === '') ? console.log('') : console.log('Студент'); 
