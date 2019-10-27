import 'static/style/common/custom.scss';

import 'static/style/common/layout.scss';
import 'static/style/page/sidebarpage.scss';
import 'bootstrap';
import application from 'app/static/application';

import { role } from 'app/static/db';
import tModal from 'app/pages/tpl/modal.ejs';
import { roleFormConfig } from 'app/config';


application.init();


$(() => {
    $('#checkall').click(() => {
        if ($('#checkall').prop('checked')) {
            $('tbody input[type="checkbox"]').prop('checked', true);
        } else {
            $('tbody input[type="checkbox"]').prop('checked', false);
        }
    });

    $('#table-feild').on('click', 'input[type="checkbox"]', () => {
        if ($('tbody input[type="checkbox"]:checked').length !== 1) {
            $('#getmodule-edit').prop('disabled', true);
        } else {
            $('#getmodule-edit').prop('disabled', false);
        }
    });

    $('#getmodule-edit').click(() => {
        let tableQuery = {};
        const moduleData = application.getRes('role').role;
        moduleData.forEach(ele => {
            tableQuery[ele.id] = ele;
        });
        let id = $('tbody input[type="checkbox"]:checked').prop('id');
        // $('#modal').html(modalEjs({ title: '编辑', form: tableQuery[id] }));
        $('#modal').html(tModal({ title: '编辑', config: roleFormConfig(tableQuery[id]) }));
    });

    $('#getmodule-add').click(() => {
        let tableQuery = {};
        const moduleData = application.resource.role;
        moduleData.forEach(ele => {
            tableQuery[ele.id] = ele;
        });
        $('#modal').html(tModal({ title: '新增', config: roleFormConfig() }));
    });


    $('#modal').on('click', '#modal-save', () => {
        const newRole = new role();
        for (let index = 0; index < $('#modal input').length; index++) {
            newRole[$('#modal input').eq(index).prop('id')] = $('#modal input').eq(index).val();
        }
        console.log(newRole);
        if ($('#modal h5').text().trim() == '编辑') {
            newRole.edit().then(res => {
                if (res.statusKey === 666) {
                    application.resource.role = res.data;
                    $('.alert').slideDown();
                    setTimeout(() => {
                        $('.alert').slideUp();
                        $('#exampleModal').modal('hide');
                    }, 1000);
                }
            }).catch(err => {
                console.error(err);
            });
        } else if ($('#modal h5').text().trim() == '新增') {
            newRole.create().then(res => {
                if (res.statusKey === 666) {
                    application.resource.role = res.data;
                    $('.alert').slideDown();
                    setTimeout(() => {
                        $('.alert').slideUp();
                    }, 2000);
                }
            });
        }
    });

    $('#delete').click(() => {
        if ($('tbody input[type="checkbox"]:checked').length > 0 && confirm('是否确认删除?')) {
            for (let index = 0; index < $('tbody input[type="checkbox"]:checked').length; index++) {
                let deleteMod = new role();
                deleteMod.id = $('tbody input[type="checkbox"]:checked').eq(index).prop('id');
                deleteMod.delete().then(res => {
                    if (res.statusKey === 666) {
                        application.resource.role = res.data;
                    }
                });
            }
        } else if ($('tbody input[type="checkbox"]:checked').length === 0) {
            alert('请选中一个');
        }
    });
});