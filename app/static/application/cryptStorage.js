// import JSEncrypt from 'jsencrypt';
import SHA1 from 'crypto-js/sha1';
import MD5 from 'crypto-js/md5';
import AES from 'crypto-js/aes';
import utf8 from 'crypto-js/enc-utf8';
import { code as str, TemporaryKey } from './variable';
import { randomString } from 'app/static/utils';

const storageSign = ((name, data) => {
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
     * 非对称加密[已废弃]
     * @param { String } value
     */
    // static asymmetricEncrypt(value) {
    //     let crypt = new JSEncrypt();
    //     crypt.setPublicKey(this.publicKey);
    //     let encrypted = crypt.encrypt(value);
    //     return encrypted;
    // }

    /**
     * 对称加密
     * @param { String } value
     * @param { String } key
     */
    static symmetricEncrypt(value, key) {
        return AES.encrypt(value, key);
    }

    /**
     * 非对称解密[已废弃]
     * @param { String } code
     */
    // static asymmetricDecrypt(code) {
    //     let body = cookie.getJSON(keyword['body']),
    //         crypt = new JSEncrypt(),
    //         bytes = AES.decrypt(cookie.get(keyword['head']), body[0].toString()),
    //         parseStr = bytes.toString(utf8),

    //         arr = [...keyArr];

    //     [arr[arr.length - 2], arr[arr.length - 1]] = [arr[arr.length - 1], arr[arr.length - 2]];

    //     // let complete = _.join(arr, '/'),
    //     let complete = arr.join('/'),
    //         privatekeys = AES.decrypt(parseStr + complete, body[1].toString());

    //     crypt.setPrivateKey(privatekeys.toString(utf8));

    //     let uncrypted = crypt.decrypt(code);

    //     if (!uncrypted) throw new Error('解密失败');
    //     return uncrypted;
    // }

    /**
     * 对称解密
     * @param { String } code
     * @param { String } privateKey
     */
    static symmetricDecrypt(code, privateKey) {
        let dec = AES.decrypt(code, privateKey).toString(utf8);
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
            // window.sessionStorage.setItem(MD5(key), this.asymmetricEncrypt(value));
            window.sessionStorage.setItem(MD5(key), this.symmetricEncrypt(value, TemporaryKey));
        } else {
            window.sessionStorage.setItem(MD5(key), this.symmetricEncrypt(value, msg));
        }
    }

    /**
     * 获取本地存储
     * @param { String } key
     */
    static getItem(key, msg) {
        key = MD5(key).toString();
        const encodeValue = window.sessionStorage.getItem(key);
        let value = '';
        if (encodeValue !== null) {
            if (null === msg) {
                // value = this.asymmetricDecrypt(window.sessionStorage.getItem(key));
                value = this.symmetricDecrypt(window.sessionStorage.getItem(key), TemporaryKey);
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
     * 返回加密秘钥
     * @param  { String } name
     * @param  { Object } data
     * @returns { String } privateKey
     */
    static setStatic(name, data) {

        storageSign(name, data).setSign();

        let privateKey = randomString();

        this.setItem(name, data, privateKey);

        return privateKey;

    }

    /**
     *
     * @param { String } name
     * @param { String } privateKey
     */
    static getStatic(name, privateKey) {
        const value = this.getItem(name, privateKey);
        if (storageSign(name, value).checkSign()) {
            return value;
        } else {
            throw new Error('The file is not complete!');
        }
    }
}