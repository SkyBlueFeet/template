import { params } from '..';
import $axios from '../axios';
import application from '../../application';

function mod(type, users) {
    return $axios({
        url: '/app/modUser',
        method: 'post',
        data: params(type, users)
    }).then(res => {
        application.setRes('user', res.data);
        application.$user = {
            ...application.$user,
            ...res.user
        };
    });
}

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