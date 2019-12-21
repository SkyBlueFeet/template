import { roleRes, userRes } from '@core/script/application/data';

import { user, auth } from '@core/script/apis';
import _modal from '@core/layout/snippets/_modal.ejs';
import _assignRole from '@core/layout/snippets/_assign-Role.ejs';

import { userFormConfig } from '@core/config';
import { bootstrap } from '@core/script/utils';
import application from '@core/script/application';


let editTitle = '编辑模块';
let addTitle = '添加模块';
let tempChange = {
    add: {},
    remove: {}
};



$(function() {

    $(document).on('show.bs.modal', '#adminModal', function(event) {
        const button = $(event.relatedTarget);
        const modal = $(this);
        const recipient = button.data('whatever');

        let pwdTip = '<div class="alert alert-info" role="alert">用户默认密码为123456</div>';

        if (recipient == '@edit') {

            let id = $('tbody input[type="checkbox"]:checked').prop('id');
            modal.find('h5').text(editTitle);
            modal.find('.modal-body').html(_modal({
                config: userFormConfig(userRes[id])
            }) + pwdTip);

            // $('select#type').val(userRes[id].type);
            for (let index = 0, select = $('#adminModal').find('select'); index < select.length; index++) {
                select.eq(index).val(userRes[id][select.eq(index).prop('id')]);
            }

        } else if (recipient == '@add') {

            modal.find('h5').text(addTitle);
            modal.find('.modal-body').html(_modal({ config: userFormConfig({}) }) + pwdTip);
        }
        return;
    });

    $('#adminModal').on('click', '#modal-save', function() {
        const newUser = new user();

        for (let index = 0; index < $('#adminModal input').length; index++) {
            newUser[$('#adminModal input').eq(index).prop('id')] = $('#adminModal input').eq(index).val();
        }
        for (let index = 0, select = $('#adminModal select'); index < select.length; index++) {
            newUser[select.eq(index).prop('id')] = select.eq(index).val();
        }
        // console.log(new user(123, 456, 789, 7889));

        if ($('#adminModal h5').text().trim() == editTitle) {

            user.edit(newUser);

        } else if ($('#adminModal h5').text().trim() == addTitle) {
            // let nAuth=new auth();
            // nAuth.createUserId=application.$user.id;
            newUser.createUserId = application.$user.id;

            user.add(newUser);

        }

        $('#adminModal').modal('toggle');
        $('#getmodal-Edit').prop('disabled', true);
    });

    $('#adminModal').on('hidden.bs.modal', function() {
        $('.modal-backdrop').remove();
    });

    $('#admin-mount-operator').on('click', '#delete', function() {
        if ($('tbody input[type="checkbox"]:checked').length > 0 && confirm('请问是否确认删除')) {
            for (let index = 0; index < $('tbody input[type="checkbox"]:checked').length; index++) {
                let deleteMod = new user();
                deleteMod.id = $('tbody input[type="checkbox"]:checked').eq(index).prop('id');
                user.delete(deleteMod);
            }
        } else if ($('tbody input[type="checkbox"]:checked').length === 0) {
            alert('请选中一个');
        }
    });

    $('#assignModal').on('show.bs.modal', function(params) {
        const id = $('tbody input[type="checkbox"]:checked').prop('id');
        $(this).find('.modal-body').html(_assignRole(application.getRes('role')));

        if (Array.isArray(roleRes[id])) {
            roleRes[id].forEach(item => {
                let $this = $('#' + item.key + item.resourcesId);
                $this.prop('checked', true);
                $this.data('data-id', item.id);
            });
        }
    });

    $('#assignModal').on('click', 'input[type="checkbox"]', function(params) {
        const resAuth = new auth(),
            $this = $(this),
            arr = $this.val().split('#'),
            id = $('tbody input[type="checkbox"]:checked').prop('id'),
            checkStatus = $(this).prop('checked');
        resAuth.ownerId = id;
        resAuth.key = arr[0];
        resAuth.resourcesId = arr[1];
        resAuth.id = $this.data('data-id');
        if (checkStatus && $this.data('data-id')) {
            delete tempChange['remove'][arr[1]];
        } else if (!checkStatus && $this.data('data-id')) {
            tempChange['remove'][arr[1]] = resAuth;
        } else if (checkStatus && !$this.data('data-id')) {
            tempChange['add'][arr[1]] = resAuth;
        } else if (!checkStatus && !$this.data('data-id')) {
            delete tempChange['add'][arr[1]];
        }

    });

    $('#modal-Assign-Save').click(function(params) {
        let addRole = [];
        let removeRole = [];
        for (let [key, item] of Object.entries(tempChange.add)) {
            addRole.push(item);
        }

        for (let [key, item] of Object.entries(tempChange.remove)) {
            removeRole.push(item);
        }
        if (addRole.length > 0) auth.add(...addRole);
        if (removeRole.length > 0) auth.delete(...removeRole);


        $('#assignModal').modal('toggle');
    });
});

bootstrap();