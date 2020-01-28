'use strict';

/*
1) Объявить функцию getExpensesMonth. Функция возвращает сумму всех обязательных расходов за месяц

2) Объявить функцию getAccumulatedMonth. Функция возвращает Накопления за месяц (Доходы минус расходы)

3) Объявить переменную accumulatedMonth и присвоить ей результат вызова функции getAccumulatedMonth 

4) Объявить функцию getTargetMonth. Подсчитывает за какой период 
будет достигнута цель, зная результат месячного накопления (accumulatedMonth) и 
возвращает результат

5) Удалить из кода переменную budgetMonth

6) budgetDay высчитываем исходя из значения месячного накопления (accumulatedMonth)

7) Почистить консоль логи и добавить недостающие, должны остаться:

 - вызовы функции showTypeOf

 - Расходы за месяц вызов getExpensesMonth

 - Вывод возможных расходов в виде массива (addExpenses)

 - Cрок достижения цели в месяцах (результат вызова функции getTargetMonth) 

 - Бюджет на день (budgetDay)

 - вызов функции getStatusIncome

8) Проверить, чтобы все работало и не было ошибок в консоли

9) Добавить папку с четвертым уроком в свой репозиторий на GitHub
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
// Date.prototype.daysInMonth = function() {
//     return 32 - new Date(this.getFullYear(), this.getMonth(), 32).getDate();
// };
// let countDayInMonth = new Date().daysInMonth();

const daysInMonth = function() {
    const today = new Date();
    return 32 - new Date(today.getFullYear(), today.getMonth(), 32).getDate();
};

let countDayInMonth = daysInMonth();

money = +prompt('Ваш месячный доход?', 0); // получение числа

expenses1 = prompt('Введите обязательную статью расходов?');
amount1 = +prompt('Во сколько это обойдется?'); // получение числа

expenses2 = prompt('Введите обязательную статью расходов?');
amount2 = +prompt('Во сколько это обойдется?'); // получение числа

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую.');
deposit = confirm('Есть ли у вас депозит в банке?'); // true | false

let showTypeOf = function(data) {
    return typeof data;
};

console.log(showTypeOf(money));
console.log(showTypeOf(income));
console.log(showTypeOf(deposit));

function getExpensesMonth() {
    return amount1 + amount2;
}

console.log('Расходы за месяц: ' + getExpensesMonth());

function getAccumulatedMonth() {
    return money -= +getExpensesMonth();
}

let accumulatedMonth = getAccumulatedMonth();

function getTargetMonth() {
    let res = Math.round(accumulatedMonth / countDayInMonth);
    return res;
}

console.log('Cрок достижения цели ' + getTargetMonth() + ' месяцев');

// let countAmount = amount1 + amount2;
// money -= +countAmount;

let lowExpenses = addExpenses.toLowerCase();
console.log(lowExpenses.split(', '));


// 8) Поправить budgetDay учитывая бюджет на месяц, а не месячный доход. Вывести в консоль  округлив в меньшую сторону 
let budgetDay = Math.round(accumulatedMonth / countDayInMonth);
console.log('Бюджет на день: ' + budgetDay);

/*
9) Написать конструкцию условий (расчеты приведены в рублях)	
Если budgetDay больше 1200, то “У вас высокий уровень дохода”
Если budgetDay больше 600 и меньше 1200, то сообщение “У вас средний уровень дохода”
Если budgetDay меньше 600 то в консоль вывести сообщение “К сожалению у вас уровень дохода ниже среднего”
Если отрицательное значение то вывести “Что то пошло не так”
Учесть варианты 0, 600 и 1200
*/

function getStatusIncome() {
    if (budgetDay > 0 && budgetDay <= 600) {
        return 'К сожалению у вас уровень дохода ниже среднего.';
    } else if (budgetDay > 600 && budgetDay < 1200) {
        return 'У вас средний уровень дохода.';
    } else if (budgetDay >= 1200) {
        return 'У вас высокий уровень дохода.';
    } else if (budgetDay < 0) {
        return 'Что то пошло не так.';
    }
}

console.log(getStatusIncome());