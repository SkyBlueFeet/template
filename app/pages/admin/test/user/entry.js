/* eslint-disable no-undef */
import 'static/style/app.scss';
import application from 'static/application';

import { user } from 'app/static/db';
import _modal from 'layout/snippets/_modal.ejs';

import { userFormConfig } from 'app/config';

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

const page = {
    name: 'user',
    link: '/admin/test/user'
};



application.run(page, function(that) {
    $(function() {
        import(
            /* webpackPrefetch:true */
            /* webpackPreload: true */
            /*webpackChunkName: 'state'*/
            'static/script'
        );
        $(document).on('show.bs.modal', '#adminModal', function(event) {
            const button = $(event.relatedTarget);
            const modal = $(this);
            const recipient = button.data('whatever');
            let tableQuery = {};
            const moduleData = application.getRes('user');

            moduleData.forEach(ele => {
                tableQuery[ele.id] = ele;
            });

            if (recipient == '@edit') {

                let id = $('tbody input[type="checkbox"]:checked').prop('id');
                modal.find('h5').text(editTitle);
                modal.find('.modal-body').html(_modal({
                    config: userFormConfig(tableQuery[id])
                }));

            } else if (recipient == '@add') {

                modal.find('h5').text(addTitle);
                modal.find('.modal-body').html(_modal({ config: userFormConfig({}) }));

            }
            return;
        });

        $('#adminModal').on('click', '#modal-save', function() {
            const newUser = new user();

            for (let index = 0; index < $('#adminModal input').length; index++) {
                newUser[$('#adminModal input').eq(index).prop('id')] = $('#adminModal input').eq(index).val();
            }

            if ($('#adminModal h5').text().trim() == editTitle) {
                newUser.edit().then(res => {
                    if (res.statusKey === 666) {
                        application.setRes('user', res.data);
                    } else {
                        console.error(res.message);
                    }
                }).catch(err => {
                    console.error(err);
                });
            } else if ($('#adminModal h5').text().trim() == addTitle) {
                newUser.create().then(res => {
                    if (res.statusKey === 666) {
                        application.setRes('user', res.data);
                    } else {
                        console.error(res.message);
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
                    let deleteMod = new user();
                    deleteMod.id = $('tbody input[type="checkbox"]:checked').eq(index).prop('id');
                    deleteMod.delete().then(res => {
                        if (res.statusKey === 666) {
                            application.setRes('user', res.data);
                        } else {
                            console.error(res.message);
                        }
                    });
                }
            } else if ($('tbody input[type="checkbox"]:checked').length === 0) {
                alert('请选中一个');
            }
        });
    });
});