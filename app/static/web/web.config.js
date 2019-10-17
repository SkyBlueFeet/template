import module from 'static/db/module';
import { setStorage, getStorage, packageModuleData } from 'static/utils/utils.js';

class application {
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
     * 挂载远程数据
     * @type {Object}
     */
    static resource = {
        module: [],
        element: [],
        auth: [],
        rule: []
    };

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
        if (false === this.instance instanceof this) {
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

    static axios = {
        method: 'post',
        // 基础url前缀
        baseURL: 'http://localhost:59255/auth/',
        // 请求头信息
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
            // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        /**
         * Json解析返回数据
         */
        JSONParse: true,
        methodParse: ['post', 'put', 'delete'],
        // 参数
        data: {},
        // 设置超时时间
        timeout: 10000,
        // 携带凭证
        withCredentials: false,
        // 返回数据类型
        responseType: 'json'
    }

    static extend() {

    }

}

export default application;