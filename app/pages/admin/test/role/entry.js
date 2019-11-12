/* eslint-disable no-undef */
import 'static/style/app.scss';

import application, { assignRes } from 'static/application';

import { role, auth } from 'app/static/db';
import tModal from 'layout/snippets/_modal.ejs';
import _assign from 'layout/snippets/_assign.ejs';

import { roleFormConfig } from 'app/config';
import { authRes } from 'app/static/application/dom';

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

let editTitle = '编辑模块';
let addTitle = '添加模块';

let tempChange = {
    add: {},
    remove: {}
};

const title = {
    name: 'role',
    link: '/admin/test/role'
};


application.run(title, function(that) {
        $(function() {
                import('static/script/page/state.js');


                let tableQuery = {};
                const moduleData = application.getRes('role');

                moduleData.forEach(ele => {
                    tableQuery[ele.id] = ele;
                });

                $('#assignModal').find('.modal-body').html(_assign(assignRes));

                $('#adminModal').on('show.bs.modal', function(event) {
                        const button = $(event.relatedTarget),
                            modal = $(this),
                            recipient = button.data('whatever');



                        if (recipient == '@edit') {

                            modal.find('h5').text(editTitle);
                            let id = $('tbody input[type="checkbox"]:checked').prop('id');

                            modal.find('.modal-body').html(tModal({
                                config: roleFormConfig(tableQuery[id])
                            }));

                        }

                        else if (recipient == '@add') {

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

                    authRes[$('tbody input[type="checkbox"]:checked').prop('id')].forEach(item => {
                        let $this = $('#' + item.key + item.resourcesId);
                        $this.prop('checked', true);
                        $this.data('data-id', item.id);
                    });
                });

                $('#adminModal').on('click', '#modal-save', function() {
                        const newRole = new role();

                        for (let index = 0; index < $('#adminModal input').length; index++) {
                            newRole[$('#adminModal input').eq(index).prop('id')] = $('#adminModal input').eq(index).val();
                        }

                        if ($('#adminModal h5').text().trim() == editTitle) {
                            newRole.edit().then(res => {
                                if (res.statusKey === 666) {
                                    that.setRes('role', res.data);
                                }
                            });
                        } else if ($('#adminModal h5').text().trim() == addTitle) {
                            newRole.create().then(res => {
                                if (res.statusKey === 666) {
                                    that.setRes('role', res.data);
                                }
                            });
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

                            deleteMod.delete().then(res => {
                                if (res.statusKey === 666) {
                                    that.setRes('role', res.data);
                                }
                            });
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
                    resAuth.roleName = tableQuery[id]['roleName'];
                    resAuth.id = $this.data('data-id');
                    if (checkStatus && $this.data('data-id')) {
                        delete tempChange['remove'][arr[1]];
                    } else if (!checkStatus && $this.data('data-id')) {
                        tempChange['remove'][arr[1]] = resAuth;
                    } else if (checkStatus && !$this.data('data-id')) {
                        tempChange['add'][arr[1]] = resAuth;
                    } else if (!checkStatus && !$this.data('data-id')) {
                        delete tempChange['add'][arr[1]];
                    }
                });

                $('#modal-Assign-Save').click(function(params) {

                    for (let [key, item] of Object.entries(tempChange.add)) {
                        item.create().then(res => {
                            that.setRes('auth', res.data);
                            delete tempChange.add[key];
                        });

                    }

                    for (let [key, item] of Object.entries(tempChange.remove)) {
                        item.delete().then(res => {
                            that.setRes('auth', res.data);
                            delete tempChange.remove[key];
                        });
                    }

                    $('#assignModal').modal('toggle');
                });
            }

        );
    }

);