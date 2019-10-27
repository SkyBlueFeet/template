import 'static/style/common/custom.scss';

import 'static/style/common/layout.scss';
import 'static/style/page/sidebarpage.scss';
import 'bootstrap';
import application from 'app/static/application';
import tModal from 'app/pages/tpl/modal.ejs';
import { element } from 'app/static/db';
import { elementFormConfig } from 'app/config';


export const page = {
    local: ''
};


function initSelectOption(data, activeId) {
    let selectOption = '';
    data.forEach(item => {
        if (item.id === activeId) {
            selectOption += `<option selected value="${item['id']}">${item['title']}</option>`;
        } else {
            selectOption += `<option value="${item['id']}">${item['title']}</option>`;
        }
    });
    return selectOption;
}


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
        const moduleData = application.getRes('element').element;
        moduleData.forEach(ele => {
            tableQuery[ele.id] = ele;
        });
        let id = $('tbody input[type="checkbox"]:checked').prop('id');
        const options = {
            moduleId: initSelectOption(application.resource.module, tableQuery[id]['id'])
        };

        $('#modal').html(tModal({ title: '编辑', config: elementFormConfig(tableQuery[id], options) }));
    });

    $('#getmodule-add').click(() => {
        let tableQuery = {};
        const moduleData = application.resource.element;
        moduleData.forEach(ele => {
            tableQuery[ele.id] = ele;
        });
        let id = $('tbody input[type="checkbox"]:checked').prop('id');
        const options = {
            moduleId: initSelectOption(application.resource.module, tableQuery[id]['id'])
        };
        $('#modal').html(tModal({ title: '新增', config: elementFormConfig({}, options) }));
    });


    $('#modal').on('click', '#modal-save', () => {
        const newEle = new element();
        newEle[$('#modal select').eq(0).prop('id')] = $('#modal select').eq(0).val();
        newEle['moduleTitle'] = $('#modal option:selected').eq(0).text();
        for (let index = 0; index < $('#modal input').length; index++) {
            newEle[$('#modal input').eq(index).prop('id')] = $('#modal input').eq(index).val() || ' ';
        }
        console.log(newEle);
        if ($('#modal h5').text().trim() == '编辑') {
            newEle.edit().then(res => {
                if (res.statusKey === 666) {
                    application.resource.element = res.data;
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
            newEle.create().then(res => {
                if (res.statusKey === 666) {
                    application.resource.element = res.data;
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
                let deleteMod = new element();
                deleteMod.id = $('tbody input[type="checkbox"]:checked').eq(index).prop('id');
                deleteMod.delete().then(res => {
                    if (res.statusKey === 666) {
                        application.resource.element = res.data;
                    }
                });
            }
        } else if ($('tbody input[type="checkbox"]:checked').length === 0) {
            alert('请选中一个');
        }
    });
});