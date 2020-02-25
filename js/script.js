'use strict';

// проверяет входящие данные на тип
const filterByType = (type, ...values) => values.filter(
	value => typeof value === type);

// скрывает верску с информацией результата
const hideAllResponseBlocks = () => {
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		responseBlocksArray.forEach(block => block.style.display = 'none');
};

/**
 * 
 * @param {dialog__response-block} blockSelector 
 * @param {текст с результатом или ошибкой} msgText 
 * @param {id with dialog__results} spanSelector 
 */
const showResponseBlock = (blockSelector, msgText, spanSelector) => {
		hideAllResponseBlocks();
		document.querySelector(blockSelector).style.display = 'block';
		if (spanSelector) {
			document.querySelector(spanSelector).textContent = msgText;
		}
	};

// вывод ошибок
const showError = msgText => showResponseBlock(
	'.dialog__response-block_error', msgText, '#error');

// результат
const showResults = msgText => showResponseBlock(
	'.dialog__response-block_ok', msgText, '#ok');

// пока пользователь ничего не ввел
const showNoResults = () => showResponseBlock(
	'.dialog__response-block_no-results');

// функция вывода/вызова после ввода пользователем данных 
const tryFilterByType = (type, values) => {

	try {

		const valuesArray = new Function(
			`return filterByType('${type}', ${values})`
		);

		let arr = valuesArray(type, values);

		arr.join(', ');
		
		const alertMsg = (arr.length) ?
			`Данные с типом ${type}: ${arr}` :
			`Отсутствуют данные типа ${type}`;
		showResults(alertMsg);
	} catch (e) {
		showError(`Ошибка: ${e}`);
	}
};

// кнопка фильтра
const filterButton = document.querySelector('#filter-btn');

filterButton.addEventListener('click', e => {

	const typeInput = document.querySelector('#type');
	const dataInput = document.querySelector('#data');

	if (dataInput.value === '') {

		dataInput.setCustomValidity('Поле не должно быть пустым!');
		showNoResults();
	} else {

		dataInput.setCustomValidity('');
		e.preventDefault();
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
	}
});

