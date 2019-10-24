import api from '../apis';

export default class element {

    /**
     * 数据库element表字段
     * @date 2019-10-08
     * @param { String } id
     * @param { String } elementName
     * @param { String } moduleId
     * @param { String } moduleTitle
     * @param { String } key
     * @param { String } remark
     * @returns { Promise Object }
     */
    constructor(id, elementName, moduleId, moduleTitle, elementId, key, remark) {
        this.id = id;
        this.elementName = elementName;
        this.moduleId = moduleId;
        this.moduleTitle = moduleTitle;
        this.elementId = elementId;
        this.key = key;
        this.remark = remark;
    }
    get property() {
        return this;
    }

    list() {
        return api.Element.queryElement(this);
    }

    create() {
        return api.Element.createElement(this);
    }

    edit() {
        return api.Element.editElement(this);
    }

    delete() {
        return api.Element.deleteElement(this);
    }
}