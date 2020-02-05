'use strict';

let books = document.querySelectorAll('.books'),
    book = document.querySelectorAll('.book'),
    adv = document.querySelector('.adv'),
    body = document.querySelector('body');

adv.style.display = 'none';
body.style.backgroundImage = 'url(./image/adv.jpg)';

function replaceHtmlDom(parent, child) {

    // удаление всех блоков внутри родителя
    for (let i = 0; i < child.length; i++) {

        parent[0].removeChild(child[i]);
    }
    
    const headCard = [];
    // массив текста ссылок
    child.forEach ((element) => {

        headCard.push(element.getElementsByTagName('a')[0].textContent.trim());
    });
    
    headCard.sort();
    
    const docElements = [];

    for (let i = 0; i < headCard.length; i++) {
        
        docElements.push(child[i]);
    }
    
    let temp = [];
    // массив отсортированных блоков
    for (let i = 0; i < child.length; i++) {
        for (let k = 0; k < child.length; k++) {
            if (headCard[i] === child[k].getElementsByTagName('a')[0].text.trim()) {
                temp.push(child[k]);
            }
        }
    }
    
    // вывод отсортированных блоков
    for (let i = 0; i < temp.length; i++) {
        parent[0].appendChild(temp[i]);
    }
}

replaceHtmlDom(books, book);

let bookNew = document.querySelectorAll('.book');

for (let i = 0; i < bookNew.length; i++) {

    if (bookNew[i].getElementsByTagName('a')[0].text.trim() === 'Книга 3. this и Пропопипы Объектов') {
        bookNew[i].getElementsByTagName('a')[0].text = 'Книга 3. this и Прототипы Объектов';
        break;
    }
}

let listOne = bookNew[1].getElementsByTagName('ul'),
    liOne = bookNew[1].querySelectorAll('li');
listOne[0].insertBefore(liOne[6], liOne[4]);
listOne[0].insertBefore(liOne[8], liOne[4]);

let listFoor = bookNew[4].getElementsByTagName('ul'),
    liFoor = bookNew[4].querySelectorAll('li');
listFoor[0].insertBefore(liFoor[9], liFoor[2]);
listFoor[0].insertBefore(liFoor[3], liFoor[2]);
listFoor[0].insertBefore(liFoor[4], liFoor[2]);

let listFive = bookNew[5].getElementsByTagName('ul'),
    liFive = bookNew[5].querySelectorAll('li'),
    addLi = document.createElement('li');
addLi.textContent = 'Глава 8: За пределами ES6';
listFive[0].appendChild(addLi);
listFive[0].insertBefore(liFive[9], liFive[10]);