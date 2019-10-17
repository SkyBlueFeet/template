import mde from 'static/db/module';
import nav from 'tpl/Auth/auth';

import { packageModuleData, getStorage, setStorage, removeStorage } from 'static/utils/utils';
import header from 'components/header.ejs';
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

const moduleToTable = function(moduleArray) {
    let tHtml = '';

    moduleArray.forEach(modules => {
        tHtml += `<tr>
                <td>
                    <label class="checkblock">
                        <input type="checkbox"/>
                        <i class="s-icon__checkbox"></i>
                    </label>
                </td>
                <td id='${modules.id}'>${modules.title ||''}</td>
                <td>${modules.parentModuleId || ''}</td>
                <td>${modules.key || ''}</td>
                <td>${modules.order || ''}</td>
                <td>${modules.link || ''}</td>
                <td>${modules.remark || ''}</td>
            </tr>`;

        if (modules['submenu'].length > 0) {
            modules['submenu'].forEach(sub => {
                tHtml += `<tr>
                        <td>
                            <label class="checkblock">
                                <input type="checkbox"/>
                                <i class="s-icon__checkbox"></i>
                            </label>
                        </td>
                        <td id='${sub.id}'> ${sub.title || ''}</td>
                        <td id='${sub.parentModuleId}'> ${modules.title || ''}</td>
                        <td>${sub.key || ''}</td>
                        <td>${sub.order || ''}</td>
                        <td>${sub.link || ''}</td>
                        <td>${sub.remark || ''}</td>
                    </tr>`;
            });
        }
    });
    return tHtml;
};

/**
 * table初始化
 * @param { Object } initData 是否请求远程数据
 */
export const initTable = (data) => {
    if (!data) {
        let md = new mde();
        md.list().then(res => {
            if (res['statusKey'] === 666) {
                let data = res['data'];
                let moduleArray = packageModuleData(data);
                $('tbody').html(moduleToTable(moduleArray));
            }
        });
    } else {
        $('tbody').html(moduleToTable(packageModuleData(data)));
    }
};


export const initHeader = (data) => {
    if (!data) {
        let md = new mde();
        md.list().then(res => {
            if (res['statusKey'] === 666) {
                let data = res['data'];
                $('.header').html(header(packageModuleData(data)));
            }
        });
    } else {
        $('.header').html(header(packageModuleData(data)));
    }
};
/**
 * module页面初始化数据
 * @param { Object } data
 */
export async function initModule(data) {
    try {
        if (!data) {
            let md = new mde();
            let res = await md.list();
            initHeader(res['data']);
            res = await initTable(res['data']);
            return res;
        } else {
            initHeader(data);
            initTable(data);
        }

    } catch (error) {
        throw new Error(error);
    }

}