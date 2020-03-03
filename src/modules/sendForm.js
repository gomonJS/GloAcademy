'use strict';
/**
 * 
 * @param {}
 * отправка данных из формы - ajax
 */
const sendForm = () => {
    
    const errorMessage = 'Что-то пошло не так',
        loadMessage = 'Загрузка...',
        successMessage = 'Сообщение отправлено, в ближайшее время мы с Вами свяжемся';

    const forms = document.querySelectorAll('form');
    
    // вывод сообщения на страницу
    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size: 22px';

    /**
     * 
     * @param {*} body 
     * @param {*} outputData 
     * @param {*} errorData 
     * 
     * функция запроса на сервер
     */
    const postData = (body) => {

        return fetch('./server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    };

    const eventFormData = (form) => {

        // обрабочик события формы
        const formData = new  FormData(form);
        
        let body = {}, flag = false;

        formData.forEach((value, key) => {

            body[key] = value;
        });

        for (let value in body) { if (body[value] !== '') {flag = true;} }
        
        if (flag) {
            
            form.appendChild(statusMessage);
            statusMessage.style.cssText = 'color: #ffffff';
            statusMessage.textContent = loadMessage;

            postData(body)
                .then((response) => {

                    if (response.status !== 200) {
                        throw new Error('Status server not 200');
                    }
                    statusMessage.textContent = successMessage;
                })
                .catch((error) => {
                    statusMessage.textContent = errorMessage;
                    console.error(error);
                });

            const timeClearData = setTimeout(() => {
                statusMessage.remove();
                form.reset();
                clearTimeout(timeClearData);
            }, 3000); 
        }
    };

    /**
     * 
     * @param {*} form
     * 
     * валидация форм
     */
    const validationForm = (form) => {

        const error = new Set();


        const init = () => {

            [...form].forEach((elem) => {

                if (elem.type === 'text') {
                    !(/^[а-яёА-ЯЁ\s\-]+$/).test(elem.value) ?
                        error.add(elem) : error.delete(elem);
                }

                if (elem.type === 'email') {
                    !(/^\w+@\w+\.\w{2,}$/).test(elem.value) ?
                        error.add(elem) : error.delete(elem);
                }

                if (elem.type === 'tel') {
                    !(/^\+?[78]([-()]*\d){10}$/).test(elem.value) ?
                        error.add(elem) : error.delete(elem);
                }

                if (elem.type === 'message') {
                    !(/^[а-яёА-ЯЁ \s\-]+$/).test(elem.value) ?
                        error.add(elem) : error.delete(elem);
                }
            });
        };
        
        init();

        form.addEventListener('change', init);

        form.addEventListener('submit', (e) => {

            e.preventDefault();
            let errorType = [];

            if (error.size === 0) {
                statusMessage.remove();
                errorType = [];
                eventFormData(form);
            } else {
                error.forEach((element) => {
                    errorType.push(element.placeholder);
                });
                statusMessage.textContent = 'Неверные данные: ' + [...errorType];
                form.appendChild(statusMessage);
            }
        });
    };

    forms.forEach(validationForm);
};

export default sendForm;