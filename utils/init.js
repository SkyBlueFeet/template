import dbfeild from 'tpl/Auth/dbfeild';
import nav from 'tpl/Auth/auth';


const users = dbfeild.users;
const auths = dbfeild.auths;
const roles = dbfeild.roles;
const module = dbfeild.module;
const element = dbfeild.element;


export const initModuleDb = () => {
    nav.forEach(navModule => {
        console.log(navModule);
        new Promise((resolve, reject) => {
            let mde = new module();
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
                let childMde = new module();
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