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
    periodAmount = document.querySelector('.period-amount'),
    data = document.querySelector('.data'),
    calc = document.querySelector('.calc');


const AppData = function () {

    this.budget = 0; // общий доход без вычетов
    this.budgetDay = 0; // беджет на 1 день с вычетом обязятельных расходов
    this.budgetMonth = 0; // остаток суммы после вычета обязательных расходов
    this.expensesMonth = 0; // сумма обязательных расходов
    this.income = {}; // дополнительные доходы
    this.incomeMonth = 0;
    this.addIncome = []; // список дополнительных доходов
    this.expenses = {}; // расходы
    this.addExpenses = []; // возможные расходы
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
};

AppData.prototype.start = function () {

    this.budget = +salaryAmount.value;
    
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();

    this.showResult();
    this.blockedInputData();
};

AppData.prototype.showResult = function () {

    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcSavedMoney();
    
    let selectRange = this.calcSavedMoney();

    periodSelect.addEventListener('input', function () {

        incomePeriodValue.value = +periodSelect.value * selectRange;
    }, this);
};

AppData.prototype.reset = function () {

    let calcBlock = calc.querySelectorAll('input');

    let dataBlock = data.querySelectorAll('input[type=text]');
    
    dataBlock.forEach(function (item) {
        item.removeAttribute('readonly');
    });

    calcBlock.forEach(function (item) {
        item.value = '';
    });

    dataBlock.forEach(function (item) {
        item.value = '';
    });

    periodSelect.value = '1';
    periodAmount.textContent = '1';
    startButton.style.display = 'block';
    cancelButton.style.display = 'none';
    buttonPlusIncome.removeAttribute('disabled');
    buttonPlusExpenses.removeAttribute('disabled');
};

AppData.prototype.blockedInputData = function () {
        
    let dataBlock = data.querySelectorAll('input[type=text]');
    
    dataBlock.forEach(function (item) {
        item.setAttribute('readonly', 'readonly');
    });

    buttonPlusIncome.setAttribute('disabled', true);
    buttonPlusExpenses.setAttribute('disabled', true);

    startButton.style.display = 'none';
    cancelButton.style.display = 'block';
};

AppData.prototype.addExpensesBlock = function () {

    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, buttonPlusExpenses);
    expensesItems = document.querySelectorAll('.expenses-items');

    if (expensesItems.length === 3) {
        buttonPlusExpenses.style.display = 'none';
    }
};

AppData.prototype.addIncomeBlock = function () {

    let cloneIncomeItem = incomeItem[0].cloneNode(true);
    incomeItem[0].parentNode.insertBefore(cloneIncomeItem, buttonPlusIncome);
    incomeItem = document.querySelectorAll('.income-items');

    if (incomeItem.length === 3) {
        buttonPlusIncome.style.display = 'none';
    }
};

AppData.prototype.addPeriodSelect = function () {

    periodAmount.textContent = periodSelect.value;
};

AppData.prototype.getExpenses = function () {
        
    expensesItems.forEach(function (item) {

        let itemExpenses = item.querySelector('.expenses-title').value.trim(),
            cashExpenses = item.querySelector('.expenses-amount').value.trim();
        
        if (itemExpenses !== '' && cashExpenses !== '') {
            this.expenses[itemExpenses] = cashExpenses;
        }
    }, this);
};

AppData.prototype.getIncome = function () {

    let self = this;
    incomeItem.forEach(function (item) {

        let incomeTitle = item.querySelector('.income-title').value.trim(),
            incomeAmount = item.querySelector('.income-amount').value.trim();

        if (incomeTitle !== '' && incomeAmount !== '') {
            self.income[incomeTitle] = incomeAmount;
        }
    });
};

AppData.prototype.getAddExpenses = function () {

    let addExpenses = additionalExpensesItem.value.split(',');

    addExpenses.forEach(function (item) {
        item = item.trim();
        if (item !== '') {
            this.addExpenses.push(item);
        }
    }, this);
};

AppData.prototype.getAddIncome = function () {

    additionalIncomeItem.forEach(function (item) {
        let itemValue = item.value.trim();
        if (itemValue !== '') {
            this.addIncome.push(itemValue);
        }
    }, this);
};

AppData.prototype.getExpensesMonth = function () {

    let sum = 0;

    for (let item in this.expenses) {
        sum += +this.expenses[item];
    }

    this.expensesMonth = sum;
};

AppData.prototype.getBudget = function () {

    this.budgetMonth = this.budget + this.incomeMonth + this.expensesMonth;
    this.budgetDay = Math.ceil(this.budgetMonth / 30);
};

AppData.prototype.getTargetMonth = function () {

    return targetAmount.value / this.budgetMonth;
};

AppData.prototype.getStatusIncome = function () {

    let budgetMonth = this.budgetMonth;

    if (budgetMonth > 0 && budgetMonth <= 600) {
        return 'К сожалению у вас уровень дохода ниже среднего.';
    } else if (budgetMonth > 600 && budgetMonth < 1200) {
        return 'У вас средний уровень дохода.';
    } else if (budgetMonth >= 1200) {
        return 'У вас высокий уровень дохода.';
    } else if (budgetMonth <= 0) {
        return 'Что то пошло не так.';
    }
};

AppData.prototype.getInfoDeposit = function () {

    if (this.deposit) {

        let percent = 0,
            depositQuestion = 0;

        do {
            percent = prompt('Какой годовой процент?', '10');
        } while (!validateForm.notZero(percent));

        do {
            depositQuestion = prompt('Какая сумма заложена?', 10000);
        } while (!validateForm.notZero(depositQuestion));

        this.percentDeposit = percent;
        this.moneyDeposit = depositQuestion;
    }
};

AppData.prototype.calcSavedMoney = function () {

    return this.budgetMonth * +periodSelect.value;
};

AppData.prototype.eventsListener = function () {

    function blockedStart () {
    
        startButton.disabled = !salaryAmount.value.trim();
    }
    
    blockedStart();
    
    salaryAmount.addEventListener('input', blockedStart);
    startButton.addEventListener('click', this.start.bind(this));
    cancelButton.addEventListener('click', this.reset.bind(this));
    buttonPlusExpenses.addEventListener('click', this.addExpensesBlock.bind(this));
    buttonPlusIncome.addEventListener('click', this.addIncomeBlock.bind(this));
    periodSelect.addEventListener('input', this.addPeriodSelect.bind(this));
};


const appData = new AppData();

appData.eventsListener();