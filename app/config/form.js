export function authFormConfig(params = {}) {
    return {
        input: [{
            id: 'id',
            value: params.id,
            type: 'hidden',
            readonly: false
        }, {
            id: 'roleName',
            label: '角色名',
            value: params.roleName,
            type: 'text',
            readonly: false
        }, {
            id: 'operateUserId',
            label: '操作员',
            value: params.operateUserId,
            type: 'text',
            readonly: false
        }, {
            id: 'operateDate',
            label: '操作日期',
            value: params.operateDate || '当前时间',
            type: 'text',
            readonly: true
        }, {
            id: 'description',
            label: '描述',
            value: params.description,
            type: 'text',
            readonly: false
        }, {
            id: 'key',
            label: '标识',
            value: params.key,
            type: 'text',
            readonly: false
        }, {
            id: 'ownerId',
            label: '所有者',
            value: params.ownerId,
            type: 'text',
            readonly: false
        }, {
            id: 'resourcesId',
            label: '资源ID',
            value: params.resourcesId,
            type: 'text',
            readonly: false
        }],
        select: []
    };
}

export function elementFormConfig(params = {}, selectOptions = {}) {

    return {
        input: [{
            id: 'id',
            value: params.id,
            type: 'hidden',
            readonly: false
        }, {
            id: 'elementName',
            label: '元素名',
            value: params.elementName,
            type: 'text',
            readonly: false
        }, {
            id: 'elementId',
            label: '元素ID',
            value: params.elementId,
            type: 'text',
            readonly: false
        }, {
            id: 'containerId',
            label: '容器ID',
            value: params.containerId,
            type: 'text',
            readonly: false
        }, {
            id: 'template',
            label: '模板',
            value: params.template,
            type: 'text',
            readonly: false
        }, {
            id: 'order',
            label: '序列',
            value: params.order,
            type: 'text',
            readonly: false
        }, {
            id: 'key',
            label: '标识',
            value: params.key,
            type: 'text',
            readonly: true
        }, {
            id: 'remark',
            label: '备注',
            value: params.remark,
            type: 'text',
            readonly: false
        }],
        select: [{
            id: 'moduleId',
            label: '模块',
            option: selectOptions.moduleId,
            readonly: false,
        }]
    };
}

export function moduleFormConfig(params = {}, selectOptions = {}) {
    return {
        input: [{
            id: 'id',
            value: params.id,
            type: 'hidden',
            readonly: false
        }, {
            id: 'title',
            label: '模块名',
            value: params.title,
            type: 'text',
            readonly: false
        }, {
            id: 'link',
            label: '链接',
            value: params.link,
            type: 'text',
            readonly: false
        }, {
            id: 'key',
            label: '标识',
            value: params.key,
            type: 'text',
            readonly: false
        }, {
            id: 'order',
            label: '排序',
            value: params.order,
            type: 'text',
            readonly: false
        }, {
            id: 'remark',
            label: '备注',
            value: params.remark,
            type: 'text',
            readonly: false
        }],
        select: [{
            id: 'parentModuleId',
            label: '父模块',
            option: selectOptions.parentModuleId,
            readonly: false,
        }]
    };
}

export function roleFormConfig(params = {}, selectOptions = {}) {
    return {
        input: [{
            id: 'id',
            value: params.id,
            type: 'hidden',
            readonly: false
        }, {
            id: 'roleName',
            label: '角色名',
            value: params.roleName,
            type: 'text',
            readonly: false
        }, {
            id: 'createDate',
            label: '创建日期',
            value: params.createDate || '当前时间',
            type: 'text',
            readonly: true
        }, {
            id: 'createUserName',
            label: '创建者',
            value: params.createUserName,
            type: 'text',
            readonly: false
        }, {
            id: 'createUserId',
            value: params.createUserId,
            type: 'hidden',
            readonly: false
        }],
        select: []
    };
}

export function userFormConfig(params = {}, selectOptions = {}) {
    return {
        input: [{
            id: 'id',
            value: params.id,
            type: 'hidden',
            readonly: false
        }, {
            id: 'userName',
            label: '用户名',
            value: params.userName,
            type: 'text',
            readonly: false
        }, {
            id: 'account',
            label: '账号',
            value: params.account,
            type: 'text',
            readonly: false
        }, {
            id: 'createUserName',
            label: '创建者',
            value: params.createUserName,
            type: 'text',
            readonly: false
        }, {
            id: 'createUserId',
            label: '创建者ID',
            value: params.createUserId,
            type: 'text',
            readonly: false
        }, {
            id: 'createDate',
            label: '创建日期',
            value: params.createDate || '当前时间',
            type: 'text',
            readonly: true
        }],
        select: []
    };
}