import { roleApi } from '../apis';

export default class roles {

    /**
     * 数据库role表字段
     * @date 2019-10-08
     * @param {String} id
     * @param { String } roleName
     * @param { String } createDate
     * @param { String } createUserId
     * @param { String } createUserName
     */
    constructor(id, roleName, createDate, createUserId, createUserName) {
        this.id = id;
        this.roleName = roleName;
        this.createDate = createDate;
        this.createUserId = createUserId;
        this.createUserName = createUserName;
    }
    get property() {
        return this;
    }

    list() {
        return roleApi.queryRole(this);
    }

    create() {
        return roleApi.createRole(this);
    }

    edit() {
        return roleApi.editRole(this);
    }

    delete() {
        return roleApi.deleteRole(this);
    }
}