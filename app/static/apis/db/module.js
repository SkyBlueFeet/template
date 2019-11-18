import { mod } from '..';

class module {

    /**
     * 数据库module表字段
     * @date 2019-10-08
     * @param { String } id
     * @param { String } title
     * @param { String } parentModuleId
     * @param { String } link
     * @param { Number } order
     * @param { String } key
     * @param { String } remark
     * @returns { Promise }
     */
    constructor(id, title, parentModuleId, link, order, key, remark) {
        if (typeof id === 'object' && typeof id.length !== 'number') {
            let obj = id;
            Object.keys(obj).forEach(key => {
                this[key] = obj[key] || undefined;
            });
        } else {
            this.id = id;
            this.title = title;
            this.parentModuleId = parentModuleId;
            this.link = link;
            this.order = order;
            this.key = key;
            this.remark = remark;
        }
    }

    static fromArray(array) {
        let arr = [];
        array.forEach(model => {
            let ts = new module();
            Object.keys(model).forEach(key => {
                ts[key] = model[key] || undefined;
            });
            arr.push(ts);
        });
        return arr;
    }

    static edit(...modules) {
        mod('module', 'edit', modules);
    }

    static delete(...modules) {
        mod('module', 'delete', modules);
    }

    static add(...modules) {
        mod('module', 'add', modules);
    }
}
export default module;