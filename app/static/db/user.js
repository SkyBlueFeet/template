import { userApi } from '../apis';

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
    constructor(id, userName, account, password, createUserId, createDate, createUserName) {
        this.id = id;
        this.userName = userName;
        this.account = account;
        this.password = password;
        this.createUserId = createUserId;
        this.createDate = createDate;
        this.createUserName = createUserName;
    }
    get property() {
        return this;
    }

    list() {
        return userApi.queryUser(this);
    }

    create() {
        return userApi.createUser(this);
    }

    edit() {
        return userApi.editUser(this);
    }

    delete() {
        return userApi.deleteUser(this);
    }

    login() {
        return userApi.login(this);
    }

    token() {
        return userApi.token(this);
    }
}