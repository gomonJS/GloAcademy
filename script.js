'use strict';


const isNumber = function(number) {
    return !isNaN( parseFloat(number) ) && isFinite(number);
}; // если число возвращает true

let money = 0,
    income = 'фриланс',
    addExpenses = '',
    deposit = true,
    mission = 320000,
    expenses = [],
    period = 6;


// количество дней в текущем месяце
const daysInMonth = function() {
    const today = new Date();
    return 32 - new Date(today.getFullYear(), today.getMonth(), 32).getDate();
};
let countDayInMonth = daysInMonth();

const start = function() {

    do {
        money = prompt('Ваш месячный доход?', 0);
    } while ( !isNumber(money) );
};

// начало работа программы
start();

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую.');
deposit = confirm('Есть ли у вас депозит в банке?'); // true | false

const showTypeOf = function(data) {

    return typeof data;
};

// console.log(showTypeOf(money));
// console.log(showTypeOf(income));
// console.log(showTypeOf(deposit));


// обязательные расходы
const getExpensesMonth = function() {

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
const getAccumulatedMonth = function() {

    return money -= expensesEmount;
};

let accumulatedMonth = getAccumulatedMonth();


// количество месяцев за которые соберется нужная сумма
const getTargetMonth = function() {

    let targetMonth = Math.round(mission / accumulatedMonth);

    if (!isNumber(targetMonth) || targetMonth <= 0) {

        return console.log('Цель не будет достигнута');
    }
    
    return console.log('Cрок достижения цели ' + targetMonth + ' месяцев');
};

getTargetMonth();


// получение массива расходов
const expensesConsole = function (expensesList) {

    let lowExpenses = expensesList.toLowerCase();

    return lowExpenses.split(', ');
};

console.log(expensesConsole(addExpenses));
console.log(expenses);


let budgetDay = Math.round(accumulatedMonth / countDayInMonth);

// вывод дневного бюджета
const outputBudgetDay = function (budget) {

    if (!isNumber(budget) || budget <= 0) {
        return 'Бюджет на день: 0';
    } else {
        return 'Бюджет на день: ' + budget;
    }
};

console.log(outputBudgetDay(budgetDay));


// информация об уровне дохода
const getStatusIncome = function () {

    if (budgetDay > 0 && budgetDay <= 600) {
        return 'К сожалению у вас уровень дохода ниже среднего.';
    } else if (budgetDay > 600 && budgetDay < 1200) {
        return 'У вас средний уровень дохода.';
    } else if (budgetDay >= 1200) {
        return 'У вас высокий уровень дохода.';
    } else if (budgetDay <= 0) {
        return 'Что то пошло не так.';
    }
};

console.log(getStatusIncome());