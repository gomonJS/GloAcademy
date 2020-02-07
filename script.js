'use strict';


const validateForm = {

    isNumber(number) {
        return !isNaN(parseFloat(number)) && isFinite(number);
    }, // если число возвращает true

    notZero(number) {
        return (this.isNumber(number) && +number !== 0);
    },

    emptyString(str) {
        return str.trim() !== '';
    }
};

const daysInMonth = function () {

    const today = new Date();
    return 32 - new Date(today.getFullYear(), today.getMonth(), 32).getDate();
};

let countDayInMonth = daysInMonth(); // количество дней в текущем месяце


let startButton = document.getElementById('start'),
    cancelButton = document.getElementById('cancel'),
    buttonPlusIncome = document.getElementsByTagName('button')[0],
    buttonPlusExpenses = document.getElementsByTagName('button')[1],
    depositCheckbox = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    expensesTitle = document.querySelector('input.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    budgetMonthValue = document.querySelector('.budget_month-value'),
    budgetDayValue = document.querySelector('.budget_day-value'),
    expensesMonthValue = document.querySelector('.expenses_month-value'),
    additionalIncomeValue = document.querySelector('.additional_income-value'),
    additionalExpensesValue = document.querySelector('.additional_expenses-value'),
    incomePeriodValue = document.querySelector('.income_period-value'),
    targetMonthValue = document.querySelector('.target_month-value'),
    salaryAmount = document.querySelector('.salary-amount'),
    // incomeTitle = document.querySelector('.income-title'),
    // incomeAmount = document.querySelector('.income-amount'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    periodSelect = document.querySelector('.period-select'),
    targetAmount = document.querySelector('.target-amount'),
    incomeItem = document.querySelectorAll('.income-items'),
    periodAmount = document.querySelector('.period-amount');


const appData = {

    budget: 0, // общий доход без вычетов
    budgetDay: 0, // беджет на 1 день с вычетом обязятельных расходов
    budgetMonth: 0, // остаток суммы после вычета обязательных расходов
    expensesMonth: 0, // сумма обязательных расходов
    income: {}, // дополнительные доходы
    incomeMonth: 0,
    addIncome: [], // список дополнительных доходов
    expenses: {}, // расходы
    addExpenses: [], // возможные расходы
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    start: function () {

        appData.budget = +salaryAmount.value;

        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();

        appData.showResult();
    },
    showResult: function () {

        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());
        incomePeriodValue.value = appData.calcSavedMoney();
        

        periodSelect.addEventListener('input', function() {

            incomePeriodValue.value = +periodSelect.value * appData.calcSavedMoney();
        });
    },
    addExpensesBlock: function () {

        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, buttonPlusExpenses);
        expensesItems = document.querySelectorAll('.expenses-items');

        if (expensesItems.length === 3) {
            buttonPlusExpenses.style.display = 'none';
        }
    },
    addIncomeBlock: function () {

        let cloneIncomeItem = incomeItem[0].cloneNode(true);
        incomeItem[0].parentNode.insertBefore(cloneIncomeItem, buttonPlusIncome);
        incomeItem = document.querySelectorAll('.income-items');

        if (incomeItem.length === 3) {
            buttonPlusIncome.style.display = 'none';
        }
    },
    addPeriodSelect: function() {

        periodAmount.textContent = periodSelect.value;
    },
    getExpenses: function () {

        expensesItems.forEach(function (item) {

            let itemExpenses = item.querySelector('.expenses-title').value.trim(),
                cashExpenses = item.querySelector('.expenses-amount').value.trim();
            
            if (itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    getIncome: function () {

        incomeItem.forEach(function (item) {

            let incomeTitle = item.querySelector('.income-title').value.trim(),
                incomeAmount = item.querySelector('.income-amount').value.trim();

            if (incomeTitle !== '' && incomeAmount !== '') {
                appData.income[incomeTitle] = incomeAmount;
            }
        });
    },
    getAddExpenses: function () {

        let addExpenses = additionalExpensesItem.value.split(',');

        addExpenses.forEach(function (item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function () {

        additionalIncomeItem.forEach(function (item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },
    getExpensesMonth: function () {

        let sum = 0;

        for (let item in appData.expenses) {
            sum += +appData.expenses[item];
        }

        appData.expensesMonth = sum;
    },

    getBudget: function () {

        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.ceil(appData.budgetMonth / 30);
    },

    getTargetMonth: function () {

        return targetAmount.value / appData.budgetMonth;
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
            } while (!validateForm.notZero(percent));

            do {
                depositQuestion = prompt('Какая сумма заложена?', 10000);
            } while (!validateForm.notZero(depositQuestion));

            appData.percentDeposit = percent;
            appData.moneyDeposit = depositQuestion;
        }
    },

    calcSavedMoney: function () {

        return appData.budgetMonth * +periodSelect.value;
    }

};


function blockedStart () {
    
    startButton.disabled = !salaryAmount.value.trim();
}

blockedStart();

salaryAmount.addEventListener('input', blockedStart);
startButton.addEventListener('click', appData.start);
buttonPlusExpenses.addEventListener('click', appData.addExpensesBlock);
buttonPlusIncome.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.addPeriodSelect);