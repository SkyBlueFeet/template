import api from '../apis';

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
        return api.User.queryUser(this);
    }

    create() {
        return api.User.createUser(this);
    }

    edit() {
        return api.User.editUser(this);
    }

    delete() {
        return api.User.deleteUser(this);
    }
}