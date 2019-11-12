export const moduleTableConfig = [
{
    key: 'id',
    value: '<div class="custom-control custom-control-alternative custom-checkbox"><input id="checkall" class="custom-control-input" type="checkbox"><label class="custom-control-label" for="checkall"><span class="text-muted">&nbsp;</span></label></div>'
},
{
    key: 'title',
    value: '模块名'
},
{
    key: 'parentModuleTitle',
    value: '父模块'
},
{
    key: 'key',
    value: '标识'
},
{
    key: 'order',
    value: '排序'
},
{
    key: 'link',
    value: '链接'
},
{
    key: 'remark',
    value: '备注'
}];

export const elementTableConfig = [
{
    key: 'id',
    value: '<div class="custom-control custom-control-alternative custom-checkbox"><input id="checkall" class="custom-control-input" type="checkbox"><label class="custom-control-label" for="checkall"><span class="text-muted">&nbsp;</span></label></div>'
}, {
    key: 'elementName',
    value: '元素名'
}, {
    key: 'key',
    value: '标识'
}, {
    key: 'moduleTitle',
    value: '所属模块'
}, {
    key: 'remark',
    value: '备注'
}];
/**
 * , {
    key: 'elementId',
    value: '元素ID'
}, {
    key: 'containerId',
    value: '容器ID'
}, {
    key: 'order',
    value: '序列'
}
 */


export const roleTableConfig = [
{
    key: 'id',
    value: '<div class="custom-control custom-control-alternative custom-checkbox"><input id="checkall" class="custom-control-input" type="checkbox"><label class="custom-control-label" for="checkall"><span class="text-muted">&nbsp;</span></label></div>'
}, {
    key: 'roleName',
    value: '角色名'
}, {
    key: 'createDate',
    value: '创建日期'
}, {
    key: 'createUserName',
    value: '创建者'
}];
export const authTableConfig = [
{
    key: 'id',
    value: '<div class="custom-control custom-control-alternative custom-checkbox"><input id="checkall" class="custom-control-input" type="checkbox"><label class="custom-control-label" for="checkall"><span class="text-muted">&nbsp;</span></label></div>'
}, {
    key: 'roleName',
    value: '角色名'
}, {
    key: 'operateUserId',
    value: '操作员名'
}, {
    key: 'operateDate',
    value: '操作时间'
}, {
    key: 'description',
    value: '描述'
}, {
    key: 'key',
    value: '标识'
}, {
    key: 'ownerId',
    value: '拥有者'
}, {
    key: 'resourcesId',
    value: '资源ID'
}];

export const userTableconfig = [
{
    key: 'id',
    value: '<div class="custom-control custom-control-alternative custom-checkbox"><input id="checkall" class="custom-control-input" type="checkbox"><label class="custom-control-label" for="checkall"><span class="text-muted">&nbsp;</span></label></div>'
}, {
    key: 'userName',
    value: '用户名'
},
{
    key: 'account',
    value: '账号'
},
{
    key: 'createUserName',
    value: '创建者'
},
{
    key: 'createUserId',
    value: '创建者ID'
},
{
    key: 'createDate',
    value: '创建日期'
}];
export default { moduleTableConfig, elementTableConfig, roleTableConfig, authTableConfig, userTableconfig };