'use strict';


const validateForm = {

    isNumber (number) {
        return !isNaN( parseFloat(number) ) && isFinite(number);
    }, // если число возвращает true
    
    notZero (number) {
        return (this.isNumber(number) && +number !== 0);
    },

    emptyString (str) {
        return str.trim() !== '';
    }
};

const daysInMonth = function() {
    const today = new Date();
    return 32 - new Date(today.getFullYear(), today.getMonth(), 32).getDate();
}; 

let countDayInMonth = daysInMonth(); // количество дней в текущем месяце


let money;

const start = function() {

    do {
        money = prompt('Ваш месячный доход?', 1000);
    } while ( !validateForm.isNumber(money) );
};

start(); // начало работа программы


const appData = {

    budget: money, // общий доход без вычетов
    budgetDay: 0, // беджет на 1 день с вычетом обязятельных расходов
    budgetMonth: 0, // остаток суммы после вычета обязательных расходов
    expensesMonth: 0, // сумма обязательных расходов
    income: {}, // дополнительные доходы
    addIncome: [], // список дополнительных доходов
    expenses: {}, // расходы
    addExpenses: [], // возможные расходы
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 320000,
    period: 6,
    asking: function () {

        if (confirm('Есть ли вас дополнительный заработок?')) {

            let itemIncome, cashIncome, flag;

            do {
                itemIncome = prompt('Какой у вас есть дополнительный заработок?', 'Таксую');
            } while ( !validateForm.emptyString(itemIncome) );

            do {
                cashIncome = prompt('Какую сумму вы на этом зарабатываете?', 10000);
            } while ( !validateForm.notZero(cashIncome) ); // (!isNumber(cashIncome) && notZero(Math.floor(cashIncome)))
            
            appData.income[itemIncome] = cashIncome;
        }

        let addExpenses = prompt('Перечислите возможные расходы через запятую');
            appData.addExpenses = addExpenses.toLowerCase().slice(',');
            appData.deposit = confirm('Есть ли у Вас депозит в банке?');

        let sum = 0, question;

        for (let i = 0; i < 2; i++) {
            let exp = '';

            do {
                exp = prompt('Есть ли у Вас дополнительные расходы?');
            } while ( !validateForm.emptyString(exp) );

            do {
                question = prompt('Во сколько это обойдется?', 100);
            } while ( !validateForm.notZero(question) );

            sum = +question;
            appData.expenses[exp] = sum;
        }
    },

    getExpensesMonth: function () {

        let sum = 0;

        for (let item in appData.expenses) {
            sum += +appData.expenses[item];
        }

        appData.expensesMonth = sum;
    },

    getBudget: function () {

        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.ceil(appData.budgetMonth / 30);
    },

    getTargetMonth: function () {

        appData.period = Math.floor(appData.mission / appData.budgetMonth);
    },

    getStatusIncome: function () {

        let budgetMonth = appData.budgetMonth;

        if (budgetMonth > 0 && budgetMonth <= 600) {
            return 'К сожалению у вас уровень дохода ниже среднего.';
        } else if (budgetMonth > 600 && budgetMonth < 1200) {
            return 'У вас средний уровень дохода.';
        } else if (budgetMonth >= 1200) {
            return 'У вас высокий уровень дохода.';
        } else if (budgetMonth <= 0) {
            return 'Что то пошло не так.';
        }
    },

    getInfoDeposit: function () {

        if (appData.deposit) {

            let percent = 0,
                depositQuestion = 0;
            
            do {
                percent = prompt('Какой годовой процент?', '10');
            } while ( !validateForm.notZero(percent) );

            do {
                depositQuestion = prompt('Какая сумма заложена?', 10000);
            } while ( !validateForm.notZero(depositQuestion) );
            
            appData.percentDeposit = percent;
            appData.moneyDeposit = depositQuestion;
        }
    }, 

    calcSavedMoney: function () {

        return appData.budgetMonth * appData.period;
    }

};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getInfoDeposit();

console.log('Расходы за месяц: ' + appData.expensesMonth);

if (appData.period > 0) {
    console.log('Цель будет достигнута за: ' + appData.period + ' месяцев');
} else {
    console.log('Цель не может быть достигнута!');
}

console.log(appData.getStatusIncome());


/*
    2) Возможные расходы (addExpenses) вывести строкой в консоль 
    каждое слово с большой буквы слова разделены запятой и пробелом

    Пример (Интернет, Такси, Коммунальные расходы)
*/
let tempArr = appData.addExpenses.trim().split(','), str = '';

function outUpperCaseStr (str) { // Первая буква в верхнем регистре
    
    if (!str) { return; }

    return str[0].toUpperCase() + str.slice(1);
}

for (let i = 0; i < tempArr.length; i++) {

    tempArr[i] = tempArr[i].trim();
}

for (let i = 0; i < tempArr.length; i++) {
    
    if (i === tempArr.length - 1) {
        str += outUpperCaseStr(tempArr[i]);
    } else {
        str += outUpperCaseStr(tempArr[i]) + ', ';
    }
}

console.log(str);
/*
    2) Возможные расходы (addExpenses) вывести строкой в консоль 
    каждое слово с большой буквы слова разделены запятой и пробелом

    Пример (Интернет, Такси, Коммунальные расходы)
*/

console.log('Наша программа включает в себя данные:');

for (let key in appData) {
    console.log('Ключ: ' + key + ', Значение: ' + appData[key]);
}