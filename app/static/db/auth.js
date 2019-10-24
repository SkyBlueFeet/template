import api from '../apis';

export default class auths {

    /**
     * 数据库auth表字段
     * @date 2019-10-08
     * @param { String } id
     * @param { String } roleName
     * @param { String } operateUserId
     * @param { String } operateDate
     * @param { String } description
     * @param { String } key
     * @param { String } ownerId
     * @param { String } resourcesId
     * @returns { Promise Object }
     */
    constructor(id, roleName, operateUserId, operateDate, description, key, ownerId, resourcesId) {
        this.id = id;
        this.roleName = roleName;
        this.operateUserId = operateUserId;
        this.operateDate = operateDate;
        this.description = description;
        this.key = key;
        this.ownerId = ownerId;
        this.resourcesId = resourcesId;
    }
    get property() {
        return this;
    }

    list() {
        return api.Auth.queryAuth(this);
    }

    create() {
        return api.Auth.createAuth(this);
    }

    edit() {
        return api.Auth.editAuth(this);
    }

    delete() {
        return api.Auth.deleteAuth(this);
    }
}