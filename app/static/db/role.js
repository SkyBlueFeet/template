import api from '../apis';

export default class roles {

    /**
     * 数据库role表字段
     * @date 2019-10-08
     * @param {String} id
     * @param { String } roleName
     * @param { String } createDate
     * @param { String } createUserId
     * @returns { Promise }
     */
    constructor(id, roleName, createDate, createUserId) {
        this.id = id;
        this.roleName = roleName;
        this.createDate = createDate;
        this.createUserId = createUserId;
    }
    get property() {
        return this;
    }

    list() {
        return api.Role.queryRole(this);
    }

    create() {
        return api.Role.createRole(this);
    }

    edit() {
        return api.Role.editRole(this);
    }

    delete() {
        return api.Role.deleteRole(this);
    }
}