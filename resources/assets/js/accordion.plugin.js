/**
 *
 * jQuery Accordion Plugin
 */

;(function($) {
    'use strict';

    $.fn.accordion = function(options) {
        var plugin = this;

        var defaults = {
            hiddenOnLoad: true,
            singleOpen: true
        };

        plugin.settings = $.extend({}, defaults, options);

        return this.each(function() {

            var $header  = $(this).find('.header');
            var $content = $(this).find('.content');

            if(plugin.settings.hiddenOnLoad) {
                $header.parent().addClass('close initially-hidden');
            } else {
                $header.parent().addClass('open');
            }

            $header.on('click', function() {

                if(!$(this).parent().hasClass('open') && plugin.settings.singleOpen) {
                    $header.parent().removeClass('open').addClass('close');
                    $content.slideUp();
                }

                $(this)
                    .parent()
                    .toggleClass('open close');

                $(this)
                    .siblings('.content')
                    .slideToggle();

            });

        });
    };

})(jQuery);