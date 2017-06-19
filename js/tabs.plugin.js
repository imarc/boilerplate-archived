/**
 *
 * jQuery Tabs Plugin
 */

;(function($) {
    'use strict';

    $.fn.tabs = function() {
        this.each(function() {
            var $tabs  = $(this).find('.tab');
            var $panels = $(this).find('.panel');

            $tabs.click(function() {
                var $this        = $(this);
                var $activePanel = $panels.eq($tabs.index($this));

                $panels.removeClass('active');
                $activePanel.addClass('active');

                $tabs.removeClass('active');
                $this.addClass('active');
            });
        });
    };

})(jQuery);