import 'static/css/layout.scss';
import 'static/plugin/modal/modal.scss';
import 'static/plugin/modal/modal.js';
import 'static/plugin/input/input.scss';
import 'static/css/module.scss';
import mde from 'static/db/module';

import { initModule } from 'static/utils/init';

import storage from 'static/utils/cryptStorage';
import application from 'app/static/web/webConfig';
try {
    application.init();
} catch (error) {
    console.error(error);
}

initModule().then(res => {
    let data = res['data'];
    storage.staticHandle(data, function(params) {
        // console.log(params);
    }).then((e, t) => {

        // console.log(e);
    });
    $(() => {

        let selectOption = '<option value="">root</option>';
        data.forEach(item => {
            selectOption += `<option value="${item['id']}">${item['title']}</option>`;
        });
        $('#parent').html(selectOption);
    });
});



$(() => {
    $('#checkall').click(() => {
        if ($('#checkall').prop('checked')) {
            $('tbody input[type="checkbox"]').prop('checked', true);
        } else {
            $('tbody input[type="checkbox"]').prop('checked', false);
        }
    });

    $('.s-table').on('click', 'input[type="checkbox"]', () => {
        if ($('tbody input[type="checkbox"]:checked').length !== 1) {
            $('#edit-module').prop('disabled', true);
        } else {
            $('#edit-module').prop('disabled', false);
        }
    });

    $('#add-module').click(() => {
        alert(123);
    });

    $('#edit-module').click(() => {
        let t = $('tbody input[type="checkbox"]:checked').parents('tr').children('td');
        $('#title').val(t.eq(1).text());
        $('#id').val(t.eq(1).prop('id'));
        $('#parent').val(t.eq(2).prop('id'));
        $('#key').val(t.eq(3).text());
        $('#order').val(t.eq(4).text());
        $('#link').val(t.eq(5).text());
        $('#remark').val(t.eq(6).text());
        $('.s-modal').slideDown();
    });

    $('#modal-save').click(() => {
        const n = new mde();
        n.id = $('#id').val().trim();
        n.title = $('#title').val().trim();
        n.key = $('#key').val().trim();
        n.parentModuleId = $('#parent').val().trim();
        n.link = $('#link').val().trim();
        n.remark = $('#remark').val().trim();
        n.order = $('#order').val().trim();
        n.edit().then(res => {
            if (res['statusKey'] === 666) {
                initModule(res['data']);
                $('#editModule').prop('disabled', true);
                $('.s-modal').slideUp();
            } else {
                throw new Error(res['message']);
            }
        });
    });

    $('#delete-module').click(() => {
        for (let i = 0; i < $('tbody input[type="checkbox"]:checked').length; i++) {
            const n = new mde($('tbody input[type="checkbox"]:checked').eq(i).parents('tr').children().eq(1).prop('id'));
            n.delete().then(res => {
                if (res['statusKey'] === 666) {
                    initModule(res['data']);
                }
            });
        }
    });
});