import face from 'static/utils/interface';

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
    get property() {
        return this;
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

    list() {
        return face.Module.queryModule(this);
    }

    create() {
        return face.Module.createModule(this);
    }

    edit() {
        return face.Module.editModule(this);
    }

    delete() {
        return face.Module.deleteModule(this);
    }
}
export default module;