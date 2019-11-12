/* eslint-disable no-undef */
import 'static/style/app.scss';

import application from 'static/application';

import { module } from 'app/static/db';
import _modal from 'layout/snippets/_modal.ejs';

import { moduleFormConfig } from 'app/config';

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



function initSelectOption(data) {

    let selectOption = '<option value="root">root</option>';
    data.forEach(item => {
        if (item.parentModuleId == 'root') {
            selectOption += `<option value="${item.id}">${item.title}</option>`;
        }
    });
    return selectOption;
}

const title = {
    name: 'module',
    link: '/admin/test/module'
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
            const moduleData = application.getRes('module');
            moduleData.forEach(ele => {
                tableQuery[ele.id] = ele;
            });
            const options = {
                parentModuleId: initSelectOption(moduleData)
            };

            if (recipient == '@edit') {
                if ($('tbody input[type="checkbox"]:checked') > 1 && $('tbody input[type="checkbox"]:checked') == 0) {
                    alert('请选中一个!');
                    return;
                }
                let id = $('tbody input[type="checkbox"]:checked').prop('id');
                modal.find('h5').text(editTitle);
                modal.find('.modal-body').html(_modal({ config: moduleFormConfig(tableQuery[id], options) }));
                $('#parentModuleId').val(tableQuery[id]['parentModuleId']);

            } else if (recipient == '@add') {

                modal.find('h5').text(addTitle);
                modal.find('.modal-body').html(_modal({ config: moduleFormConfig({}, options) }));

            }
            return;
        });

        $('#adminModal').on('click', '#modal-save', function() {
            const mde = new module();
            mde[$('#adminModal select').eq(0).prop('id')] = $('#adminModal select').eq(0).val() || null;
            mde['parentModuleTitle'] = $('#adminModal option:selected').eq(0).text() || null;
            for (let index = 0; index < $('#adminModal input').length; index++) {
                mde[$('#adminModal input').eq(index).prop('id')] = $('#adminModal input').eq(index).val() || null;
            }

            if ($('#adminModal h5').text().trim() == editTitle) {
                mde.edit().then(res => {
                    if (res.statusKey === 666) {
                        application.setRes('module', res.data);
                        $('.alert').slideDown();
                        setTimeout(() => {
                            $('.alert').slideUp();
                        }, 1000);
                    }
                }).catch(err => {
                    console.error(err);
                });
            } else if ($('#adminModal h5').text().trim() == addTitle) {
                mde.create().then(res => {
                    if (res.statusKey === 666) {
                        application.setRes('module', res.data);
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
                    let deleteMod = new module();
                    deleteMod.id = $('tbody input[type="checkbox"]:checked').eq(index).prop('id');
                    deleteMod.delete().then(res => {
                        if (res.statusKey === 666) {
                            application.setRes('module', res.data);
                        }
                    });
                }
            } else if ($('tbody input[type="checkbox"]:checked').length === 0) {
                alert('请选中一个');
            }
        });
    });
});