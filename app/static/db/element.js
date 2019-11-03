import { elementApi } from '../apis';

export default class element {

    /**
     * 数据库element表字段
     * @date 2019-10-08
     * @param { String } id
     * @param { String } elementName
     * @param { String } moduleId
     * @param { String } moduleTitle
     * @param { String } containerId
     * @param { String } order
     * @param { String } key
     * @param { String } remark
     * @param { String } template
     */
    constructor(id, elementName, moduleId, moduleTitle, elementId, containerId, order, key, remark, template) {
        this.id = id;
        this.elementName = elementName;
        this.moduleId = moduleId;
        this.moduleTitle = moduleTitle;
        this.elementId = elementId;
        this.containerId = containerId;
        this.order = order;
        this.key = key;
        this.remark = remark;
        this.template = template;
    }
    get property() {
        return this;
    }

    list() {
        return elementApi.queryElement(this);
    }

    create() {
        return elementApi.createElement(this);
    }

    edit() {
        return elementApi.editElement(this);
    }

    delete() {
        return elementApi.deleteElement(this);
    }
}