import '../../static/normalize.css';
import '../../static/header.scss';
import '../../static/iconfont.js';

// import 'static/layout/iconfont.css';
// import 'animate.css';
const [us, uus, ts] = [452,
    93,
    866
];
const Obj = { us, uus, ts };
$(() => {
    console.log(Obj);
    $('.content').click(() => {
        $.ajax({
            method: 'get',
            url: '../../../Auth/auth.json',
        }).done((data) => console.log(data));
    });

});