'use strict';

/*
1) Переписать функцию start циклом do while

2) Добавить проверку что введённые данные являются числом, которые 
мы получаем на вопрос 'Во сколько это обойдется?’ в функции  getExpensesMonth

3) Если getTargetMonth возвращает нам отрицательное значение, 
то вместо “Цель будет достигнута” необходимо выводить “Цель не будет достигнута”

4) Проверить, чтобы все работало и не было ошибок в консоли

5) Добавить папку с уроком в свой репозиторий на GitHub
*/

let isNumber = function(number) {
    return !isNaN( parseFloat(number) ) && isFinite(number);
}; // если число возвращает true

let money = 0,
    income = 'фриланс',
    addExpenses = '',
    deposit = true,
    mission = 3200000,
    expenses = [],
    period = 6;

// количество дней в текущем месяце
const daysInMonth = function() {
    const today = new Date();
    return 32 - new Date(today.getFullYear(), today.getMonth(), 32).getDate();
};
let countDayInMonth = daysInMonth();

let start = function() {

    do {
        money = prompt('Ваш месячный доход?', 0);
    } while ( !isNumber(money) );
};
// начало работа программы
start();

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую.');
deposit = confirm('Есть ли у вас депозит в банке?'); // true | false

let showTypeOf = function(data) {
    return typeof data;
};

// console.log(showTypeOf(money));
// console.log(showTypeOf(income));
// console.log(showTypeOf(deposit));

/*
2) Добавить проверку что введённые данные являются числом, которые 
мы получаем на вопрос 'Во сколько это обойдется?’ в функции  getExpensesMonth
*/
let getExpensesMonth = function() {

    let sum = 0, res = 0;

    for (let i = 0; i < 2; i++) {
        expenses[i] = prompt('Введите обязательную статью расходов?');
        
        do {
            res = prompt('Во сколько это обойдется?'); // получение числа
        } while (!isNumber(res));
        sum += +res;
    }
    
    return sum;
};

let expensesEmount = getExpensesMonth();

console.log('Ваш месячный доход: ' + money);

console.log('Расходы за месяц: ' + expensesEmount);

// вычет расходов от месячного дохода 
let getAccumulatedMonth = function() {
    return money -= expensesEmount;
};

let accumulatedMonth = getAccumulatedMonth();

// количество месяцев за которые соберется нужная сумма
let getTargetMonth = function() {
    let targetMonth = Math.round(mission / accumulatedMonth);

    if (!isNumber(targetMonth) || targetMonth <= 0) {

        return console.log('Цель не достижима');
    }
    
    return console.log('Cрок достижения цели ' + targetMonth + ' месяцев');
};

getTargetMonth();

let lowExpenses = addExpenses.toLowerCase();
console.log(lowExpenses.split(', '));

console.log(expenses);


// 8) Поправить budgetDay учитывая бюджет на месяц, а не месячный доход. Вывести в консоль  округлив в меньшую сторону 
let budgetDay = Math.round(accumulatedMonth / countDayInMonth);

if (!isNumber(budgetDay) || budgetDay <= 0) {
    console.log('Бюджет на день: 0');
} else {
    console.log('Бюджет на день: ' + budgetDay);
}

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
    } else if (budgetDay <= 0) {
        return 'Что то пошло не так.';
    }
}

console.log(getStatusIncome());