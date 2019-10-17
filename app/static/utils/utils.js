import cookie from 'js-cookie';


export const setStorage = (key, value) => {
    const isSupportStorage = window.localStorage !== undefined;
    try {
        if (isSupportStorage) {
            localStorage.setItem(key, JSON.stringify(value));
        } else {
            cookie.set(key, value, { expires: 30, path: '/' });
        }
    } catch (err) {
        return false;
    }
    return true;
};

export const getStorage = (key) => {
    const isSupportStorage = window.localStorage !== undefined;
    let value;
    try {
        if (isSupportStorage) {
            value = localStorage.getItem(key);
        } else {
            value = cookie.get(key);
        }
    } catch (error) {
        return false;
    }
    return JSON.parse(value);
};

export const removeStorage = key => {
    const isSupportStorage = window.localStorage !== undefined;
    try {
        if (isSupportStorage) {
            window.localStorage.removeItem(key);
        } else {
            cookie.remove(key);
        }
    } catch (error) {
        return false;
    }
};

export const packageModuleData = data => {
    const nAuth = [],
        stageArr = [];
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
 * 获取字符串的哈希值
 * @param {String} str 需要进行哈希编码的字符串
 * @param {Boolean} caseSensitive 如果为true则不将字符串化为小写，默认为false
 * @return {Number} hashCode 字符串对应的哈希编码
 */
export const getHashCode = (str, caseSensitive = false) => {
    if (!caseSensitive) str = str.toLowerCase();
    // 1315423911=b'1001110011001111100011010100111'
    let hash = 1315423911,
        i,
        ch;
    for (i = str.length - 1; i >= 0; i--) {
        ch = str.charCodeAt(i);
        hash ^= (hash << 5) + ch + (hash >> 2);
    }

    return hash & 0x7fffffff;
};