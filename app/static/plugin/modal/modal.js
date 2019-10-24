$(() => {
    jQuery.modal = function(ele, option) {
        if (option === undefined) {
            $(ele).slideDown();
        }
        else if (option == 'close') {
            $(ele).slideUp();
        }
    };
    $('.s-modal').on('click', '#modal-close', () => {
        $.modal('.s-modal', 'close');
    });
});