/**
 *
 * jQuery Search Drawer Plugin
 */

;(function($) {
    'use strict';

    $.fn.searchDrawer = function() {
        var $drawer = $('.search-drawer > div')
        var $toggle = $('.search-toggle');

        $toggle.click(function(e) {
            e.preventDefault();
            $(this).toggleClass('close');
            $drawer.toggleClass('open');
            return false;
        });
    };
    
})(jQuery);