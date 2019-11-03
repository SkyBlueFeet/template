/* eslint-disable no-undef */
import 'static/style/app.scss';

import application from 'static/application';

import { auth } from 'app/static/db';
import _modal from 'layout/snippets/_modal.ejs';

import { authFormConfig } from 'app/config';

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
    name: 'auth',
    link: '/admin/test/auth'
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
            const moduleData = that.getRes('auth');
            moduleData.forEach(ele => {
                tableQuery[ele.id] = ele;
            });
            console.log(recipient);
            if (recipient == '@edit') {
                modal.find('h5').text(editTitle);
                let id = $('tbody input[type="checkbox"]:checked').prop('id');
                modal.find('.modal-body').html(_modal({ config: authFormConfig(tableQuery[id]) }));

            } else if (recipient == '@add') {
                modal.find('h5').text(addTitle);
                modal.find('.modal-body').html(_modal({ config: authFormConfig() }));
            }
            return;
        });

        $('#adminModal').on('click', '#modal-save', function() {
            const newAuth = new auth();
            for (let index = 0; index < $('#adminModal input').length; index++) {
                newAuth[$('#adminModal input').eq(index).prop('id')] = $('#adminModal input').eq(index).val() || '';
            }

            if ($('#adminModal h5').text().trim() == editTitle) {
                newAuth.edit().then(res => {
                    if (res.statusKey === 666) {
                        application.setRes('auth', res.data);
                        $('.alert').slideDown();
                        setTimeout(() => {
                            $('.alert').slideUp();
                        }, 1000);
                    }
                }).catch(err => {
                    console.error(err);
                });
            } else if ($('#adminModal h5').text().trim() == addTitle) {
                newAuth.create().then(res => {
                    if (res.statusKey === 666) {
                        application.setRes('auth', res.data);
                        $('.alert').slideDown();
                        setTimeout(() => {
                            $('.alert').slideUp();
                        }, 2000);
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
                    let deleteMod = new auth();
                    deleteMod.id = $('tbody input[type="checkbox"]:checked').eq(index).prop('id');
                    deleteMod.delete().then(res => {
                        if (res.statusKey === 666) {
                            application.setRes('auth', res.data);
                        }
                    });
                }
            } else {
                alert('请选中一个');
            }
        });
    });
});