import 'app/static/header.scss';
import 'app/static/iconfont.js';

$(() => {
    $('.nav__content').click(() => {
        $.get('/api', data => console.log(JSON.parse(data)));
    });

});