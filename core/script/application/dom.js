import { eleTableData, eleCollection, moduleData, roleData, userData } from './data';
import { formatRes, packageModuleData, handleModuleData } from './format';
import { moduleTableConfig, elementTableConfig, roleTableConfig, userTableconfig } from '@core/config';

import tableEjs from '@core/layout/snippets/_table.ejs';
import _navigation from '@core/layout/snippets/_navigation.ejs';
import crumbs from '@core/layout/snippets/_crumbs.ejs';

/**
 * table初始化方法
 * @param { Array } data 数据
 * @param { ObjectConstructor } config 配置
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
 * 通过JQuery更新DOM
 * 为了防止修改一项数据而把页面所有节点全部更新,加入@param { String } type
 * @param { Object } page 当前页面信息
 * @param { String } type module || element || role || auth || user
 */
export default function updateDom(page, type) {

    $(() => {

        if (type == 'element') {

            for (let [moduleId, object] of Object.entries(eleCollection)) {

                // 如果模块ID(moduleId)与元素所属模块ID相同则将html添加到DOM中

                if (page.id == moduleId) {
                    $(() => {
                        for (let [id, html] of Object.entries(object)) {
                            $(`#${id}`).html(html);
                        }
                    });
                }
            }

            if (page.name == 'element') initTable(eleTableData, elementTableConfig);

        } else if (type == 'module') {

            $('#admin-mount-crumbs').html(crumbs([page.parentModuleTitle, page.title]));

            $('#admin-mount-navigation').html(_navigation(packageModuleData(moduleData)));

            if (page.name == 'module') initTable(moduleData, moduleTableConfig);

        } else if (type == 'role') {

            if (page.name == 'role') initTable(roleData, roleTableConfig);

        } else if (type == 'user') {

            if (page.name == 'user') initTable(userData, userTableconfig);

        }
    });

}