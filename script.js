'use strict';

/*

1) Весь функционал что был ранее оставляем, если что то необходимо удалить, об этом будет написано в задании

- 2) Спрашиваем у пользователя “Ваш месячный доход?” и результат сохраняем в переменную money

- 3) Спросить у пользователя 
“Перечислите возможные расходы за рассчитываемый период через запятую” 
сохранить в переменную addExpenses

- 4) Спросить у пользователя 
“Есть ли у вас депозит в банке?” и сохранить данные в переменной deposit (булево значение true/false)

- 5) Спросить у пользователя по 2 раза каждый вопрос и записать ответы в разные переменные 

“Введите обязательную статью расходов?” (например expenses1, expenses2)

“Во сколько это обойдется?” (например amount1, amount2)

в итоге 4 вопроса и 4 разные переменных

- 6) Вычислить бюджет на месяц, 
учитывая обязательные расходы, сохранить в новую переменную budgetMonth и вывести результат в консоль

- 7) Зная budgetMonth, посчитать за сколько месяцев будет достигнута 
цель mission, вывести в консоль, округляя в большую сторону (методы объекта Math в помощь)

- 8) Поправить budgetDay учитывая бюджет на месяц, а не месячный доход. Вывести в консоль  округлив в меньшую сторону 

- 9) Написать конструкцию условий (расчеты приведены в рублях)	

Если budgetDay больше 1200, то “У вас высокий уровень дохода”

Если budgetDay больше 600 и меньше 1200, то сообщение “У вас средний уровень дохода”

Если budgetDay меньше 600 то в консоль вывести сообщение “К сожалению у вас уровень дохода ниже среднего”

Если отрицательное значение то вывести “Что то пошло не так”

Учесть варианты 0, 600 и 1200

10) Проверить, чтобы все работало и не было ошибок в консоли

11) Добавить папку с третьим уроком в свой репозиторий на GitHub

*/

let money = 0,
    income = 'фриланс',
    addExpenses = '',
    deposit = true,
    mission = 3200000,
    expenses1, expenses2,
    amount1, amount2,
    period = 6;

// количество дней в текущем месяце
Date.prototype.daysInMonth = function() {
    return 32 - new Date(this.getFullYear(), this.getMonth(), 32).getDate();
};
let countDayInMonth = new Date().daysInMonth();

money = +prompt('Ваш месячный доход?', 0); // получение числа

if (!money) {
    money = +prompt('Вы не ввели Ваш месячный доход?', 0);
} else {
    expenses1 = prompt('Введите обязательную статью расходов?');
    amount1 = +prompt('Во сколько это обойдется?'); // получение числа

    expenses2 = prompt('Введите обязательную статью расходов?');
    amount2 = +prompt('Во сколько это обойдется?'); // получение числа

    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую.');
    deposit = confirm('Есть ли у вас депозит в банке?'); // true | false

    let countAmount = amount1 + amount2;
    money -= +countAmount;
}

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);

let strPeriod = `Период равен '${period}' месяцев`;
let strMission = `Цель заработать '${mission}' рублей/долларов/гривен/юани`;

console.log(strPeriod);
console.log(strMission);

let lowExpenses = addExpenses.toLowerCase();

console.log(lowExpenses.split(', '));

// 6) Вычислить бюджет на месяц, учитывая обязательные расходы, 
// сохранить в новую переменную budgetMonth и вывести результат в консоль
let budgetMonth = money; // остаток денег за 1 месяц
console.log('Бюджет на месяц: ' + budgetMonth);

// 7) Зная budgetMonth, посчитать за сколько месяцев будет 
// достигнута цель mission, вывести в консоль, округляя в большую сторону (методы объекта Math в помощь)
console.log('Цель будет достигнута за ' + Math.round(mission / budgetMonth) + ' месяцев');

// 8) Поправить budgetDay учитывая бюджет на месяц, а не месячный доход. Вывести в консоль  округлив в меньшую сторону 
let budgetDay = Math.round(budgetMonth / countDayInMonth);
console.log('Бюджет на день: ' + budgetDay);

/*
9) Написать конструкцию условий (расчеты приведены в рублях)	

Если budgetDay больше 1200, то “У вас высокий уровень дохода”

Если budgetDay больше 600 и меньше 1200, то сообщение “У вас средний уровень дохода”

Если budgetDay меньше 600 то в консоль вывести сообщение “К сожалению у вас уровень дохода ниже среднего”

Если отрицательное значение то вывести “Что то пошло не так”

Учесть варианты 0, 600 и 1200
*/

if (budgetDay > 0 && budgetDay <= 600) {
    console.log('К сожалению у вас уровень дохода ниже среднего.');
} else if (budgetDay > 600 && budgetDay < 1200) {
    console.log('У вас средний уровень дохода.');
} else if (budgetDay >= 1200) {
    console.log('У вас высокий уровень дохода.');
} else if (budgetDay < 0) {
    console.log('Что то пошло не так.');
}