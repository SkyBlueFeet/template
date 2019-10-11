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