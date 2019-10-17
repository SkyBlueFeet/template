import face from 'static/utils/interface';
import qs from 'qs';

class users {
    /**
     * 数据库user表字段
     * @date 2019-10-08
     * @param { String } id
     * @param { String } userName
     * @param { String } account
     * @param { String } password
     * @param { String } createUserId
     * @param { String } createDate
     * @returns { Promise Object }
     */
    constructor(id, userName, account, password, createUserId, createDate) {
        this.id = id;
        this.userName = userName;
        this.account = account;
        this.password = password;
        this.createUserId = createUserId;
        this.createDate = createDate;
    }
    get property() {
        return this;
    }

    list() {
        return face.User.queryUser(this);
    }

    create() {
        return face.User.createAuth(this);
    }

    edit() {
        return face.User.editAuth(this);
    }

    delete() {
        return face.User.deleteAuth(this);
    }
}

class auths {

    /**
     * 数据库auth表字段
     * @date 2019-10-08
     * @param { String } id
     * @param { String } rolename
     * @param { String } operateUserId
     * @param { String } operateDate
     * @param { String } description
     * @param { String } key
     * @param { String } ownerId
     * @param { String } resourcesId
     * @returns { Promise Object }
     */
    constructor(id, rolename, operateUserId, operateDate, description, key, ownerId, resourcesId) {
        this.id = id;
        this.rolename = rolename;
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
        return face.Auth.queryAuth(this);
    }

    create() {
        return face.Auth.createAuth(this);
    }

    edit() {
        return face.Auth.editAuth(this);
    }

    delete() {
        return face.Auth.deleteAuth(this);
    }
}

class roles {

    /**
     * 数据库role表字段
     * @date 2019-10-08
     * @param {String} id
     * @param { String } rolename
     * @param { String } createDate
     * @param { String } createUserId
     * @returns { Promise Object }
     */
    constructor(id, rolename, createDate, createUserId) {
        this.id = id;
        this.rolename = rolename;
        this.createDate = createDate;
        this.createUserId = createUserId;
    }
    get property() {
        return this;
    }

    list() {
        return face.Role.queryRole(this);
    }

    create() {
        return face.Role.createRole(this);
    }

    edit() {
        return face.Role.editRole(this);
    }

    delete() {
        return face.Role.deleteRole(this);
    }
}


class element {

    /**
     * 数据库element表字段
     * @date 2019-10-08
     * @param { String } id
     * @param { String } moduleName
     * @param { String } parentModuleId
     * @param { String } key
     * @param { String } remark
     * @returns { Promise Object }
     */
    constructor(id, elementName, moduleId, elementId, key, remark) {
        this.id = id;
        this.elementName = elementName;
        this.moduleId = moduleId;
        this.elementId = elementId;
        this.key = key;
        this.remark = remark;
    }
    get property() {
        return this;
    }

    list() {
        return face.Element.queryElement(this);
    }

    create() {
        return face.Element.createElement(this);
    }

    edit() {
        return face.Element.editElement(this);
    }

    delete() {
        return face.Element.deleteElement(this);
    }
}

export default { users, auths, roles, module, element };