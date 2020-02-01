'use strict';


const users = [
    {
        name: 'Alex',
        login: 'alex',
        password: '1234',
    },
    {
        name: 'Den',
        login: 'den',
        password: '1234',
    },
    {
        name: 'Sam',
        login: 'sam',
        password: '1234',
    },
    {
        name: 'Dog',
        login: 'dog',
        password: '1234',
    }
];


const authUser = {

    name: '',
    login: '',
    pass: '',
    success: false,
    db: users,
    errorAut: '',
    start: function () {

        let askLogin = prompt('Введите свой логин'),
            askPassword = prompt('Введите пороль');

        authUser.login = askLogin;
        authUser.pass = askPassword;
        
    },
    userDb: function () {

        for (let i = 0; i < authUser.db.length; i++) {
            for (let key in authUser.db[i]) {

                if (authUser.login === authUser.db[i].login && authUser.pass === authUser.db[i].password) {
                    authUser.name = authUser.db[i].name;
                    authUser.success = true;
                    return;
                } else {
                    authUser.errorAut = 'Ошибка авторизации!';
                }
            }
        }
    },
    checkup: function () {

        if (authUser.success) {
            alert('Здравствуйте ' + authUser.name);
        } else {
            alert(authUser.errorAut);
        }
    }
};

authUser.start();
authUser.userDb();
authUser.checkup();
