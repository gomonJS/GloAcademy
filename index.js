'use strict';

const startButton = document.getElementById('start'),
        buttonPlusIncome = document.getElementsByTagName('button')[0],
        buttonPlusExpenses = document.getElementsByTagName('button')[1],
        depositCheckbox = document.querySelector('#deposit-check'),
        additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
        expensesTitle = document.querySelector('input.expenses-title'),
        expensesAmount = document.querySelector('input.expenses-amount'),
        resultTotalList = document.querySelectorAll('.result-total'),
        salaryAmount = document.querySelector('.salary-amount'),
        incomeTitle = document.querySelector('.income-title'),
        incomeAmount = document.querySelector('.income-amount'),
        additionalExpensesItem = document.querySelector('.additional_expenses-item'),
        periodSelect = document.querySelector('.period-select');

console.log(buttonPlusIncome);
console.log(buttonPlusExpenses);