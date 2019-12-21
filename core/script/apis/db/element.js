import { mod } from '..';

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
    constructor(id, elementName, moduleId, moduleTitle, elementId, containerId, order, key, remark, template, createUserId, createDate) {
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
        this.createUserId = createUserId;
        this.createDate = createDate;
    }

    static edit(...elements) {
        mod('element', 'edit', elements);
    }

    static delete(...elements) {
        mod('element', 'delete', elements);
    }

    static add(...elements) {
        mod('element', 'add', elements);
    }
}