export function elementFormConfig(params = {}, selectOptions = {}) {

    return {
        input: [{
            id: 'id',
            value: params.id,
            type: 'hidden',
            readonly: false
        }, {
            id: 'name',
            label: '名称',
            value: params.name,
            type: 'text',
            readonly: false
        }, {
            id: 'elementName',
            label: '文本',
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
            id: 'name',
            label: '名称',
            value: params.name,
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
            id: 'createUserId',
            label: '创建者',
            value: params.createUserId,
            type: 'text',
            readonly: true
        }],
        select: [{
            id: 'license',
            label: '状态',
            option: '<option value="public">public</option><option selected value="private">private</option>',
            readonly: false,
        }]
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
            id: 'createUserId',
            label: '创建者ID',
            value: params.createUserId,
            type: 'text',
            readonly: true
        }, {
            id: 'createDate',
            label: '创建日期',
            value: params.createDate || '当前时间',
            type: 'text',
            readonly: true
        }],
        select: [{
            id: 'type',
            label: '类型',
            option: '<option value="admin">admin</option><option selected value="normal">normal</option>',
            readonly: false,
        }, {
            id: 'license',
            label: '状态',
            option: '<option value="public">public</option><option selected value="private">private</option>',
            readonly: false,
        }]
    };
}