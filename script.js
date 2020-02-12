'use strict';

const blockBody = document.createElement('div'),
    body = document.querySelector('body'),
    input = document.querySelectorAll('input'),
    buttonResult = document.getElementById('result'),
    buttonReset = document.getElementById('reset');


const addBlockBody = function () {
    
    let button = document.querySelectorAll('button');

    button.forEach(element => {

        element.style.fontSize = '18px';
        element.style.padding = '18px';
    });

    blockBody.style.width = '50%';
    blockBody.style.marginLeft = 'auto';
    blockBody.style.marginRight = 'auto';
    blockBody.style.marginBottom = '40px';
    blockBody.style.padding = '30px';
    blockBody.style.border = '1px solid #eaeaea';
    blockBody.style.borderRadius = '5px';

    input.forEach(element => {

        element.style.width = '100%';
        element.style.height = '45px';
        element.style.display = 'block';
        element.style.marginBottom = '20px';
        element.style.paddingLeft = '15px';
        element.style.fontSize = '16px';
        blockBody.appendChild(element);
    });

    blockBody.appendChild(buttonResult);
    blockBody.appendChild(buttonReset);
    body.appendChild(blockBody);
    buttonReset.style.display = 'none';
}();



function DomElement (selector, height, width, bg, fontSize, text = 'Dom') {

    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
    this.text = text;

    if (!this.emptyString(this.selector)) {
        alert('No');
    }

    if (!this.isNumber(this.height)) {
        alert('No number height');
    }

    if (!this.isNumber(this.fontSize)) {
        alert('No number fontSize');
    }

    if (!this.isNumber(this.width)) {
        alert('No number width');
    }

    if (!this.emptyString(this.text)) {
        alert('No text');
    }

    if (!this.emptyString(this.bg)) {
        alert('No bg');
    }
    this.createElementDom();
}

DomElement.prototype.createElementDom = function () {

    const selector = this.selector;

    if (selector !== '') {

        this.renderElement(selector.trim());
    }
};

DomElement.prototype.renderElement = function (selector) {

    const item = document.createElement('div'),
        innerBlock = document.createElement('div');

        innerBlock.style.width = '100%';
        innerBlock.style.display = 'block';
        innerBlock.style.textAlign = 'center';
        innerBlock.style.fontSize = this.fontSize + 'px';
        innerBlock.textContent = this.text;
        item.style.height = this.height + 'px';
        item.style.width = this.width + 'px';
        item.style.margin = 'auto';
        item.style.lineHeight = '100%';
        item.style.display = 'flex';
        item.style.alignItems = 'center';
        item.style.backgroundColor = this.bg;
        item.prepend(innerBlock);
    
    if (selector[0] === '.') {

        item.setAttribute('class', this.selector.slice(1));
    } else if (selector[0] === '#') {
        
        item.setAttribute('id', this.selector.slice(1));
    } else {
        alert('Название селектора должно начинаться с . или #');
    }

    body.appendChild(item);
};

DomElement.prototype.isNumber = function (data) {

    return !isNaN(parseFloat(data)) && isFinite(data);
}; // если число возвращает true

DomElement.prototype.notZero = function (data) {

    return (this.isNumber(data) && +data !== 0);
};

DomElement.prototype.emptyString = function (data) {

    return data.trim() !== '';
};

const deleteElement = function () {

    const element = document.querySelector(input[4].value);
    console.log(element);
    return element;
};

const start = function () {

    new DomElement(input[4].value, input[2].value, input[1].value, input[0].value, input[5].value, input[3].value);
    buttonReset.style.display = 'block';
    buttonResult.style.display = 'none';
    console.log(input[4].value);
};

const reset = function () {

    buttonReset.style.display = 'none';
    buttonResult.style.display = 'block';
    body.removeChild(deleteElement());
    input.forEach(element => {
        element.value = '';
    });
};

buttonResult.addEventListener('click', start);
buttonReset.addEventListener('click', reset);