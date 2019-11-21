import tableEjs from 'layout/snippets/_table.ejs';
import { moduleTableConfig, elementTableConfig, roleTableConfig, authTableConfig, userTableconfig, template } from 'app/config';
import { formatRes, packageModuleData } from './formatData';

import _navigation from 'layout/snippets/_navigation.ejs';
import application from '.';
import crumbs from 'layout/snippets/_crumbs.ejs';

export const assignRes = {};
export let authRes = {};
export let roleRes = {};
export let moduleRes = {};
export let elementRes = {};

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
 * @param { ObjectConstructor } data 数据
 * @param { ObjectConstructor } config 配置
 */
const initTable = (data, config) => {
    let newData = formatRes(data, config, handleModuleData);
    $(() => {
        $('#admin-mount-table').html(tableEjs({
            config: config,
            data: newData
        }));

    });
    return newData;
};

/**
 * 页面模块数据更新
 * @param { Array } data
 * @returns { FunctionConstructor } null
 */
export function moduleUpdata(data, app) {

    let page = app.page;

    data.every(item => {
        assignRes[`${item['title']}#${item['id']}`] = {};
        moduleRes[item.id] = item;

        if (page.link && item.link == page.link) {
            for (let [name, value] of Object.entries(item)) {
                page[name] = value;
            }
        }
        return item;
    });

    data.every(item => {
        if (moduleRes[item.parentModuleId]) {
            item['parentModuleTitle'] = moduleRes[item.parentModuleId].title;
        } else {
            item['parentModuleTitle'] = 'root';
        }
        return item;
    });

    page.parentModuleTitle = moduleRes[page.parentModuleId].title;

    $(() => {
        if ($('#admin-mount-navigation').length > 0) $('#admin-mount-navigation').html(_navigation(packageModuleData(data)));
    });

    if (page.name == 'module') initTable(data, moduleTableConfig);
    return;
}


/**
 *
 * @param { Array } data
 * @param { FunctionConstructor } app
 */
export function elementUpdate(data, app) {
    let page = app.page;

    let eleCollection = {};

    let tempTableData = [];

    for (let item of data) {
        if (moduleRes[item.moduleId]) {
            item['moduleTitle'] = moduleRes[item.moduleId].title;
            elementRes[item.id] = item;
        }
        tempTableData.push(item);

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

                if (moduleRes[value]) {

                    let assignKey = `${moduleRes[value].title}#${value}`;

                    try {
                        let eleColVal = eleCollection[value];
                        let eleColValCont = eleColVal[item.containerId];
                        let assignVal = assignRes[`${moduleRes[value].title}#${value}`];
                        if (eleColVal && eleColValCont && assignVal[item.containerId]) {
                            if (template[type]) {
                                eleColVal[item.containerId] += template[type](item);
                            } else {
                                eleColVal[item.containerId] += template['defaultBtn'](item);
                            }

                            assignVal[item.containerId].push(item);


                        } else if (eleColVal && moduleRes[value] && assignVal) {
                            if (template[type]) {
                                eleColVal[item.containerId] = template[type](item);
                            } else {
                                eleColVal[item.containerId] = template['defaultBtn'](item);
                            }
                            assignVal[item.containerId] = [item];
                        }
                    } catch {
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
                        assignRes[assignKey] = s;
                        eleCollection[value] = t;
                    }
                }

            }
        }
    }

    if (page.name == 'element') initTable(tempTableData, elementTableConfig);
    for (let [moduleId, object] of Object.entries(eleCollection)) {

        /**
         * 如果模块ID(moduleId)与元素所属模块ID相同则将html添加到DOM中
         */

        if (page.id == moduleId) {
            $(() => {
                for (let [id, html] of Object.entries(object)) {
                    $(`#${id}`).html(html);
                }
            });
        }
    }
    return;
}

export function roleUpdate(data, app) {
    $(() => {
        let name = app.page.name;
        if (name == 'role') {
            initTable(data, roleTableConfig);
            for (let item of data) {
                roleRes[item.id] = item;
            }
        } else if (name == 'user') {
            console.log(data);
            return;
        }

    });
    return;
}

export function authUpdate(data, app) {
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
    } else if (pageName == 'user') {
        roleRes = {};
        data.forEach(item => {
            if (item.key == 'role') {
                roleRes[item.ownerId] ? roleRes[item.ownerId].push(item) : roleRes[item.ownerId] = [item];
            }
        });
    }

    return;
}

export function userUpdate(data, app) {
    if (app.page.name == 'user') initTable(data, userTableconfig);
    return;
}

/**
 *
 * @param { application } app
 */
export function otherComponents(data, app) {
    let page = app.page;

    $(() => {
        $('#admin-mount-crumbs').html(crumbs([page.parentModuleTitle, page.title]));
    });
}