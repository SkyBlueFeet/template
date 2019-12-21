import { moduleRes } from '../application/data';

/**
 * 获取字符串的哈希值
 * @param {String} str 需要进行哈希编码的字符串
 * @param {Boolean} caseSensitive 如果为true则不将字符串化为小写，默认为false
 * @return {Number} hashCode 字符串对应的哈希编码
 */
export const getHashCode = (str, caseSensitive = false) => {
    if (!caseSensitive) str = str.toLowerCase();
    let hash = 1315423911,
        i,
        ch;
    for (i = str.length - 1; i >= 0; i--) {
        ch = str.charCodeAt(i);
        hash ^= (hash << 5) + ch + (hash >> 2);
    }

    return hash & 0x7fffffff;
};

/**
 * 随机字符串
 * @param { number } len
 */
export const randomString = (len = 32) => {
    let $chars =
        'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    let maxPos = $chars.length;
    let randomStr = '';
    for (let i = 0; i < len; i++) {
        randomStr += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return randomStr;
};

export function ucfirst(str) {
    str = str.toLowerCase().replace(/\b\w+\b/g, function(word) {
        return word.substring(0, 1).toUpperCase() + word.substring(1);
    });
    return str;
}

export function getPathName() {
    let path = window.location.pathname;
    if (path.endsWith('/index.html')) {
        path = path.substring(0, path.length - 11);
    } else if (path.endsWith('/')) {
        path = path.substring(0, path.length - 1);
    }
    return path;
}

export async function bootstrap() {
    return import('@core/script/event/preload/bootstrap');
}

export function getParentItem(rO) {
    if (moduleRes[rO]['parentModuleId'] != 'root') {
        return moduleRes[moduleRes[rO]['parentModuleId']];
    } else {
        return undefined;
    }
}

export const deepClone = (Obj) => {
    return JSON.parse(JSON.stringify(Obj));
};

export const geteleId = (title, id) => `${title}#${id}`;


export default { getHashCode, randomString, ucfirst, getPathName, getState: bootstrap, getParentItem, geteleId };