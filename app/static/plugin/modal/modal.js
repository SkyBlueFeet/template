$(() => {
    $('.s-modal').on('click', '#modal-close', function(e) {
        $(this).parents('.s-modal').slideUp();
    });
});