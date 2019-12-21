import SHA1 from 'crypto-js/sha1';
import MD5 from 'crypto-js/md5';
import { randomString } from '../utils';
import encrypt from './encrypt';

export default class {

    constructor() {

    }

    static storageSign(name, data) {
        if (name === 'undefined') return;

        name = SHA1(name).toString();
        data = JSON.stringify(data);
        const setSign = function() {
            window.sessionStorage.setItem(name, MD5(data));
        };

        const checkSign = function() {
            return MD5(data).toString() === window.sessionStorage.getItem(name);
        };
        return {
            setSign,
            checkSign
        };
    }

    /**
     * 设置本地存储加密
     * 返回随机生成的加密秘钥
     * @param  { String } name
     * @param  { Object } data
     * @returns { String } privateKey
     */
    static setStatic(name, data) {

        this.storageSign(name, data).setSign();

        let privateKey = randomString();

        encrypt.setItem(name, data, privateKey);

        return privateKey;

    }

    /**
     * 获取加密的本地存储
     * @param { String } name
     * @param { String } privateKey
     */
    static getStatic(name, privateKey) {
        const value = encrypt.getItem(name, privateKey);
        if (this.storageSign(name, value).checkSign()) {
            return value;
        } else {
            throw new Error(`属性 ${name} 不完整`);
        }
    }
}