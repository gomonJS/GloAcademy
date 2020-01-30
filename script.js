'use strict';

/*
Это задание выполняется отдельно от нашего проекта с бюджетом!

Для этого задания создайте отдельный репозиторий.

Используйте функции alert, confirm, prompt для общения с пользователем.


Написать игровой бот.

"Загадывание случайного числа от 1 до 100"

Что должна делать программа:

— спрашивает пользователя: "Угадай число от 1 до 100".
— если пользовательское число больше, то бот выводит "Загаданное число меньше" и предлагает ввести новый вариант;
— если пользовательское число меньше, то бот выводит "Загаданное число больше" и предлагает ввести новый вариант;
— если пользователь ввел не число, то выводит сообщение "Введи число!" и предлагает ввести новый вариант;
— если пользователь нажимает "Отмена", то игра заканчивается.

Программа должны быть выполнена с помощью рекурсии, без единого цикла.

Загаданное число должно храниться «в замыкании»
*/


// проверка на число
const isNumber = function (number) {

    // если не является числом, вернет false
    return !isNaN(parseFloat(number)) && isFinite(number);
};

// случайное число
const randomNumber = function (min = 1, max = 10) {

    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
};


const gameRandomNumber = function () {

    let number = randomNumber(1, 100);
    let userNumber = prompt('Угадай число от 1 до 100');

    if (userNumber === null) {
        return;
    }
    
    console.log(number);
    return function bar () {
        
        if (!isNumber(userNumber)) {
            return;
        } else if (isNumber(userNumber)) {

            if (parseFloat(userNumber) === number) {
                alert('Вы выиграли!');
            } else if (parseFloat(userNumber) < number) {
                userNumber = prompt('Загаданное число больше');
                return bar();
            } else if (parseFloat(userNumber) > number) {
                userNumber = prompt('Загаданное число меньше');
                return bar();
            }
        } else {
            return bar();
        }
    };
};

let out = gameRandomNumber();
out();