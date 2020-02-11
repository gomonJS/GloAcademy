'use strict';

let headerInput = document.querySelector('.header-input'),
    addButton = document.getElementById('add'),
    toDo = document.getElementById('todo'),
    todoItem = document.querySelector('.todo-item'),
    completed = document.getElementById('completed');


function outList (value) {

    let li = document.createElement('li'),
        div = document.createElement('div'),
        buttonRemove = document.createElement('button'),
        buttonComplete = document.createElement('button');

    li.className = 'todo-item';
    div.className = 'todo-buttons';
    buttonRemove.className = 'todo-remove';
    buttonComplete.className = 'todo-complete';
    div.prepend(buttonRemove, buttonComplete);

    li.textContent = value;
    li.append(div);

    return li;
}

function addDo (event) {

    event.preventDefault();
    
    if (headerInput.value !== '') {
        let itemList = outList(headerInput.value);
        toDo.appendChild(itemList);

        eventDoEvents(itemList, completeDo);
        
        headerInput.value = '';
    }
}

addButton.addEventListener('click', addDo);

function removeDo () {
    
    let listItem = this.parentNode;
    let li = listItem.parentNode;
    let ul = li.parentNode;
    ul.removeChild(li);
}

function completeDo () {

    let listItem = this.parentNode;
    let li = listItem.parentNode;
    let ul = li.parentNode;
    console.log(ul);
}

function eventDoEvents (listItem, checkEvent) {

    let complete = listItem.querySelector('.todo-complete'),
        remove = listItem.querySelector('.todo-remove');

    complete.addEventListener('click', checkEvent);
    remove.addEventListener('click', removeDo);
}