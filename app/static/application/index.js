import cookie from 'js-cookie';
import { keyword, code as str, rsaKey } from './variable';
import local from './cryptStorage';
import { moduleUpdata, elementUpdate, roleUpdate, authUpdate, userUpdate, otherComponents } from './dom';
import { preLoad } from '../apis';
import { ucfirst } from '../utils';

export { assignRes, roleRes } from './dom';

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
    static page = {
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
     * 是否开启App缓存
     * @type {boolean}
     */
    static proLoad = true;


    static initObject = {
        module: [],
        element: [],
        auth: [],
        role: [],
        user: []
    }

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
        const user = {
            id: '',
            userName: '',
            account: '',
            password: '',
            createUserId: '',
            createDate: '',
            createUserName: ''
        };
        const that = this;

        for (let [name, value] of Object.entries(user)) {
            Object.defineProperty(user, name, {
                enumerable: true,
                configurable: true,
                get: function() {
                    if (value) {
                        return local.getStatic(name, value);
                    } else {
                        return value;
                    }
                },
                set: function(newValue) {
                    value = local.setStatic(name, newValue);
                }
            });
        }

        return user;
    })()


    /**
     * 放置内存中的数据,用来拦截数据的更改以及方便页面读取
     * @type { ProxyConstructor }
     */
    static resource = (() => {
        const oData = {
            module: [],
            element: [],
            auth: [],
            role: [],
            user: []
        };
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
                    that.domInit(name, value);
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
        const oData = {
            module: '',
            element: '',
            auth: '',
            role: '',
            user: ''
        };

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

    static async init(page) {
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

            let res = await preLoad();
            if (res.statusKey == 666) {
                for (let [name, value] of Object.entries(res.userData)) {
                    this.resource[name] = value;
                }
            }

        }
    }

    static async preFetch() {
        preLoad().then(res => {
            if (res.statusKey == 666) {
                for (let [name, value] of Object.entries(res.userData)) {
                    this.resourceStatus[name] = local.setStatic(name, value);
                }

                this.$user = {
                    ...this.$user,
                    ...res.user
                };
            }
        });
    }

    static async run(page, pageEvent) {
        this.page = page;
        await this.init();
        pageEvent(this);
        window.sessionStorage.clear();
        if (this.proLoad) {
            this.preFetch();
        }
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

    static domInit(key, data) {
        let i = 0;
        switch (key) {
            case 'module':
                moduleUpdata(data, this);
                otherComponents(data, this);
                break;
            case 'element':
                elementUpdate(data, this);
                break;
            case 'role':
                roleUpdate(data, this);
                break;
            case 'auth':
                authUpdate(data, this);
                break;
            case 'user':
                userUpdate(data, this);
                break;
            default:
                break;
        }
    }

}