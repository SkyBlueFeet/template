import { mod } from '..';
export default class roles {

    /**
     * 数据库role表字段
     * @date 2019-10-08
     * @param {String} id
     * @param { String } roleName
     * @param { String } createDate
     * @param { String } createUserId
     * @param { String } license
     */
    constructor(id, roleName, createDate, createUserId, license) {
        this.id = id;
        this.roleName = roleName;
        this.license = license;
        this.createDate = createDate;
        this.createUserId = createUserId;
    }

    static edit(...roles) {
        mod('role', 'edit', roles);
    }

    static delete(...roles) {
        mod('role', 'delete', roles);
    }

    static add(...roles) {
        mod('role', 'add', roles);
    }
}