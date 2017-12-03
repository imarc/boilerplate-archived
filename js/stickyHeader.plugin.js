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
            var lastScrollTop  = 0;
            var delta          = 5;
            var $header        = $(this);
            var $headerContent = $('.header-content');
            var initialHeight  = $header.outerHeight();
            var $searchDrawer  = $('.search-drawer');
            var $searchToggle  = $('.search-toggle');

            // handle search form toggling
            $searchToggle.on('click', function(e) {
                e.preventDefault();
                $searchDrawer.find('> div').toggleClass('open');
            });

            // set up JS-enabled stuff
            $header.addClass('sticky');
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
                } else {
                    // Scroll Up
                    $header
                        .removeClass('header-up')
                        .css('top', '0');
                }

                lastScrollTop = scrollPos;
            };

            $window.resize(function(){
                // check for inner containter to measure height
                // incase the search drawer is open
                var height = $headerContent.outerHeight();

                $body.css('padding-top', height);
                hasScrolled();
            });

        });
    };

})(jQuery);

