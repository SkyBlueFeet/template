/* eslint-disable no-undef */
import 'static/style/app.scss';
import users from 'static/db/user';
import application from 'app/static/application';

$(() => {
    $('#signIn').click(() => {
        const user = new users();
        let input = $('.form-control');
        for (let i = 0; i < input.length; i++) {
            let thisInput = input.eq(i);
            user[thisInput.prop('id')] = thisInput.val();
        }
        application.preFetch();
    });
});