import { module, element, auth, role, user } from 'static/db';
import cookie from 'js-cookie';
import { keyword, code as str, rsaKey } from './variable';
import local from './cryptStorage';
import { moduleUpdata, elementUpdate, roleUpdate, authUpdate, userUpdate, otherComponents } from './dom';

export { assignRes } from './dom';
// import { * as dest } from 'app/config/router';
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
     * 是否初始化
     * @type { boolean }
     */
    static isInit = false;

    /**
     * 是否开启App缓存
     * @type {boolean}
     */
    static appStorage = true;


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



    static extend = () => {
        console.log('extend');
    }


    /**
     * 放置内存中的数据,用来拦截数据的更改以及方便页面读取
     * @type { ProxyConstructor }
     */
    static resource = (() => {
        const o = {
            module: [],
            element: [],
            auth: [],
            role: [],
            user: []
        };
        const that = this;

        ((data) => {
            Object.keys(data).forEach(key => {
                ((data, key) => {
                    let val = data[key];
                    Object.defineProperty(data, key, {
                        enumerable: true,
                        configurable: true,
                        get: function() {
                            return val;
                        },
                        set: function(newValue) {
                            val = newValue;
                            that.domInit(key, val);
                            that.resourceStatus[key] = local.setStatic(key, val);
                        }
                    });
                })(data, key);
            });
        })(o);

        return o;
    })();

    /**
     * 放置存储标志
     * @type { ProxyConstructor }
     */
    static resourceStatus = (() => {
        const o = {
            module: '',
            element: '',
            auth: '',
            role: '',
            user: ''
        };

        ((data) => {
            Object.keys(data).forEach(key => {
                ((data, key) => {
                    let val = data[key];
                    Object.defineProperty(data, key, {
                        enumerable: true,
                        configurable: true,
                        get: function() {
                            return val;
                        },
                        set: function(newValue) {
                            val = newValue;
                            sessionStorage.setItem('resourceStatus', JSON.stringify(o));
                        }
                    });
                })(data, key);
            });
        })(o);

        if (sessionStorage.getItem('resourceStatus') !== null) {
            const localStatus = JSON.parse(sessionStorage.getItem('resourceStatus'));
            Object.keys(localStatus).forEach(key => {
                o[key] = localStatus[key];
            });
        }

        return o;
    })();

    static async init(page) {
        const isPreEnv = typeof cookie.get(keyword['body']) === 'string';
        if (!isPreEnv) {
            cookie.set(keyword['body'], JSON.stringify(rsaKey));
        }

        Object.keys(this.resourceStatus).forEach(name => {
            try {
                if (this.resourceStatus[name].length > 0 && this.appStorage) {
                    console.log(name, '初始化完毕');
                    this.resource[name] = local.getStatic(name, this.resourceStatus[name]);
                } else {
                    throw new Error();
                }
            } catch (error) {
                if (error.message) console.error('the Storage is Error!');
                getData(name).then(res => {
                    this.resource[name] = res.data;
                });
            }
        });
    }

    static async preFetch() {
        Object.keys(this.resourceStatus).forEach(name => {
            getData(name).then(res => {
                this.resourceStatus[name] = local.setStatic(name, res.data);
            });
        });
    }

    static async run(page, pageEvent) {
        this.page = page;
        await this.init();
        pageEvent(this);
        window.sessionStorage.clear();
        this.preFetch();
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
                i++;
                moduleUpdata(data, this);
                otherComponents(this);
                break;
            case 'element':
                i++;
                elementUpdate(data, this);
                break;
            case 'role':
                i++;
                roleUpdate(data, this);
                break;
            case 'auth':
                i++;
                authUpdate(data, this);
                break;
            case 'user':
                i++;
                userUpdate(data, this);
                break;
            default:
                break;
        }
    }

}