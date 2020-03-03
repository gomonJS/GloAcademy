'use strict';
/**
 * 
 * Картинки наша команда, дабавление текста в атрибут alt
 */
const addTextAltImage = () => {

    const command = document.getElementById('command'),
        img = [...command.querySelectorAll('.command__photo')],
        description = command.querySelectorAll('.description');

    for (let item in img) {
        
        if (!img[item].alt) {
            img[item].alt = description[item].textContent;
        }
    }
};

export default addTextAltImage;