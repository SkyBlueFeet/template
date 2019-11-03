import application from '.';


/**
 * 格式化模块数组并将当前模块信息挂载到Application对象上
 * @param { Array } data 需要格式化的数据
 */
export const packageModuleData = (data) => {
    let active = application.page.link;
    const nAuth = [],
        stageArr = [];
    if (!Array.isArray(data)) {
        console.error('data参数应该是数组');
        return data;
    }
    data.forEach((nav, index, data) => {
        if (nav.parentModuleId == 'root') {
            let a = {};
            for (let [key, value] of Object.entries(nav)) {
                a[key] = value;
            }
            a.submenu = [];
            nAuth.push(a);
        } else {
            let a = {};
            for (let [key, value] of Object.entries(nav)) {
                a[key] = value;
            }
            stageArr.push(a);
        }
    });
    stageArr.forEach((sub, j, _arr) => {
        nAuth.forEach((nav, i, $arr) => {
            if (sub.parentModuleId === nav.id) {
                if (!active) console.error('page.link is no config');
                if (sub.link == active) {
                    application.page.id=sub.id;
                    application.page.parentModuleId = sub.parentModuleId;
                    application.page.title = sub.title;
                    application.page.parentModuleTitle = sub.parentModuleTitle;
                    _arr[j].active = true;
                    $arr[i].active = true;
                }
                nav.submenu.push(sub);
            }
        });
    });
    console.log(application.page);
    return nAuth;
};

/**
 * 将数组格式化成相应格式
 * @param { Array } data  数据
 * @param { Array } type  格式
 * @param { Function } callback   格式化自定义函数
 */
export const formatRes = (data, type, callback) => {
    // console.log(data, type);
    let tableData = [];
    let tableMde = type;
    if (!Array.isArray(type) || !Array.isArray(data)) {
        console.error('data和type参数应该是数组');
        return data;
    } else if (typeof callback == 'function') {
        data.forEach(ele => {
            tableData.push(callback(type, ele));
        });
    } else {
        data.forEach(ele => {
            let item1 = [];
            tableMde.forEach(value => {
                item1.push(ele[value.key] || '');
            });
            tableData.push(item1);
        });
    }
    return tableData;
};