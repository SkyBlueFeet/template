/**
 *
 * @param { Array } data 需要格式化的数据
 */
export const packageModuleData = data => {
    const nAuth = [],
        stageArr = [];
    if (!Array.isArray(data)) {
        console.error('data参数应该是数组');
        return data;
    }
    data.forEach((nav, index, data) => {
        if (nav['parentModuleId'] === null) {
            let a = {};
            Object.keys(nav).forEach(key => {
                a[key] = nav[key];
            });
            a['submenu'] = [];
            nAuth.push(a);
        } else {
            let a = {};
            Object.keys(nav).forEach(key => {
                a[key] = nav[key];
            });
            stageArr.push(a);
        }
    });
    stageArr.forEach(sub => {
        nAuth.forEach(nav => {
            if (sub['parentModuleId'] === nav['id']) {
                nav['submenu'].push(sub);
            }
        });
    });
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