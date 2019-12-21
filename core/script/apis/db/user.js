import { mod } from '..';
import appConfig from '@config/app.config';
import MD5 from 'crypto-js/md5';

let encryption = appConfig.encryption;

export default class users {
    /**
     * 数据库user表字段
     * @date 2019-10-08
     * @param { String } id
     * @param { String } userName
     * @param { String } account
     * @param { String } password
     * @param { String } createUserId
     * @param { String } createDate
     * @param { String } createUserName
     */
    constructor(id, userName, account, password, createUserId, createDate, type, license) {
        this.id = id;
        this.userName = userName;
        this.account = account;
        this.createUserId = createUserId;
        this.createDate = createDate;
        this.type = type;
        this.license = license;
        this.password = password;
    }

    static edit(...users) {
        mod('user', 'edit', users);
    }

    static delete(...users) {
        mod('user', 'delete', users);
    }

    static add(...users) {
        mod('user', 'add', users);
    }
}