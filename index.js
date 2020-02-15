'use strict';

let // Поле data
    // Месячный доход*
    salaryAmount = document.querySelector('.salary-amount'),
    // Дополнительный доход название
    incomeTitle = document.querySelector('.income-title'),
    // Дополнительный доход сумма
    incomeAmount = document.querySelector('.income-amount'),
    // Дополнительный доход - блок полей
    incomeItems = document.querySelectorAll('.income-items'),
    // кнопка + Дополнительный доход
    btnPlusIncomeAdd = document.getElementsByTagName('button')[0],
    // Возможный доход 2 поля getAddIncome()
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    // Обязательные расходы название
    expensesTitle = document.querySelector('.expenses-title'),
    // Обязательные расходы сумма
    expensesAmount = document.querySelector('.expenses-amount'),
    // Обязательные расходы - блок полей
    expensesItems = document.querySelectorAll('.expenses-items'),
    // кнопка + Обязательные расходы
    btnPlusExpensesAdd = document.getElementsByTagName('button')[1],
    // Возможные расходы (перечислите через запятую) - getAddExpenses()
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    // Цель сумма
    targetAmount = document.querySelector('.target-amount'),
    // Период расчета - ползунок
    periodSelect = document.querySelector('.period-select'),
    // Период расчета - вывод числа на страницу
    periodAmount = document.querySelector('.period-amount');

let // Поле result
    // Доход за месяц
    budgetMonthValue = document.querySelector('.budget_month-value'),
    // Дневной бюджет
    budgetDayValue = document.querySelector('.budget_day-value'),
    // Расход за месяц
    expensesMonthValue = document.querySelector('.expenses_month-value'),
    // Возможные доходы
    additionalIncomeValue = document.querySelector('.additional_income-value'),
    // Возможные расходы
    additionalExpensesValue = document.querySelector('.additional_expenses-value'),
    // Накопления за период
    incomePeriodValue = document.querySelector('.income_period-value'),
    // Срок достижения цели в месяцах
    targetMonthValue = document.querySelector('.target_month-value'),
    data = document.querySelector('.data'),
    calc = document.querySelector('.calc');

const btnStart = document.getElementById('start'),
    btnCancel = document.getElementById('cancel');


class AppData {

    constructor () {

        this.budget = 0; // общий доход без вычетов
        this.budgetDay = 0; // беджет на 1 день с вычетом обязятельных расходов
        this.budgetMonth = 0; // остаток суммы после вычета обязательных расходов
        this.expensesMonth = 0; // сумма обязательных расходов
        this.income = {}; // дополнительные доходы - getIncome()
        this.incomeMonth = 0; // доходы за месяц
        this.addIncome = []; // список дополнительных доходов - getAddIncome()
        this.expenses = {}; // расходы - getExpenses()
        this.addExpenses = []; // возможные расходы - getAddExpenses()
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.targetAmount = 0;
    }

    // старт программы
    start () {

        this.budget = +salaryAmount.value;
    
        this.getExpenses(); // получение данных из полей - Обязательные расходы
        this.getIncome(); // получение данных из полей - Дополнительный доход
        this.getAddIncome(); // Возможный доход
        this.getTargetAmount(); // Цель сумма
        this.getAddExpenses(); // Возможные расходы (перечислите через запятую)
        this.getExpensesMonth(); // Сумма расходов за месяц
        this.addIncomeMonth();
        this.getBudget(); // расчет буджета на 1 день и 1 месяц

        this.showResult();
        this.btnResetVisible();
        this.blockedInputData();

        console.log(this);
    }

    // расчет буджета на 1 день и 1 месяц
    getBudget () {

        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.ceil(this.budgetMonth / 30);
    }

    // получение данных из полей - Дополнительный доход
    getIncome () {

        incomeItems = document.querySelectorAll('.income-items');

        incomeItems.forEach(function (item) {

            const itemIncome = item.querySelector('.income-title').value.trim(),
                amountIncome = item.querySelector('.income-amount').value.trim();

            if (itemIncome !== '' && amountIncome !== '') {
                this.income[itemIncome] = +amountIncome;
            }
        }, this);
    }

    // получение данных из полей - Обязательные расходы
    getExpenses () {

        expensesItems = document.querySelectorAll('.expenses-items');

        expensesItems.forEach(function (item) {

            const itemExpenses = item.querySelector('.expenses-title').value.trim(),
                amountExpenses = item.querySelector('.expenses-amount').value.trim();
            
            if (itemExpenses !== '' && amountExpenses !== '') {
                this.expenses[itemExpenses] = +amountExpenses;
            }
        }, this);
    }

