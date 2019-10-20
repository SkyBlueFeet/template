import JSEncrypt from 'jsencrypt';
import CryptoJS from 'crypto-js';
import { keyArr, keyword, code as str, rsaKey } from './variable';
import cookie from 'js-cookie';
import _ from 'lodash';
import { getHashCode, randomString } from './utils';

const storageSign = ((name, data) => {
    if (name === 'undefined') return;

    name = CryptoJS.SHA1(name).toString();
    data = JSON.stringify(data);
    const setSign = function() {
        window.sessionStorage.setItem(name, CryptoJS.MD5(data));
    };

    const checkSign = function() {
        return CryptoJS.MD5(data).toString() === window.sessionStorage.getItem(name);
    };
    return {
        setSign,
        checkSign
    };
});


export default class local {

    static publicKey = `-----BEGIN PUBLIC KEY-----
    MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDJ1vFeWT9Fs7R4hfaCsl5xagDm
    koqdGQ/eayOtx6FZkfd6kr2qmrWJgN+f0Y6pckRf83LNIwshKnL0BWDXa1l3HWYh
    btB4Fa7SAI3fy7SyU/HFdjh1+qXY23I/TK71R9WuVaiPoQMc92yRryUqMeboeMpM
    oU13dlhTxvIzXPQiUwIDAQAB
    -----END PUBLIC KEY-----`



    constructor() {

    }



    /**
     * 非对称加密
     * @param { String } value
     */
    static asymmetricEncrypt(value) {
        let crypt = new JSEncrypt();
        crypt.setPublicKey(this.publicKey);
        let encrypted = crypt.encrypt(value);
        return encrypted;
    }

    /**
     * 对称加密
     * @param { String } value
     * @param { String } key
     */
    static symmetricEncrypt(value, key) {
        return CryptoJS.AES.encrypt(value, key);
    }

    /**
     * 非对称解密
     * @param { String } code
     */
    static asymmetricDecrypt(code) {
        let body = cookie.getJSON(keyword['body']),
            crypt = new JSEncrypt(),
            bytes = CryptoJS.AES.decrypt(cookie.get(keyword['head']), body[0].toString()),
            parseStr = bytes.toString(CryptoJS.enc.Utf8),
            arr = _.cloneDeep(keyArr);

        [arr[arr.length - 2], arr[arr.length - 1]] = [arr[arr.length - 1], arr[arr.length - 2]];

        let complete = _.join(arr, '/'),
            privatekeys = CryptoJS.AES.decrypt(parseStr + complete, body[1].toString());

        crypt.setPrivateKey(privatekeys.toString(CryptoJS.enc.Utf8));

        let uncrypted = crypt.decrypt(code);

        if (!uncrypted) throw new Error('解密失败');
        console.log(uncrypted);
        return uncrypted;
    }

    /**
     * 对称解密
     * @param { String } code
     * @param { String } privateKey
     */
    static symmetricDecrypt(code, privateKey) {
        let dec = CryptoJS.AES.decrypt(code, privateKey).toString(CryptoJS.enc.Utf8);
        if (!dec) throw new Error('解密失败');
        return dec;
    }

    /**
     * 本地存储,key值不需要在加密
     * @param  { String } key  存储键
     * @param  { String } value   存储值
     */
    static setItem(key, value, msg) {
        value = JSON.stringify(value);
        if (null === msg) {
            window.sessionStorage.setItem(CryptoJS.MD5(key), this.asymmetricEncrypt(value));
        } else {
            window.sessionStorage.setItem(CryptoJS.MD5(key), this.symmetricEncrypt(value, msg));
        }
    }

    /**
     * 获取本地存储
     * @param { String } key
     */
    static getItem(key, msg) {
        key = CryptoJS.MD5(key).toString();
        const encodeValue = window.sessionStorage.getItem(key);
        let value = '';
        if (encodeValue !== null) {
            if (null === msg) {
                value = this.asymmetricDecrypt(window.sessionStorage.getItem(key));
            } else {
                value = this.symmetricDecrypt(window.sessionStorage.getItem(key), msg);
            }
            return JSON.parse(value);
        }
        else {
            throw new Error('没有该键值!');
        }
    }

    /**
     * 设置和获取序列
     * @returns { Object }
     */
    static staticOrder = (() => {
        let orderKey = keyword['order'];
        const getOrder = () => {
            let value = cookie.get(orderKey);
            return value === null ? false : value;
        };
        const setOrder = order => {
            cookie.set(orderKey, this.asymmetricEncrypt(order));
        };
        return {
            getOrder,
            setOrder
        };
    })

    /**
     * 返回加密秘钥
     * @param  { any } name
     * @param  { any } data
     * @returns { String } privateKey
     */
    static setStatic(name, data) {

        storageSign(name, data).setSign();

        let privateKey = randomString();

        this.setItem(name, data, privateKey);

        return privateKey;

    }

    static getStatic(name, privateKey) {
        try {
            const value = this.getItem(name, privateKey);
            return value;
        } catch (error) {
            console.error(error);
            return false;
        }

    }
}