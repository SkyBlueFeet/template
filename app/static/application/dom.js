import tableEjs from 'layout/snippets/_table.ejs';
import { table, adminModalSwitch, defaultBtn } from 'app/config';
import { formatRes, packageModuleData } from './formatData';

import _navigation from 'layout/snippets/_navigation.ejs';
import application from '.';
import crumbs from 'layout/snippets/_crumbs.ejs';

const handleModuleData = (config, ele) => {
    let item1 = [];
    config.forEach(value => {
        if (value.key == 'id') {
            item1.push(`<label class="checkblock"><input id="${ele['id']}" type="checkbox"/><i class="s-icon__checkbox"></i></label>`);
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

    if (data === null) {
        console.error('moduleUpdata util It is no data to be param');
        return;
    }

    $(() => {
        if ($('#admin-mount-navigation').length > 0) $('#admin-mount-navigation').html(_navigation(packageModuleData(data)));
        if (app.page.name == 'module') initTable(data, table.moduleTableConfig);
    });

    return;
}
/**
 *
 * @param { Array } data
 * @param { FunctionConstructor } app
 */
export function elementUpdate(data, app) {
    if (data === null) {
        console.error('elementUpdate util It is no data to be param');
        return;
    }
    let page = app.page;
    $(() => {
        if (page.name == 'element') initTable(data, table.elementTableConfig);
        let eleCollection = {};

        /**
         * 分组:第一步
         * 将所有数据按页面分成若干个若干个键值对
         * key=>Array
         */

        console.log(data);
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
                    if (eleCollection[value] && eleCollection[value][item.containerId]) {
                        if (adminModalSwitch[type]) {
                            eleCollection[value][item.containerId] += adminModalSwitch[type](item);
                        } else {
                            eleCollection[value][item.containerId] += defaultBtn(item);
                        }
                    } else if (eleCollection[value]) {
                        if (adminModalSwitch[type]) {
                            eleCollection[value][item.containerId] = adminModalSwitch[type](item);
                        } else {
                            eleCollection[value][item.containerId] = defaultBtn(item);
                        }
                    } else {
                        /**
                         * @type { Object } string => string
                         */
                        let t = {};

                        if (adminModalSwitch[type]) {
                            t[item.containerId] = adminModalSwitch[type](item);
                        } else {
                            t[item.containerId] = defaultBtn(item);
                        }
                        eleCollection[value] = t;
                    }
                }
            }
        });
        console.log(eleCollection);
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
    if (data === null) {
        console.error('roleUpdate util It is no data to be param');
        return;
    }
    $(() => {
        if (app.page.name == 'role') initTable(data, table.roleTableConfig);
    });
    return;
}

export function authUpdate(data, app) {
    if (data === null) {
        console.error('roleUpdate util It is no data to be param');
        return;
    }
    $(() => {
        if (app.page.name == 'auth') initTable(data, table.authTableConfig);
    });
    return;
}

export function userUpdate(data, app) {
    if (data === null) {
        console.error('roleUpdate util It is no data to be param');
        return;
    }
    $(() => {
        if (app.page.name == 'user') initTable(data, table.userTableconfig);
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

export default { moduleUpdata, elementUpdate, roleUpdate, authUpdate, userUpdate, otherComponents };