    // Возможный доход
    getAddIncome () {

        additionalIncomeItem.forEach(function (item) {

            const itemValue = item.value.trim();

            if (itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        }, this);
    }

    // доходы за месяц
    addIncomeMonth () {

        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    }

    // Возможные расходы (перечислите через запятую)
    getAddExpenses () {

        const addExpenses = additionalExpensesItem.value.split(',');

        addExpenses.forEach(function (item) {

            item = item.trim();

            if (item !== '') {
                this.addExpenses.push(item);
            }
        }, this);
    }

    // Цель сумма
    getTargetAmount () {

        const target = targetAmount.value.trim();

        if (target !== '') {
            this.targetAmount = +target;
        }
    }

    // Период расчета
    getPeriod () {

        periodSelect.addEventListener('input', function () {
            periodAmount.textContent = periodSelect.value;
        }, this);
    }

    // Сумма расходов за месяц
    getExpensesMonth () {

        let sum = 0;

        for (let key in this.expenses) {
            sum += +this.expenses[key];
        }

        this.expensesMonth = +sum;
    }

    // Дабавление полей дополнительный доход
    addIncomeBlock () {

        const cloneItemIncom = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneItemIncom, btnPlusIncomeAdd);
        incomeItems = document.querySelectorAll('.income-items');

        if (incomeItems.length === 3) {
            btnPlusIncomeAdd.style.display = 'none';
        }
    }

    // Добавление полей дополнительный расход
    addExpensesBlock () {

        const cloneexpensesItems = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneexpensesItems, btnPlusExpensesAdd);
        expensesItems = document.querySelectorAll('.expenses-items');

        if (expensesItems.length === 3) {
            btnPlusExpensesAdd.style.display = 'none';
        }
    }

    // Вывод результата
    showResult () {

        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalIncomeValue.value = this.addIncome.join(', ');
        additionalExpensesValue.value = this.addExpenses.join(', ');
        incomePeriodValue.value = this.calcSavedMoney();
        targetMonthValue.value = Math.ceil(this.targetAmount / this.calcSavedMoney());

        const selectRange = this.calcSavedMoney();

        periodSelect.addEventListener('input', function () {
            incomePeriodValue.value = periodSelect.value * selectRange;
        }, this);
    }

    calcSavedMoney () {

        return (this.budget + this.incomeMonth - this.expensesMonth) * +periodSelect.value;
    }

    // Блокировка кнопки Рассчитать если Месячный доход не запонен =>> ()
    blockButtonStart () {

        salaryAmount.addEventListener('input', function () {
            btnStart.removeAttribute('disabled');
            periodSelect.removeAttribute('disabled');
        });
    
        btnStart.disabled = !salaryAmount.value.trim();
        periodSelect.setAttribute('disabled', true);
    }

    // Кнопка Сброса
    btnResetVisible () {

        btnStart.style.display = 'none';
        btnCancel.style.display = 'block';
    }

    // Сброс данных
    resetData () {

        btnCancel.style.display = 'none';
        btnStart.style.display = 'block';

        incomeItems = document.querySelectorAll('.income-items');
        for (let i = 1; i < incomeItems.length; i++) {
            incomeItems[i].remove();
        }

        btnPlusIncomeAdd.style.display = 'block';
        btnPlusIncomeAdd.removeAttribute('disabled');

        expensesItems = document.querySelectorAll('.expenses-items');
        for (let i = 1; i < expensesItems.length; i++) {
            expensesItems[i].remove();
        }

        btnPlusExpensesAdd.style.display = 'block';
        btnPlusExpensesAdd.removeAttribute('disabled');

        const calcBlock = calc.querySelectorAll('input');

        const dataBlock = data.querySelectorAll('input[type=text]');
        
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

        this.budget = 0; // общий доход без вычетов
        this.budgetDay = 0; // беджет на 1 день с вычетом обязятельных расходов
        this.budgetMonth = 0; // остаток суммы после вычета обязательных расходов
        this.expensesMonth = 0; // сумма обязательных расходов
        this.income = {}; // дополнительные доходы - getIncome()
        this.incomeMonth = 0; // доходы за месяц
        this.addIncome = []; // список дополнительных доходов - getAddIncome()
        this.expenses = {}; // расходы - getExpenses()
        this.addExpenses = []; // возможные расходы - getAddExpenses()
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.targetAmount = 0;

        salaryAmount.addEventListener('input', function () {
            btnStart.removeAttribute('disabled');
            periodSelect.removeAttribute('disabled');
        });

        btnStart.disabled = !salaryAmount.value.trim();
        periodSelect.setAttribute('disabled', true);
    }

    blockedInputData () {

        const dataBlock = data.querySelectorAll('input[type=text]');
    
        dataBlock.forEach(function (item) {
            item.setAttribute('readonly', 'readonly');
        });

        btnPlusIncomeAdd.setAttribute('disabled', true);
        btnPlusExpensesAdd.setAttribute('disabled', true);
    }

    eventListener () {

        this.getPeriod();
        this.blockButtonStart();
        btnCancel.addEventListener('click', this.resetData.bind(this));
        btnStart.addEventListener('click', this.start.bind(this));
        btnPlusIncomeAdd.addEventListener('click', this.addIncomeBlock.bind(this));
        btnPlusExpensesAdd.addEventListener('click', this.addExpensesBlock.bind(this));
    }
}

const calcData = new AppData();
calcData.eventListener();