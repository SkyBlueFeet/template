import { template } from '@core/config';

export let authRes = {},
    roleRes = {},
    moduleRes = {},
    elementRes = {},
    userRes = {},

    treeStructure = {},
    $EleHtmlMap = new Map(),
    $EleHtmlArray = [];



/**
 * 页面模块数据更新
 * @param { Array } data
 * @param { Function } app
 */
export function moduleFormat(data, app) {
    let page = app.$page;

    data.every(item => {

        moduleRes[item.id] = item;

        if (page.link && item.link == page.link) {
            for (let [name, value] of Object.entries(item)) {
                page[name] = value;
            }
        }
        return item;
    });

    try {
        page.parentModuleTitle = moduleRes[page.parentModuleId].title;
    } catch (error) {
        console.error(error);
    }

    return data;
}



/**
 *
 * @param { Array } data
 * @param { Function } app
 */
export function elementFormat(data, app) {
    $EleHtmlMap = new Map();

    for (let item of data) {
        if (app.$page.id === item.moduleId) {
            item.template ? item.template : item.template = 'defaultBtn';
            if ($EleHtmlMap.has(item.containerId)) {
                let newStr = $EleHtmlMap.get(item.containerId) + template[item.template](item);
                $EleHtmlMap.set(item.containerId, newStr);
            } else {
                $EleHtmlMap.set(item.containerId, template[item.template](item));
            }
        }

    }

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

    return;
}


/**
 * @param { Array } data
 * @param { Function } app
 */
export function authFormat(data, app) {

    return;
}


/**
 * @param { Array } data
 * @param { Function } app
 */
export function userFormat(data, app) {

    return;
}




/**
 * @param { Array } data
 * @param { Function } app
 */
export function otherComponents(data, app) {
    return;
}

/**
 * module页面Table数据格式化
 * @param { Array } data
 * @param { Function } app
 */
export function moduleTableFormat(data) {

    data.every(item => {

        moduleRes[item.id] = item;
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

    return data;
}



/**
 * element页面Table数据格式化
 * @param { Array } data
 * @param { Function } app
 */
export function elementTableFormat(data) {

    for (let item of data) {
        elementRes[item.id] = item;
    }

    for (let item of data) {
        if (moduleRes[item.moduleId]) {
            item['moduleTitle'] = moduleRes[item.moduleId].title;
        }
    }

    return data;
}

/**
 * role页面Table数据格式化
 * @param { Array } data
 * @param { Function } app
 */
export function roleTableFormat(data, app) {

    for (let item of data) {
        roleRes[item.id] = item;
    }
    for (let item of data) {
        if (item.createUserId == app.$user.id) {
            item.createUserId = app.$user.userName;
        }

    }

    return data;
}

/**
 * user页面Table数据格式化
 * @param { Array } data
 * @param { Function } app
 */
export function userTableFormat(data, app) {

    for (let item of data) {
        userRes[item.id] = item;
    }

    // for (let item of data) {
    //     if (item.createUserId == app.$user.id) {
    //         item.createUserId = app.$user.userName;
    //     }

    // }

    return data;
}

/**
 * authRes
 * @param { Array } data
 * @param { Function } app
 */
export function authTableFormat(data) {
    authRes = {};

    for (let item of data) {
        authRes[item.ownerId] ? authRes[item.ownerId].push(item) : authRes[item.ownerId] = [item];
    }

    return data;
}