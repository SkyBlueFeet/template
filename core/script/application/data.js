import { template } from '@core/config';
import { packageModuleData } from './format';

export const assignRes = {};
export let authRes = {},
    roleRes = {},
    moduleRes = {},
    elementRes = {},

    treeStructure = {},
    eleTableData = [],
    eleCollection = {},

    moduleData = [],
    roleData = [],
    authData = [],
    userData = [],
    elementData = [];



/**
 * 页面模块数据更新
 * @param { Array } data
 * @param { Function } app
 */
export function moduleFormat(data, app) {
    let page = app.$page;

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

    treeStructure = packageModuleData(data);

    data.every(item => {
        if (moduleRes[item.parentModuleId]) {
            item['parentModuleTitle'] = moduleRes[item.parentModuleId].title;
        } else {
            item['parentModuleTitle'] = 'root';
        }
        return item;
    });

    page.parentModuleTitle = moduleRes[page.parentModuleId].title;

    moduleData = data;
    return;
}


/**
 *
 * @param { Array } data
 * @param { Function } app
 */
export function elementFormat(data, app) {

    for (let item of data) {
        if (moduleRes[item.moduleId]) {
            item['moduleTitle'] = moduleRes[item.moduleId].title;
            elementRes[item.id] = item;
        }
        eleTableData.push(item);

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
    elementData = data;
    return;
}


/**
 * @param { Array } data
 * @param { Function } app
 */
export function roleFormat(data, app) {
    $(() => {
        let name = app.$page.name;
        if (name == 'role') {
            for (let item of data) {
                roleRes[item.id] = item;
            }
        } else if (name == 'user') {
            console.log(data);
            return;
        }

    });
    roleData = data;
    return;
}


/**
 * @param { Array } data
 * @param { Function } app
 */
export function authFormat(data, app) {
    let pageName = app.$page.name;
    if (pageName == 'role') {
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
    authData = data;

    return;
}


/**
 * @param { Array } data
 * @param { Function } app
 */
export function userFormat(data, app) {
    userData = data;
    return;
}

/**
 * @param { Array } data
 * @param { Function } app
 */
export function otherComponents(data, app) {
    return;
}