'use strict';

const startButton = document.getElementById('start'),
        buttonPlusIncome = document.querySelector('.income').getElementsByTagName('button'),
        buttonPlusExpenses = document.querySelector('.expenses').getElementsByTagName('button'),
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