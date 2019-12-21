import { mod } from '..';

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
    constructor(id, key, ownerId, resourcesId, createUserId, createDate) {
        this.id = id;
        this.key = key;
        this.ownerId = ownerId;
        this.resourcesId = resourcesId;
        this.createUserId = createUserId;
        this.createDate = createDate;
    }

    static edit(...auths) {
        mod('auth', 'edit', auths);
    }

    static delete(...auths) {
        mod('auth', 'delete', auths);
    }

    static add(...auths) {
        mod('auth', 'add', auths);
    }
}