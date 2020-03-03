'use strict';
/**
 * 
 * @param {}
 * 
 * Блок Наша команда. Наведение на фото меняется картинка
 */
const hoverReplaceImage = () => {

    const command = document.getElementById('command');

    // старое занчение src картинки
    let tempImage = '';

    command.addEventListener('mouseover', (event) => {

        if (event.target.matches('.command__photo')) {
            tempImage = event.target.src;
            event.target.src = event.target.dataset.img;
        }
    });

    command.addEventListener('mouseout', (event) => {

        if (event.target.matches('.command__photo')) {
            event.target.src = tempImage;
        }
    });
};

export default hoverReplaceImage;