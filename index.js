'use strict';

const startButton = document.getElementById('start'),
        cancelButton = document.getElementById('cancel'),
        buttonPlusIncome = document.getElementsByTagName('button')[0],
        buttonPlusExpenses = document.getElementsByTagName('button')[1],
        depositCheckbox = document.querySelector('#deposit-check'),
        additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
        expensesTitle = document.querySelector('input.expenses-title'),
        expensesAmount = document.querySelector('input.expenses-amount'),
        budgetMonthValue = document.getElementsByClassName('budget_month-value'),
        budgetDayValue = document.getElementsByClassName('budget_day-value'),
        expensesMonthValue = document.getElementsByClassName('expenses_month-value'),
        additionalIncomeValue = document.getElementsByClassName('additional_income-value'),
        additionalExpensesValue = document.getElementsByClassName('additional_expenses-value'),
        incomePeriodValue = document.getElementsByClassName('income_period-value'),
        targetMonthValue = document.getElementsByClassName('target_month-value'),
        salaryAmount = document.querySelector('.salary-amount'),
        incomeTitle = document.querySelector('.income-title'),
        incomeAmount = document.querySelector('.income-amount'),
        additionalExpensesItem = document.querySelector('.additional_expenses-item'),
        periodSelect = document.querySelector('.period-select');