import module from 'static/db/module';
import cookie from 'js-cookie';
import { keyword, code as str, rsaKey } from 'static/utils/variable';
import CryptoJS from 'crypto-js';
import local from './utils/cryptStorage';


import { packageModuleData, getStorage, setStorage, removeStorage, getHashCode } from 'static/utils/utils';
import header from 'components/header.ejs';
import { moduleToTable, moduleUpdata } from './utils/dom';


export default class application {
    /**
     * [instance  当前实例]
     * @type {this}
     */
    static instance;

    /**
     * App版本
     * @type {version}
     */
    static version = 'bate0.9.0';

    /**
     * 开发模式
     * @type {boolean}
     */
    static dev = true;




    /**
     * 是否初始化
     * @type {boolean}
     */
    static isInit = false;

    /**
     * 是否开启App缓存
     * @type {boolean}
     */
    static appStorage = false;

    /**
     * 是否开启数据缓存
     * @type {boolean}
     */
    static dataStorage = false;

    /**
     * [getInstance 获取单例]
     * @method getInstance
     * @return {[type]}    [description]
     */
    static getInstance() {
        // if (false === this.instance instanceof this) {
        //     this.instance = new this;
        // }
        // return this.instance;

        if (!(this.instance instanceof this)) {
            this.instance = new this;
        }
        return this.instance;
    }

    /**
     * [constructor 构造]
     * @method constructor
     * @return {object}       userInfo
     */
    constructor() {
        this.uId = 123;
    }

    get property() {
        console.log('get');
        return this;
    }



    extend = () => {
        console.log('extend');
    }


    /**
     * 放置内存中的数据,用来拦截数据的更改以及方便页面读取
     * @type { ProxyConstructor }
     */
    static resource = new Proxy((() => {
        let module = [],
            element = [],
            auth = [],
            rule = [];
        const that = this;
        return {
            module,
            element,
            auth,
            rule,
            that
        };
    })(), {
        get: function(target, key, receiver) {
            return Reflect.get(target, key, receiver);
        },

        /**
         * 触发resource set函数后加密存储并将密钥存储到resourceStatus
         * @param { ObjectConstructor } target
         * @param { string } key
         * @param { Array } value
         * @param { ProxyConstructor } receiver
         */
        set: function(target, key, value, receiver) {
            let that = target.that;
            that.domInit(key, value);
            if (value.length > 0) that.resourceStatus[key] = local.setStatic(key, value);
            return Reflect.set(target, key, value, receiver);
        }
    });

    /**
     * 放置存储标志
     * @type { ProxyConstructor }
     */
    static resourceStatus = new Proxy((() => {
        let module = '',
            element = '',
            auth = '',
            rule = '';
        if (sessionStorage.getItem('resourceStatus') !== null) {
            const localStatus = JSON.parse(sessionStorage.getItem('resourceStatus'));
            Object.keys(localStatus).forEach(key => {
                if (localStatus[key].length > 0) {
                    module = localStatus[key];
                }
            });
        }
        return {
            module,
            element,
            auth,
            rule
        };
    })(), {
        get: function(target, key, receiver) {
            return Reflect.get(target, key, receiver);
        },

        /**
         * 触发resourceStatus set函数后将resourceStatus新值放到到本地存储
         * @param { ObjectConstructor } target
         * @param { string } key
         * @param { Array } value
         * @param { ProxyConstructor } receiver
         */
        set: function(target, key, value, receiver) {
            target[key] = value;
            sessionStorage.setItem('resourceStatus', JSON.stringify(target));
            return Reflect.set(target, key, value, receiver);
        }
    })

    static init() {
        const isPreEnv = typeof cookie.get(keyword['head']) === 'string' && typeof cookie.get(keyword['body']) === 'string';
        if (!isPreEnv) {
            cookie.set(keyword['head'], str);
            cookie.set(keyword['body'], JSON.stringify(rsaKey));
        }
        Object.keys(this.resourceStatus).forEach(key => {
            if (this.resourceStatus[key].length > 0 && key !== 'that') {
                const value = local.getStatic(key, this.resourceStatus[key]);
                this.resource[key] = value;
            } else {
                if (key === 'module') {
                    (new module()).list().then(res => {
                        const msg = Object.assign({}, this.resource);
                        msg[key] = res['data'];
                        this.updateView(msg);
                    });
                }
            }
        });
        return new Promise((resolve, reject) => {
            resolve(this.resource);
        });
    }

    static updateView(object) {
        Object.keys(object).forEach(key => {
            this.resource[key] = object[key];
        });
    }

    static getRes(...arg) {
        let o = new Object();
        arg.forEach(key => {
            if (this.resource[key] !== undefined) o[key] = this.resource[key];
        });
        return o;
    }

    static domInit(key, data) {
        switch (key) {
            case 'module':
                moduleUpdata(data);
                break;

            default:
                break;
        }
    }

}