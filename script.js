'use strict';

/*
1) Создать массив arr = []

— Записать в него 7 любых многозначных чисел в виде строк

— Вывести в консоль только те, что начинаются с цифры 2 или 4 (Должны присутствовать в массиве)


2) Вывести в столбик все простые числа от 1 до 100

— Статья про простые числа - КЛИК

— Рядом с каждым числом написать оба делителя данного числа

    Например: “Делители этого числа: 1 и n”


    3) Запушить проект в репозиторий для усложненных заданий на GitHub
*/


/**
 * Задание 1
 */

let arr = ['234', '7856', '123', '4589', '9068', '4355767', '734'];

let choiseNumber = function(arrayNumber) {
    let resArray = [];

    if (arrayNumber.length > 0) {
        
        for (let i = 0; i < arrayNumber.length; i++) {

            if (arrayNumber[i].substring(0, 1) === '2' || arrayNumber[i].substring(0, 1) === '4') {
                resArray.push(arrayNumber[i]);
            }
        }
    }
    return resArray;
};

console.log(choiseNumber(arr));


/**
 * Задание 2
 */

let primeNumber = function (number) {

    let resultArray = [];

    next:
    for (let i = 2; i <= number; i++) {

        for (let k = 2; k < i; k++) {

            if (i % k === 0) {
                continue next;
            }
        }
        resultArray.push(i);
    }
    return resultArray;
};

console.log(primeNumber(100));


// Функция, в которой проверяем число 
function isPrimeNumber(value) {

    if (isNaN(value) || !isFinite(value) || value % 1 || value < 2) {
        return false; 
    }
    
    var max = Math.floor( Math.sqrt(value) );

    for (var i = 2; i <= max; i++) {
        if (value % i === 0) {
            return false;
        }
    }
    return true;
}

// создаем массив, который будет содержать простые числа от 2 до 100
var primaryNumber = [];

for (var i = 2; i <= 100; i++) {
    if(isPrimeNumber(i)) {
        primaryNumber.push(i);
    }
}

// вывести в консоль массив простых чисел от 2 до 100
console.log(primaryNumber);