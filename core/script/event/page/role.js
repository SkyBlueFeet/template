import tModal from '@core/layout/snippets/_modal.ejs';
import _assign from '@core/layout/snippets/_assign.ejs';


import { roleFormConfig } from '@core/config';

import { authRes, roleRes, moduleRes, treeStructure, assignRes } from '@core/script/application/data';

import { updateResource, role, auth } from '@core/script/apis';

import { bootstrap } from '@core/script/utils';


let editTitle = '编辑模块',
    addTitle = '添加模块',

    tempChange = {
        addData: {},
        removeData: {}
    },

    tempParentReserves = {
        addData: {},
        removeData: {}
    };


function getParentId(rO) {
    if (moduleRes[rO]['parentModuleId'] != 'root') {
        return '#module' + moduleRes[moduleRes[rO]['parentModuleId']].id;
    }
    else {
        return undefined;
    }
}




$(function() {

        $('#adminModal').on('show.bs.modal', function(event) {
                const button = $(event.relatedTarget),
                    modal = $(this),
                    recipient = button.data('whatever');

                if (recipient == '@edit') {

                    modal.find('h5').text(editTitle);
                    let id = $('tbody input[type="checkbox"]:checked').prop('id');

                    modal.find('.modal-body').html(tModal({
                        config: roleFormConfig(roleRes[id])
                    }));
                } else if (recipient == '@add') {

                    modal.find('h5').text(addTitle);

                    modal.find('.modal-body').html(tModal({
                        config: roleFormConfig({})
                    }));

                }

                return;
            }

        );

        $('#assignModal').on('show.bs.modal', function(event) {
                const modal = $(this);
                modal.find('.modal-body').html(_assign(assignRes));

                if (Array.isArray(authRes[$('tbody input[type="checkbox"]:checked').prop('id')])) {
                    authRes[$('tbody input[type="checkbox"]:checked').prop('id')].forEach(item => {
                        let $this = $('#' + item.key + item.resourcesId);
                        $this.prop('checked', true);
                        $this.data('data-id', item.id);
                    });
                }
            }

        );

        $('#adminModal').on('click', '#modal-save', function() {
                const newRole = new role();

                for (let index = 0; index < $('#adminModal input').length; index++) {
                    newRole[$('#adminModal input').eq(index).prop('id')] = $('#adminModal input').eq(index).val();
                }

                if ($('#adminModal h5').text().trim() == editTitle) {
                    role.edit(newRole);
                }

                else if ($('#adminModal h5').text().trim() == addTitle) {
                    role.add(newRole);
                }

                $('#getmodal-Edit').prop('disabled', true);
                $('#adminModal').modal('toggle');
            }

        );

        $('#adminModal').on('hidden.bs.modal', function() {
            $('.modal-backdrop').remove();
        });

        $('#delete').click(() => {
                if ($('tbody input[type="checkbox"]:checked').length > 0 && confirm('请问是否确认删除')) {
                    for (let index = 0; index < $('tbody input[type="checkbox"]:checked').length; index++) {
                        let deleteMod = new role();
                        deleteMod.id = $('tbody input[type="checkbox"]:checked').eq(index).prop('id');

                        role.delete(deleteMod);
                    }
                }

                else if ($('tbody input[type="checkbox"]:checked').length === 0) {
                    alert('请选中一个');
                }
            }

        );

        $('#assignModal').on('click', 'input[type="checkbox"]', function(params) {
                const resAuth = new auth(),
                    parentAuth = new auth(),
                    $this = $(this),
                    arr = $this.val().split('#'),
                    id = $('tbody input[type="checkbox"]:checked').prop('id'),
                    checkStatus = $(this).prop('checked'),
                    moduleHasParent = arr[0] == 'module' && getParentId(arr[1]);
                resAuth.ownerId = id;
                resAuth.key = arr[0];
                resAuth.resourcesId = arr[1];
                resAuth.id = $this.data('data-id');

                if (moduleHasParent) {
                    parentAuth.ownerId = id;
                    parentAuth.key = arr[0];
                    parentAuth.resourcesId = getParentId(arr[1]);
                    parentAuth.id = $(getParentId(arr[1])).data('data-id');
                }

                if (checkStatus && $this.data('data-id')) {
                    delete tempChange['removeData'][arr[1]];
                    if (moduleHasParent) delete tempParentReserves['removeData'][getParentId(arr[1])];
                }

                else if (!checkStatus && $this.data('data-id')) {
                    tempChange['removeData'][arr[1]] = resAuth;
                    if (moduleHasParent) tempParentReserves['removeData'][getParentId(arr[1])] = parentAuth;
                }

                else if (checkStatus && !$this.data('data-id')) {
                    tempChange['addData'][arr[1]] = resAuth;
                    if (moduleHasParent) tempParentReserves['addData'][getParentId(arr[1])] = parentAuth;
                }

                else if (!checkStatus && !$this.data('data-id')) {
                    delete tempChange['addData'][arr[1]];
                    if (moduleHasParent) delete tempParentReserves['addData'][getParentId(arr[1])];
                }
            }

        );

        $('#modal-Assign-Save').click(function(params) {

                let addData = [],
                    removeData = [],
                    a = tempChange.addData,
                    r = tempChange.removeData,
                    aP = tempParentReserves.addData,
                    rP = tempParentReserves.removeData,
                    addParentData = [],
                    removeParentData = [];
                console.log(tempParentReserves);
                // const getParent = mR => (rO, k) => mR[mR[rO[k]['resourcesId']]['parentModuleId']];

                Object.keys(rP).forEach(k => {
                    console.log(Object.keys(aP).includes(k));
                });


                Object.keys(a).forEach(k => {
                    addData.push(a[k]);
                });

                Object.keys(r).forEach(k => {
                    removeData.push(r[k]);
                });

                if (removeData.length > 0 || addData.length > 0) {
                    updateResource(addData, removeData);
                }

                tempChange.addData = {};

                tempChange.removeData = {};

                $('#assignModal').modal('toggle');
            }

        );
    }

);

bootstrap();