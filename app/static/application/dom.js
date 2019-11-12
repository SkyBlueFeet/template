import tableEjs from 'layout/snippets/_table.ejs';
import { moduleTableConfig, elementTableConfig, roleTableConfig, authTableConfig, userTableconfig, template } from 'app/config';
import { formatRes, packageModuleData } from './formatData';

import _navigation from 'layout/snippets/_navigation.ejs';
import application from '.';
import crumbs from 'layout/snippets/_crumbs.ejs';

export const assignRes = {};
export let authRes = {};

const handleModuleData = (config, ele) => {
    let item1 = [];
    config.forEach(value => {
        if (value.key == 'id') {
            item1.push(`<div class="custom-control custom-control-alternative custom-checkbox"><input id="${ele.id}" class="custom-control-input" type="checkbox"><label class="custom-control-label" for="${ele.id}"><span class="text-muted">&nbsp;</span></label></div>`);
        }
        else {
            item1.push(ele[value.key]);
        }
    });
    return item1;
};


/**
 * table初始化
 * @param { ObjectConstructor } data 是否请求远程数据
 * @param { ObjectConstructor } config 是否请求远程数据
 */
const initTable = (data, config) => {
    let newData = formatRes(data, config, handleModuleData);
    $('#admin-mount-table').html(tableEjs({
        config: config,
        data: newData
    }));
    return newData;
};

/**
 * 页面模块数据更新
 * @param { Array } data
 * @returns { FunctionConstructor } null
 */
export function moduleUpdata(data, app) {

    $(() => {
        if ($('#admin-mount-navigation').length > 0) $('#admin-mount-navigation').html(_navigation(packageModuleData(data)));
        if (app.page.name == 'module') initTable(data, moduleTableConfig);
    });

    data.forEach(item => {
        assignRes[`${item['title']}#${item['id']}`] = {};
    });

    return;
}
/**
 *
 * @param { Array } data
 * @param { FunctionConstructor } app
 */
export function elementUpdate(data, app) {
    let page = app.page;
    $(() => {
        if (page.name == 'element') initTable(data, elementTableConfig);
        let eleCollection = {};

        data.forEach(item => {
            for (let [key, value] of Object.entries(item)) {

                /**
                 * 元素模板类型
                 * @type { String }
                 */
                let type = item.template;
                if (key == 'moduleId') {

                    /**
                     * 第一步按页面分成若干个键值对
                     * moduleId => Object(containerId => htmlString)
                     */

                    if (eleCollection[value] && eleCollection[value][item.containerId] && assignRes[`${item['moduleTitle']}#${value}`][item.containerId]) {
                        if (template[type]) {
                            eleCollection[value][item.containerId] += template[type](item);
                        } else {
                            eleCollection[value][item.containerId] += template['defaultBtn'](item);
                        }
                        assignRes[`${item['moduleTitle']}#${value}`][item.containerId].push(item);
                    } else if (eleCollection[value] && assignRes[`${item['moduleTitle']}#${value}`]) {
                        if (template[type]) {
                            eleCollection[value][item.containerId] = template[type](item);
                        } else {
                            eleCollection[value][item.containerId] = template['defaultBtn'](item);
                        }
                        assignRes[`${item['moduleTitle']}#${value}`][item.containerId] = [item];
                    } else {
                        /**
                         * @type { Object } string => string
                         */
                        let t = {},
                            s = {};


                        if (template[type]) {
                            t[item.containerId] = template[type](item);
                        } else {
                            t[item.containerId] = template['defaultBtn'](item);
                        }
                        s[item.containerId] = [item];
                        assignRes[`${item['moduleTitle']}#${value}`] = s;
                        eleCollection[value] = t;
                    }
                }
            }
        });

        for (let [moduleId, object] of Object.entries(eleCollection)) {

            /**
             * 如果模块ID(moduleId)与元素所属模块ID相同则将html添加到DOM中
             */

            if (page.id == moduleId) {
                for (let [id, html] of Object.entries(object)) {
                    $(`#${id}`).html(html);
                }

            }
        }
    });
    return;
}

export function roleUpdate(data, app) {
    $(() => {
        if (app.page.name == 'role') initTable(data, roleTableConfig);
    });
    return;
}

export function authUpdate(data, app) {
    $(() => {
        let pageName = app.page.name;
        if (pageName == 'auth') {
            initTable(data, authTableConfig);
        } else if (pageName == 'role') {
            authRes = {};
            data.forEach(item => {
                if (item.key == 'module' || item.key == 'element') {
                    authRes[item.ownerId] ? authRes[item.ownerId].push(item) : authRes[item.ownerId] = [item];
                }
            });

        }
    });


    return;
}

export function userUpdate(data, app) {
    $(() => {
        if (app.page.name == 'user') initTable(data, userTableconfig);
    });
    return;
}

/**
 *
 * @param { application } app
 */
export function otherComponents(app) {
    let page = app.page;
    $(() => {
        $('#admin-mount-crumbs').html(crumbs([page.parentModuleTitle, page.title]));
    });
}



// export default { moduleUpdata, elementUpdate, roleUpdate, authUpdate, userUpdate, otherComponents };