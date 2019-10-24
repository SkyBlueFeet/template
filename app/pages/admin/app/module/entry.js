import 'static/style/common/custom.scss';

import 'static/style/common/layout.scss';
import 'static/style/page/module.scss';
import 'bootstrap';
import application from 'app/static/application';
import modalEjs from './modal.ejs';
import { module } from 'app/static/db';

function initSelectOption(data, activeId) {

    let selectOption = '<option value="">root</option>';
    data.forEach(item => {
        if (item.id === activeId) {
            if (item.parentModuleId === null) {
                selectOption += '<option selected value="">root</option>';
            } else {
                selectOption += `<option selected value="${item['parentModuleId']}">${item['parentModuleTitle']}</option>`;
            }
        } else {
            selectOption += `<option value="${item['id']}">${item['title']}</option>`;
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
        let optionStr = initSelectOption(moduleData, tableQuery[id]['id']);
        $('#modal').html(modalEjs({ title: '编辑', form: tableQuery[id], option: optionStr }));
    });

    $('#getmodule-add').click(() => {
        let tableQuery = {};
        const moduleData = application.resource.module;
        moduleData.forEach(ele => {
            tableQuery[ele.id] = ele;
        });
        let id = $('tbody input[type="checkbox"]:checked').prop('id');
        let optionStr = initSelectOption(moduleData);
        $('#modal').html(modalEjs({ title: '新增', form: {}, option: optionStr }));
    });


    $('#modal').on('click', '#modal-save', function() {
        const mde = new module();
        mde[$('#modal select').eq(0).prop('id')] = $('#modal select').eq(0).val();
        mde['parentModuleTitle'] = $('#modal option:selected').eq(0).text();
        if (mde['parentModuleTitle'] == 'root') {
            mde['parentModuleTitle'] = '';
        }
        for (let index = 0; index < $('#modal input').length; index++) {
            mde[$('#modal input').eq(index).prop('id')] = $('#modal input').eq(index).val();
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