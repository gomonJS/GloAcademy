'use strict';
/**
 * 
 * Плавная прокрутка до якоря на странице
 */
const clickAnchor = () => {

    let linkAnchors = document.querySelectorAll('a[href*="#"]');
    
    linkAnchors.forEach((element) => {

        element.addEventListener('click', (event) => {

            event.preventDefault();

            const idX = element.getAttribute('href').substr(1);

            document.getElementById(idX).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
};

export default clickAnchor;