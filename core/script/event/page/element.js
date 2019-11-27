import _modal from '@core/layout/snippets/_modal.ejs';
import { element } from '@core/script/apis';
import { elementFormConfig } from '@core/config';
import application from '@core/script/application';
import { elementRes } from '@core/script/application/data';
import { bootstrap } from '@core/script/utils';

let editTitle = '编辑';
let addTitle = '添加';

function initSelectOption(data, activeId) {
    let selectOption = '';
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

$(() => {
    $(document).on('show.bs.modal', '#adminModal', function(event) {
        const button = $(event.relatedTarget);
        const modal = $(this);
        const recipient = button.data('whatever');
        let options = {};

        if (recipient == '@edit') {

            let id = $('tbody input[type="checkbox"]:checked').prop('id');
            options.moduleId = initSelectOption(application.getRes('module'), elementRes[id]['moduleId']);
            modal.find('h5').text(editTitle);

            modal.find('.modal-body').html(_modal({ config: elementFormConfig(elementRes[id], options) }));

        } else if (recipient == '@add') {

            options.moduleId = initSelectOption(application.getRes('module'));

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

        for (let index = 0; index < $('#adminModal input').length; index++) {
            newEle[$('#adminModal input').eq(index).prop('id')] = $('#adminModal input').eq(index).val().trim();
        }

        if ($('#adminModal h5').text().trim() == editTitle) {
            element.edit(newEle);
        } else if ($('#adminModal h5').text().trim() == addTitle) {
            element.add(newEle);
        }

        $('#getmodule-edit').prop('disabled', true);
        $('#adminModal').modal('hide');
    });

    $('#main').on('click', '#delete', function(event) {
        if ($('tbody input[type="checkbox"]:checked').length > 0 && confirm('是否确认删除?')) {
            for (let index = 0; index < $('tbody input[type="checkbox"]:checked').length; index++) {
                let deleteMod = new element();
                deleteMod.id = $('tbody input[type="checkbox"]:checked').eq(index).prop('id');
                element.delete(deleteMod);
            }
        } else if ($('tbody input[type="checkbox"]:checked').length === 0) {
            alert('请选中一个!');
        }
    });
});

bootstrap();