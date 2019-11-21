export const CheckControl = (function(params) {
    $('#checkall').click(() => {
        if ($('#checkall').prop('checked')) {
            $('tbody input[type="checkbox"]').prop('checked', true);
        } else {
            $('tbody input[type="checkbox"]').prop('checked', false);
        }
    });

    $('#admin-mount-table').on('click', 'input[type="checkbox"]', () => {
        const check = $('tbody input[type="checkbox"]:checked');
        if (check.length === 1) {
            $('#getmodal-Edit').prop('disabled', false);
            $('#getmodal-Assign-Resource').prop('disabled', false);
        } else {
            $('#getmodal-Edit').prop('disabled', true);
            $('#getmodal-Assign-Resource').prop('disabled', true);
        }
    });
})();

export const FormControl = (function() {

    // Variables

    var $input = $('.form-control');


    // Methods

    function init($this) {
        $this.on('focus blur', function(e) {
            $(this).parents('.form-group').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
        }).trigger('blur');
    }


    // Events

    if ($input.length) {
        init($input);
    }

})();

export const testFetch = (function(params) {
    import(
        /* webpackPrefetch:true */
        /* webpackPreload: true */
        /*webpackChunkName: 'bootstrap'*/
        'bootstrap/js/dist/util');
    import(
        /* webpackPrefetch:true */
        /* webpackPreload: true */
        /*webpackChunkName: 'bootstrap'*/
        'bootstrap/js/dist/modal');
    import(
        /* webpackPrefetch:true */
        /* webpackPreload: true */
        /*webpackChunkName: 'bootstrap'*/
        'bootstrap/js/dist/collapse');
    import(
        /* webpackPrefetch:true */
        /* webpackPreload: true */
        /*webpackChunkName: 'bootstrap'*/
        'bootstrap/js/dist/dropdown');
    import(
        /* webpackPrefetch:true */
        /* webpackPreload: true */
        /*webpackChunkName: 'bootstrap'*/
        'bootstrap/js/dist/tooltip');
})();