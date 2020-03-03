'use strict';
/**
 * 
 * Табы услуг
 */
const tabs = () => {
    
    const
        // родитель табов 
        serviceHeader = document.querySelector('.service-header'),
        // коллекция табов
        tab = serviceHeader.querySelectorAll('.service-header-tab'),
        // коллеция контента для табов
        tabContent = document.querySelectorAll('.service-tab');

    const toggleTabContent = (index) => {

        for (let i = 0; i < tabContent.length; i++) {

            if (index === i) {
                tab[i].classList.add('active');
                tabContent[i].classList.remove('d-none');
            } else {
                tab[i].classList.remove('active');
                tabContent[i].classList.add('d-none');
            }
        }
    };

    serviceHeader.addEventListener('click', (event) => {

        let target = event.target;
        target = target.closest('.service-header-tab');

        if (target) {
            
            tab.forEach((element, i) => {

                if (element === target) {
                    toggleTabContent(i);
                }
            });
        }
    });
};

export default tabs;