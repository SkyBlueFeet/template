import { $EleHtmlMap, elementTableFormat, moduleTableFormat, moduleRes, elementRes, userTableFormat, authTableFormat, authRes, roleTableFormat } from './data';
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
 * 为了防止修改一项数据而把页面所有节点全部更新,加入@param { String } type,表示更新信息类型
 * @param { Object } page 当前页面信息
 * @param { String } type module || element || role || auth || user
 */
export default function updateDom(that, type) {

    let $page = that.$page,
        $user = that.$user;

    $(() => {

        if (type == 'element') {

            for (let [moduleId, str] of $EleHtmlMap) {
                $(() => {
                    if ($(`#${moduleId}`).length > 0) {
                        $(`#${moduleId}`).html(str);
                    }
                });
            }
            // if ($page.name == 'element') initTable(that.getRes('element'), elementTableConfig);

        } else if (type == 'module') {

            $('#admin-mount-crumbs').html(crumbs([$page.parentModuleTitle, $page.title]));

            $('#admin-mount-navigation').html(_navigation(packageModuleData(that.getRes('module'))));

        } else if (type == 'user') {

            $('#admin-mount-userName').text($user.userName);
        }
    });

}

export function updataTable(that, type, data) {
    let $page = that.$page;
    if ($page.name == type) {
        $(() => {
            if (type == 'element') {
                moduleTableFormat(that.management.module);
                initTable(elementTableFormat(data), elementTableConfig);
            } else if (type == 'module') {
                initTable(moduleTableFormat(data), moduleTableConfig);
            } else if (type == 'role') {
                moduleTableFormat(that.management.module);
                elementTableFormat(that.management.element);
                initTable(roleTableFormat(data, that), roleTableConfig);
            } else if (type == 'user') {
                initTable(userTableFormat(data, that), userTableconfig);
            }
        });
    } else if (type == 'auth') {
        authTableFormat(that.management.auth);
    }


}