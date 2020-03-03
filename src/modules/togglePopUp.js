'use strict';
/**
 * Модальное окно
 */
const togglePopUp = () => {

    const popup = document.querySelector('.popup'),
        popupBtn = document.querySelectorAll('.popup-btn');

    const screenWidth = window.screen.width;

    let idShow, count = 0;


    const fadeShow = () => {
        
        count++;
        popup.style.opacity = `${count}%`;

        if (count < 100) {
            idShow = setTimeout(fadeShow, 0.1);
        } else {
            clearTimeout(idShow);
            count = 0;
        }
    };

    popupBtn.forEach((element) => {

        element.addEventListener('click', () => {

            popup.style.display = 'flex';

            if (screenWidth > 768) {

                fadeShow();
            } else {
                popup.style.opacity = 1;
            }
        });
    });

    popup.addEventListener('click', (event) => {

        let target = event.target;

        if (target.classList.contains('popup-close')) {
            popup.style.display = 'none';
            popup.style.opacity = '0';
        } else {
            target = target.closest('.popup-content');
        
            if (!target) {
                popup.style.display = 'none';
                popup.style.opacity = '0';
            }
        }
    });
};

export default togglePopUp;