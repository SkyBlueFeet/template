import 'static/style/common/custom.scss';

import 'static/style/common/layout.scss';
import 'static/style/page/sidebarpage.scss';
import 'bootstrap';
import application from 'app/static/application';

import { module } from 'app/static/db';
import tModal from 'app/pages/tpl/modal.ejs';

import { moduleFormConfig } from 'app/config';


function initSelectOption(data) {

    let selectOption = '<option value="root">root</option>';
    data.forEach(item => {
        if (item.parentModuleId == 'root') {
            selectOption += `<option value="${item.id}">${item.title}</option>`;
        }
    });
    return selectOption;
}

application.init();

// memory(moduleData);

console.log(application.resource['element']);


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
        const moduleData = application.resource.module;
        moduleData.forEach(ele => {
            tableQuery[ele.id] = ele;
        });
        let id = $('tbody input[type="checkbox"]:checked').prop('id');
        const options = {
            parentModuleId: initSelectOption(application.resource.module)
        };
        $('#modal').html(tModal({ title: '编辑', config: moduleFormConfig(tableQuery[id], options) }));
        $('#parentModuleId').val(tableQuery[id]['parentModuleId']);
    });

    $('#getmodule-add').click(() => {
        let tableQuery = {};
        const moduleData = application.resource.module;
        moduleData.forEach(ele => {
            tableQuery[ele.id] = ele;
        });
        const options = {
            parentModuleId: initSelectOption(moduleData)
        };
        $('#modal').html(tModal({ title: '新增', config: moduleFormConfig({}, options) }));
    });


    $('#modal').on('click', '#modal-save', function() {
        const mde = new module();
        mde[$('#modal select').eq(0).prop('id')] = $('#modal select').eq(0).val() || ' ';
        mde['parentModuleTitle'] = $('#modal option:selected').eq(0).text() || ' ';
        for (let index = 0; index < $('#modal input').length; index++) {
            mde[$('#modal input').eq(index).prop('id')] = $('#modal input').eq(index).val() || ' ';
        }

        if ($('#modal h5').text().trim() == '编辑') {
            mde.edit().then(res => {
                if (res.statusKey === 666) {
                    application.resource.module = res.data;
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
            mde.create().then(res => {
                if (res.statusKey === 666) {
                    application.resource.module = res.data;
                    $('.alert').slideDown();
                    setTimeout(() => {
                        $('.alert').slideUp();
                    }, 2000);
                }
            });
        }
    });

    $('#delete').click(() => {
        if ($('tbody input[type="checkbox"]:checked').length > 0 && confirm('请问是否确认删除')) {
            for (let index = 0; index < $('tbody input[type="checkbox"]:checked').length; index++) {
                let deleteMod = new module();
                deleteMod.id = $('tbody input[type="checkbox"]:checked').eq(index).prop('id');
                deleteMod.delete().then(res => {
                    if (res.statusKey === 666) {
                        application.resource.module = res.data;
                    }
                });
            }
        } else {
            alert('请选中一个');
        }
    });
});