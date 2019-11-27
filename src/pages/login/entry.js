import '@core/style/app.scss';
import '@src/style/page/login.scss';

import { user, loginValidate } from '@core/script/apis';
import { bootstrap } from '@core/script/utils';

window.sessionStorage.clear();

$(() => {
    $('#signIn').click(() => {
        const users = new user();
        let input = $('.form-control');
        for (let i = 0; i < input.length; i++) {
            let thisInput = input.eq(i);
            if (thisInput.val().length == 0) {
                alert('输入不允许为空值!');
                return;
            } else {
                users[thisInput.prop('id')] = thisInput.val();
            }
        }
        loginValidate(users);
    });
});

var $input = $('.form-control');

function init($this) {

    $this.on('focus blur', function(e) {
        $(this).parents('.form-group').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
    }).trigger('blur');
}

if ($input.length) {
    init($input);
}

bootstrap();