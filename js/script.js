'use strict';

let headerInput = document.querySelector('.header-input'),
    addButton = document.getElementById('add'),
    toDo = document.getElementById('todo'),
    todoItem = document.querySelector('.todo-item'),
    completed = document.getElementById('completed');


let storage = (localStorage.getItem('arr') === undefined) ? [] : JSON.parse(localStorage.getItem('arr'));


const toDoList = {

    storageArray: storage,
    arrayToDo: [],

    read () {

        let memory = localStorage.getItem('arr');
        memory = JSON.parse(memory);

        for (let i = 0; i < memory.length; i++) {
            this.storageArray[i] = memory[i];
        }
    },

    write (event) {

        event.preventDefault();

        let temp = {};

        temp.toDo = headerInput.value;
        
        if (headerInput.value !== '') {
            let i = this.storageArray.length;
            this.storageArray[i] = temp;
        }

        localStorage.setItem('arr', JSON.stringify(this.storageArray));

        headerInput.value = '';

        this.outList();
    },

    addList () {

        for (let i = 0; i < this.storageArray.length; i++) {

            this.arrayToDo[i] = this.storageArray[i];
            this.outList();
        }
    },

    outList () {

        let li = document.createElement('li'),
            div = document.createElement('div'),
            buttonRemove = document.createElement('button'),
            buttonComplete = document.createElement('button');

        li.className = 'todo-item';
        div.className = 'todo-buttons';
        buttonRemove.className = 'todo-remove';
        buttonComplete.className = 'todo-complete';
        div.prepend(buttonRemove, buttonComplete);

        for (let i = 0; i < this.arrayToDo.length; i++) {

            li.textContent = this.arrayToDo[i].toDo;
            li.append(div);
        }

        return toDo.prepend(li);
    },

    clearHeaderInput () {

        headerInput.value = '';
    },
};

addButton.addEventListener('click', toDoList.write.bind(toDoList));

toDoList.addList();