export const moduleTableConfig = [
{
    key: 'id',
    value: '<div class="custom-control custom-control-alternative custom-checkbox"><input id="checkall" class="custom-control-input" type="checkbox"><label class="custom-control-label" for="checkall"><span class="text-muted">&nbsp;</span></label></div>'
},
{
    key: 'name',
    value: '名称'
},
{
    key: 'parentModuleTitle',
    value: '父模块'
},
{
    key: 'title',
    value: '文本'
},
{
    key: 'order',
    value: '排序'
},
{
    key: 'link',
    value: '链接'
}];

export const elementTableConfig = [
{
    key: 'id',
    value: '<div class="custom-control custom-control-alternative custom-checkbox"><input id="checkall" class="custom-control-input" type="checkbox"><label class="custom-control-label" for="checkall"><span class="text-muted">&nbsp;</span></label></div>'
}, {
    key: 'name',
    value: '名称'
}, {
    key: 'elementName',
    value: '文本'
}, {
    key: 'moduleTitle',
    value: '所属模块'
}, {
    key: 'containerId',
    value: '容器ID'
}];


export const roleTableConfig = [
{
    key: 'id',
    value: '<div class="custom-control custom-control-alternative custom-checkbox"><input id="checkall" class="custom-control-input" type="checkbox"><label class="custom-control-label" for="checkall"><span class="text-muted">&nbsp;</span></label></div>'
}, {
    key: 'roleName',
    value: '角色名'
}, {
    key: 'license',
    value: '状态'
}, {
    key: 'createUserId',
    value: '创建者'
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
    key: 'type',
    value: '账号类型'
},
{
    key: 'createUserId',
    value: '创建者ID'
},
{
    key: 'createDate',
    value: '创建日期'
}];
export default { moduleTableConfig, elementTableConfig, roleTableConfig, userTableconfig };