/* eslint-disable no-undef */
import 'static/style/app.scss';

import application, { assignRes } from 'static/application';

import tModal from 'layout/snippets/_modal.ejs';
import _assign from 'layout/snippets/_assign.ejs';

import { roleFormConfig } from 'app/config';
import { authRes, roleRes } from 'app/static/application/dom';

import { updateResource, role, auth } from 'app/static/apis';


let editTitle = '编辑模块';
let addTitle = '添加模块';

let tempChange = {
    addData: {},
    removeData: {}
};




const title = {
    name: 'role',
    link: '/admin/role'
};


application.run(title, function(that) {

        import(
            /* webpackPrefetch:true */
            /* webpackPreload: true */
            /* webpackChunkName: 'boot' */
            'bootstrap/js/dist/util');
        import(
            /* webpackPrefetch:true */
            /* webpackPreload: true */
            /* webpackChunkName: 'boot' */
            'bootstrap/js/dist/modal');
        import(
            /* webpackPrefetch:true */
            /* webpackPreload: true */
            /* webpackChunkName: 'boot' */
            'bootstrap/js/dist/collapse');
        import(
            /* webpackPrefetch:true */
            /* webpackPreload: true */
            /* webpackChunkName: 'boot' */
            'bootstrap/js/dist/dropdown');
        import(
            /* webpackPrefetch:true */
            /* webpackPreload: true */
            /* webpackChunkName: 'boot' */
            'bootstrap/js/dist/tooltip');
        import('static/script/page/state.js');
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
                    }

                    else if (recipient == '@add') {

                        modal.find('h5').text(addTitle);

                        modal.find('.modal-body').html(tModal({
                            config: roleFormConfig({})
                        }));

                    }

                    return;
                });

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
                });

                $('#adminModal').on('click', '#modal-save', function() {
                        const newRole = new role();

                        for (let index = 0; index < $('#adminModal input').length; index++) {
                            newRole[$('#adminModal input').eq(index).prop('id')] = $('#adminModal input').eq(index).val();
                        }

                        if ($('#adminModal h5').text().trim() == editTitle) {
                            role.edit(newRole);
                        } else if ($('#adminModal h5').text().trim() == addTitle) {
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
                    } else if ($('tbody input[type="checkbox"]:checked').length === 0) {
                        alert('请选中一个');
                    }
                });

                $('#assignModal').on('click', 'input[type="checkbox"]', function(params) {
                    const resAuth = new auth(),
                        $this = $(this),
                        arr = $this.val().split('#'),
                        id = $('tbody input[type="checkbox"]:checked').prop('id'),
                        checkStatus = $(this).prop('checked');
                    resAuth.ownerId = id;
                    resAuth.key = arr[0];
                    resAuth.resourcesId = arr[1];
                    resAuth.id = $this.data('data-id');
                    if (checkStatus && $this.data('data-id')) {
                        delete tempChange['removeData'][arr[1]];
                    } else if (!checkStatus && $this.data('data-id')) {
                        tempChange['removeData'][arr[1]] = resAuth;
                    } else if (checkStatus && !$this.data('data-id')) {
                        tempChange['addData'][arr[1]] = resAuth;
                    } else if (!checkStatus && !$this.data('data-id')) {
                        delete tempChange['addData'][arr[1]];
                    }
                });

                $('#modal-Assign-Save').click(function(params) {
                    let addData = [],
                        removeData = [];
                    for (let [key, item] of Object.entries(tempChange.addData)) {
                        addData.push(item);
                    }

                    for (let [key, item] of Object.entries(tempChange.removeData)) {
                        removeData.push(item);
                    }
                    if (removeData.length > 0 || addData.length > 0) {
                        updateResource(addData, removeData);
                    }
                    tempChange.addData = {};
                    tempChange.removeData = {};
                    $('#assignModal').modal('toggle');
                });
            }

        );
    }

);