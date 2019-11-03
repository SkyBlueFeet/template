/* eslint-disable no-undef */
import 'static/style/app.scss';


import application from 'static/application';

import { role } from 'app/static/db';
import tModal from 'layout/snippets/_modal.ejs';

import { roleFormConfig } from 'app/config';

import(
    /* webpackPrefetch:true */
    /* webpackPreload: true */
    /*webpackChunkName: 'boot'*/
    'bootstrap/js/dist/util');
import(
    /* webpackPrefetch:true */
    /* webpackPreload: true */
    /*webpackChunkName: 'boot'*/
    'bootstrap/js/dist/modal');
import(
    /* webpackPrefetch:true */
    /* webpackPreload: true */
    /*webpackChunkName: 'boot'*/
    'bootstrap/js/dist/collapse');
import(
    /* webpackPrefetch:true */
    /* webpackPreload: true */
    /*webpackChunkName: 'boot'*/
    'bootstrap/js/dist/dropdown');
import(
    /* webpackPrefetch:true */
    /* webpackPreload: true */
    /*webpackChunkName: 'boot'*/
    'bootstrap/js/dist/tooltip');

let editTitle = '编辑模块';
let addTitle = '添加模块';


const title = {
    name: 'role',
    link: '/admin/test/role'
};



application.run(title, function(that) {
    $(function() {
        import(
            /* webpackPrefetch:true */
            /* webpackPreload: true */
            /*webpackChunkName: 'state'*/
            'static/script/page/state.js'
        );
        $(document).on('show.bs.modal', '#adminModal', function(event) {
            const button = $(event.relatedTarget);
            const modal = $(this);
            const recipient = button.data('whatever');
            let tableQuery = {};
            const moduleData = that.getRes('role');
            moduleData.forEach(ele => {
                tableQuery[ele.id] = ele;
            });

            if (recipient == '@edit') {

                modal.find('h5').text(editTitle);
                let id = $('tbody input[type="checkbox"]:checked').prop('id');

                modal.find('.modal-body').html(tModal({ config: roleFormConfig(tableQuery[id]) }));

            } else if (recipient == '@add') {


                modal.find('h5').text(addTitle);
                modal.find('.modal-body').html(tModal({ config: roleFormConfig({}) }));

            }
            return;
        });

        $('#adminModal').on('click', '#modal-save', function() {
            const newRole = new role();
            for (let index = 0; index < $('#adminModal input').length; index++) {
                newRole[$('#adminModal input').eq(index).prop('id')] = $('#adminModal input').eq(index).val();
            }

            if ($('#adminModal h5').text().trim() == editTitle) {
                newRole.edit().then(res => {
                    if (res.statusKey === 666) {
                        application.setRes('role', res.data);
                    }
                }).catch(err => {
                    console.error(err);
                });
            } else if ($('#adminModal h5').text().trim() == addTitle) {
                newRole.create().then(res => {
                    if (res.statusKey === 666) {
                        application.setRes('role', res.data);
                    }
                });
            }
            $('#adminModal').modal('toggle');
        });

        $('#adminModal').on('hidden.bs.modal', function() {
            $('.modal-backdrop').remove();
            $('#getmodule-edit').prop('disable', false);
        });

        $('#delete').click(() => {
            if ($('tbody input[type="checkbox"]:checked').length > 0 && confirm('请问是否确认删除')) {
                for (let index = 0; index < $('tbody input[type="checkbox"]:checked').length; index++) {
                    let deleteMod = new role();
                    deleteMod.id = $('tbody input[type="checkbox"]:checked').eq(index).prop('id');
                    deleteMod.delete().then(res => {
                        if (res.statusKey === 666) {
                            application.setRes('role', res.data);
                        }
                    });
                }
            } else {
                alert('请选中一个');
            }
        });
    });
});