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

            
            if (location.hash) {
                $tabs.each(function(){
                    var $this = $(this);

                    if ($this.data('hash') == location.hash) {
                        $tabs.not($this).removeClass('active');
                        $this.addClass('active');

                        var $activePanel = $panel.eq($this.index());

                        $panel.not($activePanel).removeClass('active');
                        $activePanel.addClass('active');
                    }
                });
            }

            $tabs.click(function() {
                var $this        = $(this);
                var $i           = $this.index();
                var $activePanel = $panel.eq($i);

                $panel.not($activePanel).removeClass('active');
                $activePanel.addClass('active');

                $this.siblings('li').removeClass('active');
                $this.addClass('active');

                var hash = $this.data('hash');

                if (hash != 'undefined') {
                    if (history.pushState) {
                        history.pushState(null, null, hash);
                    } else {
                        location.hash = hash;
                    }
                }
            });
        });
    };
    
})(jQuery);