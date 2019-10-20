import mde from 'static/db/module';
import nav from 'tpl/Auth/auth';

import { getStorage, setStorage, removeStorage, getHashCode } from 'static/utils/utils';
import header from 'components/header.ejs';
import Storage from './cryptStorage';
const localModuleData = window.localStorage.getItem('moduleData');


export const initModuleDb = () => {
    nav.forEach(navModule => {
        console.log(navModule);
        new Promise((resolve, reject) => {
            let mde = new mde();
            Object.keys(navModule).forEach(key => {
                mde[key] = navModule[key];
            });
            mde.create().then(res => {
                if (res['statusKey'] === 666) {
                    console.log(`模块${navModule.title}添加成功!`);
                }
                resolve(res);
                reject(navModule.title);
            });
        }).then(res => {
            navModule.submenu.forEach(secModule => {
                let childMde = new mde();
                Object.keys(secModule).forEach(key => {
                    if (key === 'parentModuleId') childMde['parentModuleId'] = res['data']['id'];
                    else childMde[key] = secModule[key];
                });
                childMde.create().then(res => {
                    if (res['statusKey'] === 666) {
                        console.log(`模块${secModule.title}添加成功!`);
                    }
                });
            });
        });
    });
};