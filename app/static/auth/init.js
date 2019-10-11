import dbfeild from 'tpl/Auth/dbfeild';
import header from 'components/header.ejs';
import { setStorage, getStorage } from '../web/utils.js';

// console.log(window.localStorage);

const localHeader = getStorage('header');
// import('utils/init').then(({ initModuleDb }) => {
//     initModuleDb();
// });


const packaging = data => {
    const nAuth = [],
        stageArr = [];
    data.forEach((nav, index, data) => {
        if (nav['parentModuleId'] === null) {
            nAuth.push({
                id: nav['id'],
                title: nav['title'],
                parentModuleId: nav['parentModuleId'],
                submenu: []
            });
        } else {
            stageArr.push({
                id: nav['id'],
                title: nav['title'],
                parentModuleId: nav['parentModuleId'],
                submenu: []
            });
        }
    });
    stageArr.forEach(sub => {
        nAuth.forEach(nav => {
            if (sub['parentModuleId'] === nav['id']) {
                nav['submenu'].push(sub);
            }
        });
    });
    return nAuth;
};


$(() => {
    const createHeader = data => {
        let headerEjs = `<header class="navbasic nav">
    <ul class="navbasic nav__content">`;
        data.forEach(item => {
            headerEjs += `<li class="navbasic nav__item">
            <div class="navbasic nav__item--menutitle">
                <span>${item.title}</span>
                <svg class="pointicon drop-down-icon">
                    <use xlink:href="#icon-bottom"></use>
                </svg>
            </div>
            <ul class="nav__item--submenu">`;
            item.submenu.forEach(subtitle => {
                headerEjs += `<li class="nav__item--submenu-title">${subtitle.title}</li>`;
            });
            headerEjs += '</ul></li>';
        });
        headerEjs += '</header>';
        return headerEjs;
    };

    if (localHeader !== null) {
        $('.header').html(localHeader);
    } else {
        const modules = new dbfeild.module();
        modules.list().then(res => {
            if (res['statusKey'] === 666) {
                let resHeader = header({ data: packaging(res['data']) });
                $('.header').html(resHeader);
                if (res['data'].length > 0) {
                    setStorage('header', resHeader);
                    setStorage('headerData', res['data']);
                } else {
                    throw new Error('请求数据为0,请刷新浏览器重新请求');
                }
            } else {
                throw new Error(res['message']);
            }
        }).catch(err => {
            throw new Error(err);
        });
    }
});