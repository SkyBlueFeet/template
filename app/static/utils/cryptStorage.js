import JSEncrypt from 'jsencrypt';
import CryptoJS from 'crypto-js';
import { keyArr, keyword, code as str, rsaKey } from './variable';
import cookie from 'js-cookie';
import _ from 'lodash';


class storageSign {
    constructor(data) {
        this.data = data;
    }
    setSign = function() {
        window.sessionStorage.setItem(keyword['sign'], CryptoJS.MD5(this.data));
    };

    checkSign = function() {
        return CryptoJS.MD5(this.data).toString() === window.sessionStorage.getItem(keyword['sign']);
    };
}


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
        let body = JSON.parse(cookie.get(keyword['body']));
        let bytes = CryptoJS.AES.decrypt(cookie.get(keyword['head']), body[0].toString());
        let parseStr = bytes.toString(CryptoJS.enc.Utf8);
        let arr = _.cloneDeep(keyArr);
        [arr[arr.length - 2], arr[arr.length - 1]] = [arr[arr.length - 1], arr[arr.length - 2]];
        let complete = _.join(arr, '/');
        let privatekeys = CryptoJS.AES.decrypt(parseStr + complete, body[1].toString());
        let crypt = new JSEncrypt();
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




    static thirdStep() {
        return this.getItem('pKey');
    }

    /**
     * 本地存储
     * @param  { String } key  存储键
     * @param  { String } value   存储值
     */
    static setItem(key, value, msg) {
        if (!msg) {
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
        key = CryptoJS.MD5(key);
        const encodeValue = window.sessionStorage.getItem(key);
        let value = '';
        if (encodeValue !== null) {
            if (!msg) {
                value = this.asymmetricDecrypt(window.sessionStorage.getItem(key));
            } else {
                value = this.symmetricDecrypt(window.sessionStorage.getItem(key), msg);
                console.log(value);
            }
            return value;
        }
        else {
            throw new Error('没有该键值!');
        }
    }


    /**
     * @param  { any } res
     */
    static staticHandle(res, callback) {
        let order = keyword['order'];
        const sgin = new storageSign(res);
        try {
            if (!cookie.get(order)) {
                sgin.setSign();
                this.setItem('res', JSON.stringify(res), keyArr[0]);
                cookie.set(order, this.asymmetricEncrypt('0'));
            }
            if (sgin.checkSign()) {
                let key = parseInt(this.asymmetricDecrypt(cookie.get(order)), 10);
                if (key >= keyArr.length - 1) {
                    key = -1;
                }
                this.setItem('res', JSON.stringify(res), keyArr[key + 1]);
                cookie.set(order, this.asymmetricEncrypt((key + 1).toString()));
                console.log(key);
            } else {
                throw new Error('签名错误!');
            }
        } catch (error) {
            console.log('flag');
            sgin.setSign();
            this.setItem('res', JSON.stringify(res), keyArr[0]);
            cookie.set(order, this.asymmetricEncrypt('0'));
            throw new Error(error);
        }
        if (callback) {
            return new Promise((resolve, reject) => {
                resolve(this);
            });
        }
    }

    static init() {
        cookie.set(keyword['head'], str);
        cookie.set(keyword['body'], JSON.stringify(rsaKey));
    }
}