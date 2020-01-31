'use strict';


const isNumber = function(number) {
    return !isNaN( parseFloat(number) ) && isFinite(number);
}; // если число возвращает true


const daysInMonth = function() {
    const today = new Date();
    return 32 - new Date(today.getFullYear(), today.getMonth(), 32).getDate();
}; 

let countDayInMonth = daysInMonth(); // количество дней в текущем месяце


let money;

const start = function() {

    do {
        money = prompt('Ваш месячный доход?', 1000);
    } while ( isNaN(money) || money === '' || money === null );
};

start(); // начало работа программы


let appData = {

    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    income: {}, // дополнительные доходы
    addIncome: [], // перечисление дополнительных доходов
    expenses: {}, // расходы
    addExpenses: [], // возможные расходы
    deposit: false,
    mission: 320000,
    period: 6,
    asking: function () {
        let addExpenses = prompt('Перечислите возможные расходы через запятую.');
            appData.addExpenses = addExpenses.toLowerCase().split(', ');
            appData.deposit = confirm('Есть ли у вас депозит в банке?');
        
        let sum = 0, question;

        for (let i = 0; i < 2; i++) {

            let exp = prompt('Введите обязательную статью расходов?');
            
            do {
                question = prompt('Во сколько это обойдется?'); // получение числа
            } while ( isNaN(question) || question === '' || question === null );
    
            sum = +question;

            appData.expenses[exp] = sum;
        }
    },
    
    getExpensesMonth: function() { // обязательные расходы

        let sum = 0;

        for (let key in appData.expenses) {
            sum += +appData.expenses[key];
        }

        appData.expensesMonth = sum;
        return sum;
    },

    getBudget: function() { // вычет расходов от месячного дохода

        appData.budgetDay = Math.ceil(money / 30);
        appData.budgetMonth = money - appData.expensesMonth;
        return money -= appData.expensesMonth;
    },

    getTargetMonth: function() {

        return appData.mission / appData.getBudget();
    },

    getStatusIncome: function () { // информация об уровне дохода

        if (appData.budgetDay > 0 && appData.budgetDay <= 600) {
            return 'К сожалению у вас уровень дохода ниже среднего.';
        } else if (appData.budgetDay > 600 && appData.budgetDay < 1200) {
            return 'У вас средний уровень дохода.';
        } else if (appData.budgetDay >= 1200) {
            return 'У вас высокий уровень дохода.';
        } else if (appData.budgetDay <= 0) {
            return 'Что то пошло не так.';
        }
    }
};


appData.asking();

console.log('Расходы за месяц: ' + appData.getExpensesMonth());


if (appData.getTargetMonth() > 0) {
    console.log('Цель будет достигнута за: ' + Math.ceil(appData.getTargetMonth()) + ' месяцев');
} else {
    console.log('Цель не будет достигнута');
}

// вывод дневного бюджета
const outputBudgetDay = function (budget) {

    if (!isNumber(budget) || budget <= 0) {
        return 'Бюджет на день: 0 рублей';
    } else {
        return 'Бюджет на день: ' + budget + ' рублей';
    }
};

console.log(appData.getStatusIncome());

for (let key in appData) {
    console.log('Наша программа включает в себя данные: ' + key + ' : ' + appData[key]);
}