'use strict';
/**
 * 
 * @param {} price
 * 
 * Ввод числа в расчет стоимости
 */
const calcInputNumber = (price = 100) => {

    const calcBlock = document.querySelector('.calc-block'),
        inputNumber = calcBlock.querySelectorAll('input'),
        calcType = document.querySelector('.calc-type'),
        calcSquare = document.querySelector('.calc-square'),
        calcCount = document.querySelector('.calc-count'),
        calcDay = document.querySelector('.calc-day'),
        totalValue = document.getElementById('total');

    // запрет ввода букв
    inputNumber.forEach((element) => {

        element.addEventListener('input', function (event) {

            event.target.value = event.target.value.replace(/[^0-9.-]/, '');
        });
    });

    const countSum = () => {

        const typeValue = calcType.options[calcType.selectedIndex].value,
            squareValue = +calcSquare.value;
        let total = 0,
            countValue = 1,
            dayValue = 1;

        if (calcCount.value > 1) {
            countValue += (calcCount.value - 1) / 10;
        }

        if (calcDay.value && calcDay.value < 5) {
            dayValue *= 2;
        } else if (calcDay.value && calcDay.value < 10) {
            dayValue *= 1.5;
        }

        if (typeValue && squareValue) {
            total = Math.floor(price * typeValue * squareValue * countValue * dayValue);
        }

        totalValue.textContent = total;
    };

    calcBlock.addEventListener('change', (event) => {

        const target = event.target;

        // target.matches('.calc-type') || target.matches('.calc-square') ||
        // target.matches('.calc-count') || target.matches('.calc-day'

        if (target.matches('select') || target.matches('input')) {
            countSum();
        }
    });
    
};

export default calcInputNumber;