$(function(event) {
    $('#checkall').click(() => {
        if ($('#checkall').prop('checked')) {
            $('tbody input[type="checkbox"]').prop('checked', true);
        } else {
            $('tbody input[type="checkbox"]').prop('checked', false);
        }
    });

    $('#admin-mount-table').on('click', 'input[type="checkbox"]', () => {
        const check = $('tbody input[type="checkbox"]:checked');
        console.log(check.length);
        if (check.length === 1) {
            $('#getmodule-edit').prop('disabled', false);
        } else {
            $('#getmodule-edit').prop('disabled', true);
        }
    });
});