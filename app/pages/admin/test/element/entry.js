/* eslint-disable no-undef */
import 'static/style/app.scss';

import application from 'static/application';

import _modal from 'layout/snippets/_modal.ejs';
import { element } from 'app/static/db';
import { elementFormConfig } from 'app/config';

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



let editTitle = '编辑';
let addTitle = '添加';


const page = {
    name: 'element',
    link: '/admin/test/element'
};


function initSelectOption(data, activeId) {
    let selectOption = '';
    console.log(activeId);
    console.log(data);
    data.forEach(item => {
        if (item.parentModuleId != 'root') {

            if (item.id === activeId) {
                selectOption += `<option selected value="${item['id']}">${item['title']}</option>`;
            } else {
                selectOption += `<option value="${item['id']}">${item['title']}</option>`;
            }
        }
    });
    return selectOption;
}

application.run(page, function(that) {
    $(() => {
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
            let data = that.getRes('element');
            data.forEach(ele => {
                tableQuery[ele.id] = ele;
            });
            let options = {};

            if (recipient == '@edit') {

                let id = $('tbody input[type="checkbox"]:checked').prop('id');
                options.moduleId = initSelectOption(that.getRes('module'), tableQuery[id]['moduleId']);
                modal.find('h5').text(editTitle);
                modal.find('.modal-body').html(_modal({ config: elementFormConfig(tableQuery[id], options) }));

            } else if (recipient == '@add') {

                options.moduleId = initSelectOption(that.getRes('module'));

                modal.find('h5').text(addTitle);
                modal.find('.modal-body').html(_modal({ config: elementFormConfig({}, options) }));

            }
        });

        $('#adminModal').on('hidden.bs.modal', function() {
            $('.modal-backdrop').remove();
        });

        $('#adminModal').on('shown.bs.modal', function(event) {
            $(this).modal('handleUpdate');
        });

        $('#adminModal').on('click', '#modal-save', function() {
            const newEle = new element();
            newEle[$('#adminModal select').eq(0).prop('id')] = $('#adminModal select').eq(0).val().trim();
            newEle.moduleTitle = $('#adminModal option:selected').eq(0).text();

            for (let index = 0; index < $('#adminModal input').length; index++) {
                newEle[$('#adminModal input').eq(index).prop('id')] = $('#adminModal input').eq(index).val().trim();
            }

            if ($('#adminModal h5').text().trim() == editTitle) {
                newEle.edit().then(res => {
                    if (res.statusKey === 666) {
                        that.setRes('element', res.data);
                    }
                }).catch(err => {
                    console.error(err);
                });
            } else if ($('#adminModal h5').text().trim() == addTitle) {
                newEle.create().then(res => {
                    if (res.statusKey === 666) {
                        that.setRes('element', res.data);
                    }
                });
            }
            // alert($(document, '#delete'));

            $('#getmodule-edit').prop('disabled', true);
            $('#adminModal').modal('hide');
        });

        $('#main').on('click', '#delete', function(event) {
            if ($('tbody input[type="checkbox"]:checked').length > 0 && confirm('是否确认删除?')) {
                for (let index = 0; index < $('tbody input[type="checkbox"]:checked').length; index++) {
                    let deleteMod = new element();
                    deleteMod.id = $('tbody input[type="checkbox"]:checked').eq(index).prop('id');
                    deleteMod.delete().then(res => {
                        if (res.statusKey === 666) {
                            that.setRes('element', res.data);
                        }
                    });
                }
            } else if ($('tbody input[type="checkbox"]:checked').length === 0) {
                alert('请选中一个!');
            }
        });
    });
});