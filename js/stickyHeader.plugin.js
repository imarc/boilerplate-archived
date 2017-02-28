/**
 *
 * jQuery Sticky Header Plugin
 */

;(function ($) {
    'use strict';

    var $window = $(window);
    $.fn.stickyHeader = function (options) {
        var plugin = this;
        var $body = $('body');

        return this.each(function () {

            // header hide and show on scroll up/down
            var didScroll;
            var lastScrollTop = 0;
            var delta         = 5;
            var initialHeight = $(this).outerHeight();
            var $header       = $(this);

            // set top padding on body so header doesn't overlap content
            $body.css('padding-top', initialHeight);

            $window.scroll(function(event){
                didScroll = true;
            });

            var scrollCheck = function() {
                if (didScroll) {
                    hasScrolled();
                    didScroll = false;
                }
                requestAnimationFrame(scrollCheck);
            };

            requestAnimationFrame(scrollCheck);

            var hasScrolled = function() {
                var height     = $header.outerHeight();
                var scrollPos  = $window.scrollTop();

                var doNothing = (
                    scrollPos == lastScrollTop ||
                    Math.abs(lastScrollTop - scrollPos) <= delta
                );

                if(doNothing) {
                    return;
                }

                // If they scrolled down and are past the header, add class .header-up.

                if (scrollPos > lastScrollTop && scrollPos > height) {
                    // Scroll Down
                    $header
                        .addClass('header-up')
                        .css('top', -height);
                    $body.css('padding-top', height);
                } else {
                    // Scroll Up
                    $header
                        .removeClass('header-up')
                        .css('top', '0');
                }

                lastScrollTop = scrollPos;
            };

            $window.resize(function(){
                var height   = $header.outerHeight();
                hasScrolled();
                $body.css('padding-top', height);
            });

        });
    };

})(jQuery);
