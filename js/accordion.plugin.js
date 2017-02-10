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
                $content.addClass('hidden');
                $header.addClass('close');
            } else {
                $header.addClass('open');
            }

            $header.on('click', function() {

                if(!$(this).hasClass('open') && plugin.settings.singleOpen) {
                    $header.removeClass('open').addClass('close');
                    $content.slideUp();
                }

                $(this)
                    .toggleClass('open close')
                    .siblings('div')
                    .slideToggle();

            });

        });
    };

})(jQuery);