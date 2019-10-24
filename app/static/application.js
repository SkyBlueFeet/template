import { module, element, auth, role, user } from 'static/db';
import cookie from 'js-cookie';
import { keyword, code as str, rsaKey } from 'static/utils/variable';
import local from './utils/cryptStorage';
import { moduleUpdata, elementUpdate, roleUpdate, authUpdate, userUpdate } from './utils/dom';

/**
 *
 * @param { String } key
 */
async function getData(key) {
    let data = [];
    if (key === 'module') {
        data = await (new module()).list();
    } else if (key === 'element') {
        data = await (new element()).list();
    } else if (key === 'auth') {
        data = await (new auth).list();
    } else if (key === 'role') {
        data = await (new role).list();
    } else if (key === 'user') {
        data = await (new user).list();
    }
    return data;
}


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
    static appStorage = true;

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
        this.resourceStatus = this.resourceStatus.bind(this);
        this.resource = this.resource.bind(this);
    }



    static extend = () => {
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
            role = [],
            user = [];
        const that = this;
        return {
            module,
            element,
            auth,
            role,
            user,
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
        set: (target, key, value, receiver) => {
            let that = target.that;
            that.domInit(key, value);
            // console.log(key, value);
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
            role = '',
            user = '';
        if (sessionStorage.getItem('resourceStatus') !== null) {
            const localStatus = JSON.parse(sessionStorage.getItem('resourceStatus'));
            Object.keys(localStatus).forEach(key => {
                if (localStatus[key].length > 0 && key == 'module') {
                    module = localStatus[key];
                } else if (localStatus[key].length > 0 && key == 'element') {
                    element = localStatus[key];
                } else if (localStatus[key].length > 0 && key == 'role') {
                    role = localStatus[key];
                } else if (localStatus[key].length > 0 && key == 'auth') {
                    auth = localStatus[key];
                } else if (localStatus[key].length > 0 && key == 'user') {
                    user = localStatus[key];
                }
            });
        }
        return {
            module,
            element,
            auth,
            role,
            user
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
            if (this.resourceStatus[key].length > 0 && key !== 'that' && this.appStorage) {
                console.log(key, '初始化完毕');
                const value = local.getStatic(key, this.resourceStatus[key]);
                if (value) {
                    this.resource[key] = value;
                } else {
                    console.error(key, '读取错误');
                }
            } else {
                getData(key).then(res => {
                    this.resource[key] = res.data;
                });

            }
        });
        // return new Promise((resolve, reject) => {
        //     resolve(this.resource);
        // });
    }

    static getRes(...arg) {
        let o = new Object();
        arg.forEach(key => {
            if (this.resource[key] === undefined) {
                console.error(`不存在${key}资源!`);
                return;
            } else {
                o[key] = this.resource[key];
            }
        });
        return o;
    }

    static setRes(o) {
        Object.keys(o).forEach(name => {
            if (this.resource[name] === undefined) {
                console.error(`不存在${name}资源!`);
                return;
            } else {
                this.resource[name] = o[name];
            }
        });
        return o;
    }

    static domInit(key, data) {
        switch (key) {
            case 'module':
                moduleUpdata(data);
                break;
            case 'element':
                elementUpdate(data);
                break;
            case 'role':
                roleUpdate(data);
                break;
            case 'auth':
                authUpdate(data);
                break;
            case 'user':
                userUpdate(data);
                break;
            default:
                break;
        }
    }

}