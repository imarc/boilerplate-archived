/**
 *
 * jQuery Dropdown Plugin
 */

;(function($) {
    'use strict';

    $.fn.dropdown = function() {
        var $menuItem = $('nav.primary > ul > li');

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

