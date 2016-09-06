;(function($) {
    $.fn.dropdown = function() {
        var $navPrimary = $(this);
        var $menuItem   = $('nav.primary > ul > li');
        var $dropdown   = $('nav.primary');

        $menuItem.hover(
            function() {
                $(this).find('.dropdown').addClass('open');            
            },
            function() {
                $(this).find('.dropdown').removeClass('open');            
            }
        );
    };
})(jQuery);

