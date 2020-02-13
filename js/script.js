'use strict';


const form = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.getElementById('todo'),
    completedList = document.getElementById('completed');


// создание объекта
let data = {

    todo: [],
    completed: []
};

// если localStorage не пуст то заполняем массив данными
if (localStorage.getItem('localData')) {
    data = JSON.parse(localStorage.getItem('localData'));
}

// если массив не пуст
const renderLocalStorage = function () {

    // если массив пуст то выходим из функции
    if (!data.todo.length && !data.completed.length) {
        return;
    }

    // если не пуст массив то выводим элементы на страницу
    for (let i = 0; i < data.todo.length; i++) {
        renderItem(data.todo[i]);
    }

    // если не пуст массив то выводим элементы на страницу
    for (let i = 0; i < data.completed.length; i++) {
        renderItem(data.completed[i], true);
    }
};

// функция обновления localStorage
const dataUpdateToLocalStorage = function () {

    localStorage.setItem('localData', JSON.stringify(data));
    console.log(JSON.parse(localStorage.getItem('localData')));
};

// получение элемента по которому был клик на кнопке remove
const itemRemove = function (elem) {

    const item = elem.parentNode.parentNode; // получение родителя кнопки -> li
    const itemParent = item.parentNode; // получение родителя li -> ul
    const id = itemParent.id; // получение id -> ul
    const text = item.textContent; // получение текста
    itemParent.removeChild(item);

    if (id === 'todo') {
        data.todo.splice(data.todo.indexOf(text), 1);
    } else {
        data.completed.splice(data.completed.indexOf(text), 1);
    }

    dataUpdateToLocalStorage();
};

// получение элемента по которому был клик на кнопке complete
const itemComplete = function (elem) {

    const item = elem.parentNode.parentNode; // получение родителя кнопки -> li
    const itemParent = item.parentNode; // получение родителя li -> ul
    const id = itemParent.id; // получение id -> ul
    const text = item.textContent; // получение текста

    let target;

    // если id -> id.completed перемещаем в id.todo
    if (id === 'todo') {
        target = completedList;
    } else {
        target = todoList;
    }

    if (id === 'todo') {
        data.todo.splice(data.todo.indexOf(text), 1);
        data.completed.push(text);
    } else {
        data.completed.splice(data.completed.indexOf(text), 1);
        data.todo.push(text);
    }

    itemParent.removeChild(item);
    target.insertBefore(item, target.childNodes[0]);

    dataUpdateToLocalStorage();
};

// создание одного айтема
const renderItem = function (text, completed = false) {

    const item = document.createElement('li'),
        btnBlock = document.createElement('div'),
        btnRemove = document.createElement('button'),
        btnComplete = document.createElement('button');

    item.classList.add('todo-item');
    btnBlock.classList.add('todo-buttons');
    btnRemove.classList.add('todo-remove');
    btnComplete.classList.add('todo-complete');

    let list;
    if (completed) {
        list = completedList;
    } else {
        list = todoList;
    }

    btnRemove.addEventListener('click', function (event) {

        itemRemove(event.target);
    });

    btnComplete.addEventListener('click', function (event) {

        itemComplete(event.target);
    });

    item.textContent = text;
    btnBlock.appendChild(btnRemove);
    btnBlock.appendChild(btnComplete);
    item.appendChild(btnBlock);

    list.insertBefore(item, list.childNodes[0]);
};

// добавление одного айтема
const addItem = function (text) {

    renderItem(text);
    headerInput.value = '';
    data.todo.push(text);

    dataUpdateToLocalStorage();
};

// обработка события формы
form.addEventListener('submit', function (event) {

    event.preventDefault();

    if (headerInput.value !== '') {
        addItem(headerInput.value.trim());
    }
});

renderLocalStorage();