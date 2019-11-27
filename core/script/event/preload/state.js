// Variables

var $input = $('.form-control');


// Methods

function init($this) {
    $this.on('focus blur', function(e) {
        $(this).parents('.form-group').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
    }).trigger('blur');
}

if ($input.length) {
    init($input);
}