'use strict';

class Validator {

    constructor ({selector, pattern = {}, method}) {

        // получение селектора обрабатываемой формы
        this.form = document.querySelector(selector);
        this. pattern = pattern; // регулярное вырвжение для валидации
        this.method = method; // 
        // выбирае м из формы все поля для ввода, кроме кнопок
        this.elementsForm = [...this.form.elements].filter(
            (item) => {
                return  item.tagName.toLowerCase() !== 'button' && item.type !== 'button';
            }
        );
        this.error = new Set();
    }

    init () {
        this.applyStyle();
        this.setPattern();

        // обработчик события на каждое поле ввода
        this.elementsForm.forEach((elem) => {
            elem.addEventListener('change', this.checIt.bind(this));
        });

        this.form.addEventListener('submit', (e) => {

            this.elementsForm.forEach(elem => this.checIt({target: elem}));

            if (this.error.size) {
                e.preventDefault();
            }
        });
    }

    isValid (elem) {

        const validatorMethod = {
 
            notEmpty (elem) {

                if (elem.value.trim() === '') {
                    return false;
                }
                return true;
            },
            pattern (elem, pattern) {

                return pattern.test(elem.value);
            }
        };

        const method = this.method[elem.id];

        if (this.method) {

            if (method) {

                return method.every((item) => {
                    return validatorMethod[item[0]](elem, this.pattern[item[1]]);
                });
            }
        }
        
        return true;
    }

    checIt (event) {

        // элемент на котором было событие
        const target = event.target;

        if (this.isValid(target)) {

            this.showSuccess(target);
            this.error.delete(target);
        } else {

            this.showError(target);
            this.error.add(target);
        }
    }

    // валидация не пройдена
    showError (elem) {

        elem.classList.remove('success');
        elem.classList.add('error');

        if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
            return;
        }
        const errorDiv = document.createElement('div');
        errorDiv.textContent = 'Не коректные данные';
        errorDiv.classList.add('validator-error');
        elem.insertAdjacentElement('afterend', errorDiv);
    }

    // успешная валидация
    showSuccess (elem) {

        elem.classList.remove('error');
        elem.classList.add('success');

        if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
            elem.nextElementSibling.remove();
        }
    }

    // добавление стилей на сраницу
    applyStyle () {

        const style = document.createElement('style');

        style.textContent = `
        input.success {
            border: 2px solid blue !important;
        }
        input.error {
            border: 2px solid red !important;
        }
        .validator-error {
            font-size: 12px;
            font-weight: bold;
            font-family: sans-serif;
            position: relative;
            top: -20px;
        }
        `;
        
        document.head.appendChild(style);
    }

    setPattern () {

        if (!this.pattern.phone) {
            this.pattern.phone = /^\+?[78]([-()]*\d){10}$/;
        }

        if (!this.pattern.email) {
            this.pattern.email = /^\w+@\w+\.\w{2,}$/;
        }

        if (!this.pattern.name) {
            this.pattern.name = /^[а-яёА-ЯЁ\s\-]+$/;
        }

        if (!this.pattern.message) {
            this.pattern.message = /^[a-zA-Zа-яёА-ЯЁ\s\-]+$/;
        }
    }
}
