import cookie from 'js-cookie';
import { keyword, rsaKey } from './variable';
import local from './storage';
import * as format from './data';
import { resLoad, user } from '../apis';
import { Router } from '@core/config';
import { getPathName } from '../utils';
import updateDom from './dom';

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
     * @type { Object }
     */
    static $page = {
        id: '',
        name: '',
        resourceId: '',
        title: '',
        link: '',
        parentModuleId: '',
        parentModuleTitle: '',
        $elementMountId: '',
        $moduleMountId: '',
        $roleId: '' || [],
        $userId: ''
    };

    /**
     * 是否开启预请求
     * @type {boolean}
     */
    static proLoad = true;


    static fields = ['module', 'element', 'auth', 'role', 'user'];

    /**
     * [getInstance 获取单例]
     * @method getInstance
     * @return {[type]}    [description]
     */
    static getInstance() {
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

    }

    /**
     * 当前用户
     * @type {}
     *
     */
    static $user = (() => {
        const oData = {};

        for (let [name, value] of Object.entries(oData)) {
            Object.defineProperty(oData, name, {
                enumerable: true,
                configurable: true,
                get: function() {
                    return value;
                },
                set: function(newValue) {
                    if (newValue) {
                        value = local.setStatic(name, newValue);
                    } else {
                        value = '';
                    }
                    sessionStorage.setItem('userStatus', JSON.stringify(oData));
                }
            });
        }

        if (sessionStorage.getItem('userStatus') !== null) {
            const localStatus = JSON.parse(sessionStorage.getItem('userStatus'));
            for (let [name, value] of Object.entries(localStatus)) {
                oData[name] = value;
            }
        }

        return oData;
    })();


    /**
     * 放置内存中的数据,用来拦截数据的更改以及方便页面读取
     * @type { ProxyConstructor }
     */
    static resource = (() => {
        const oData = {};

        this.fields.forEach(value => {
            oData[value] = [];
        });

        const that = this;


        for (let [name, value] of Object.entries(oData)) {
            Object.defineProperty(oData, name, {
                enumerable: true,
                configurable: true,
                get: function() {
                    return value;
                },
                set: function(newValue) {
                    value = newValue;
                    that.appFormat(name, value);

                    updateDom(that.$page, name);
                    that.resourceStatus[name] = local.setStatic(name, value);
                }
            });
        }

        return oData;
    })();

    /**
     * 放置存储标志
     * @type { ProxyConstructor }
     */
    static resourceStatus = (() => {

        const oData = {};

        this.fields.forEach(value => {
            oData[value] = '';
        });

        for (let [name, value] of Object.entries(oData)) {
            Object.defineProperty(oData, name, {
                enumerable: true,
                configurable: true,
                get: function() {
                    return value;
                },
                set: function(newValue) {
                    value = newValue;
                    sessionStorage.setItem('resourceStatus', JSON.stringify(oData));
                }
            });
        }

        if (sessionStorage.getItem('resourceStatus') !== null) {
            const localStatus = JSON.parse(sessionStorage.getItem('resourceStatus'));
            for (let [name, value] of Object.entries(localStatus)) {
                oData[name] = value;
            }
        }

        return oData;
    })();

    static async init() {
        const isPreEnv = typeof cookie.get(keyword['body']) === 'string';
        if (!isPreEnv) {
            cookie.set(keyword['body'], JSON.stringify(rsaKey));
        }
        try {

            for (let name in this.resourceStatus) {
                if (this.proLoad && this.resourceStatus[name].length > 0) {
                    this.resource[name] = local.getStatic(name, this.resourceStatus[name]);
                } else {
                    throw new Error();
                }
            }

        } catch (error) {

            if (error.message) console.error('the Storage is Error!');

            this.preRequest('render');
        }
    }

    static async preRequest(mode = 'prefetch', data) {
        let res = {};
        if (data) {
            res = data;
        } else {
            res = await resLoad();
        }
        if (mode == 'prefetch') {
            for (let [name, value] of Object.entries(res.userData)) {
                this.resourceStatus[name] = local.setStatic(name, value);
            }
            for (let [name, value] of Object.entries(res.user)) {
                this.$user[name] = value;
            }
        } else if (mode == 'render') {
            for (let [name, value] of Object.entries(res.userData)) {
                this.resource[name] = value;
            }
        }
    }

    static run(pageEvent) {

        this.$page = {
            ...this.$page,
            link: getPathName()
        };

        this.init();

        if (typeof pageEvent === 'function') pageEvent(this);

        window.sessionStorage.clear();

        if (this.proLoad) this.preRequest();

        return this;

    }

    static getRes(name) {
        if (this.resource[name] === undefined) {
            console.error(`不存在${name}资源!`);
            return false;
        } else {
            return this.resource[name];
        }
    }

    static setRes(name, data) {
        if (this.resource[name] === undefined) {
            console.error(`不存在${name}资源!`);
            return false;
        } else {
            this.resource[name] = data;
            return true;
        }
    }

    static appFormat(key, data) {
        if (!Router.ignoreExecute.includes(this.$page.link)) {
            if (typeof format[`${key}Format`] === 'function') {
                format[`${key}Format`](data, this);
            } else {
                console.error(`function ${key}Format is undefined!`);
            }
        }
    }
}