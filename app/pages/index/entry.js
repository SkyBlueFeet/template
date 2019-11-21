/* eslint-disable no-undef */
import 'static/style/app.scss';
import users from 'app/static/apis/db/user';
import application from 'app/static/application';
import { loginValidate } from 'app/static/apis';

$(() => {
    import(
        /* webpackPrefetch:true */
        /* webpackPreload: true */
        /* webpackChunkName: 'state' */
        'static/script'
    );
    window.sessionStorage.clear();
    $('#signIn').click(() => {
        const user = new users();
        let input = $('.form-control');
        for (let i = 0; i < input.length; i++) {
            let thisInput = input.eq(i);
            if (thisInput.val().length == 0) {
                alert('输入不允许为空值!');
                return;
            } else {
                user[thisInput.prop('id')] = thisInput.val();
            }
        }
        loginValidate(user).then(res => {
            console.log(res);
        });
    });
});