/**
 *
 * jQuery Tabs Plugin
 */

;(function($) {
    'use strict';

    $.fn.tabs = function() {
        this.each(function() {
            var $nav   = $(this).find('nav');
            var $tabs  = $nav.find('li');
            var $panel = $(this).find('.panel');

            $tabs.click(function() {
                var $this        = $(this);
                var $i           = $this.index();
                var $activePanel = $panel.eq($i);

                $panel.not($activePanel).removeClass('active');
                $activePanel.addClass('active');

                $this.siblings('li').removeClass('active');
                $this.addClass('active');
            });
        });
    };
    
})(jQuery);