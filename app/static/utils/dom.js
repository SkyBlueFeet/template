import header from 'components/navbar.ejs';
import module from '../db/module';

import tableEjs from 'components/table.ejs';
import { table } from 'app/config';
import { formatRes, packageModuleData } from './formatData';
import sideBar from 'components/sidebar.ejs';


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
 * @param { Object } data 是否请求远程数据
 * @param { Object } config 是否请求远程数据
 */
const initTable = (data, config) => {
    let newData = formatRes(data, config, handleModuleData);
    $('#table-feild').html(tableEjs({
        config: config,
        data: newData
    }));
    return newData;
};

/**
 * 页面模块数据更新
 * @param {Object} data
 * @returns {EventHandlerNonNull} null
 */
export function moduleUpdata(data) {

    if (data === null) {
        console.error('moduleUpdata util It is no data to be param');
        return;
    }



    $(() => {
        if ($('.header').length > 0) $('.header').html(header(packageModuleData(data)));
        if ($('#sidebar').length > 0) $('#sidebar').html(sideBar(packageModuleData(data)));
        if ($('#table-feild').attr('data-private') == 'modulePage') initTable(data, table.moduleTableConfig);
    });

    return;
}

export function elementUpdate(data) {
    if (data === null) {
        console.error('elementUpdate util It is no data to be param');
        return;
    }
    $(() => {
        if ($('#table-feild').attr('data-private') == 'elementPage') initTable(data, table.elementTableConfig);
    });
    return;
}

export function roleUpdate(data) {
    if (data === null) {
        console.error('roleUpdate util It is no data to be param');
        return;
    }
    $(() => {
        if ($('#table-feild').attr('data-private') == 'rolePage') initTable(data, table.roleTableConfig);
    });
    return;
}

export function authUpdate(data) {
    if (data === null) {
        console.error('roleUpdate util It is no data to be param');
        return;
    }
    $(() => {
        if ($('#table-feild').attr('data-private') == 'authPage') initTable(data, table.authTableConfig);
    });
    return;
}

export function userUpdate(data) {
    if (data === null) {
        console.error('roleUpdate util It is no data to be param');
        return;
    }
    $(() => {
        if ($('#table-feild').attr('data-private') == 'userPage') initTable(data, table.userTableconfig);
    });
    return;
}


export default { moduleUpdata, elementUpdate, roleUpdate, authUpdate, userUpdate };