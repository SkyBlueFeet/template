import 'static/style/common/custom.scss';

import 'static/style/common/layout.scss';
import 'static/style/page/login.scss';
import 'bootstrap';
import users from 'app/static/db/user';


$(() => {
    $('#signIn').click(() => {
        const user = new users();
        let input = $('.form-control');
        for (let i = 0; i < input.length; i++) {
            let thisInput = input.eq(i);
            user[thisInput.prop('id')] = thisInput.val();
        }
        user.login().then(data => {
            console.log(data);
        });
    });
});