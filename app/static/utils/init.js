import { module as mde } from 'static/db';
import nav from 'tpl/abandon/Auth/auth';


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