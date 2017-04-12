/**
 * This jQuery plugin provides the ability to stick and unstick elements
 * based on the current scroll position. For example,
 *
 * To have an element scroll with the page until it reaches the top, then
 * stick to the page:
 *
 *     $('aside.primary section.toc').fix();
 *
 * To do the same, but stick 100 pixels before it reaches the top of the page:
 *
 *     $('aside.primary section.toc').fix({
 *         startOffset: 100
 *     });
 *
 * To stay stuck to the top of the page for 500 pixels of vertical scrolling:
 *
 *     $('.sticky').fix({
 *         startOffset: 100,
 *         duration: 500
 *     });
 *
 *
 *
 * OPTIONS
 *
 *     startOffset (integer, default: 0)
 *         How many pixels from the top of the viewport to start sticking.
 *
 *     endOffset (integer)
 *         If specified and different than startOffset, the sticky element will
 *         animate as you scroll from the startOffset to the endOffset
 *         while the element is fixed.
 *
 *     duration (integer)
 *         If specified, the element will unstick once this number of
 *         pixels has been scrolled.
 *
 *     until (selector)
 *         If specified, the sticky element unsticks when this element scrolls even
 *         with the sticked element.
 *
 *     untilVisible (selector)
 *         If speicifed, the sticky element unstick when any of this element scrolls
 *         into view.
 *
 *     stopEarly (integer, default: 0)
 *         If specified, unsticks the element when it reaches this distance
 *         from the top of an 'until' element.
 */

;(function($, window) {
    'use strict';

    var FixedElement = function(elem, options) {
        var defaults = {
            startOffset: 0,
            stopEarly: 0
        };

        options = $.extend(defaults, options);

        var that = this,
            state = 'init',
            $elem = $(elem),
            $dupe = $elem
            .clone()
            .addClass('fixed-element-duplicate')
            .css({
                visibility: 'hidden'
            })
            .insertAfter($elem);

        if ('until' in options) {
            options.$until = $(options.until);
        }

        if ('untilVisible' in options) {
            options.$untilVisible = $(options.untilVisible);
        }

        $elem.css({
            position: 'absolute'
        });

        this.startAt = function() {
            return $dupe.offset().top - options.startOffset;
        };

        this.endAt = function() {
            var offset = this.startAt();

            if ('duration' in options) {
                offset += options.duration;
            } else if ('until' in options) {
                offset = options.$until.offset().top;
            } else if ('untilVisible' in options) {
                offset = options.$untilVisible.offset().top - $(window).height();
            } else {
                offset = $(document).height();
            }

            if ('endOffset' in options) {
                offset -= options.endOffset;
            } else {
                offset -= options.startOffset;
            }

            return offset - options.stopEarly;
        };

        this.release = function(top) {
            state = 'released';
            $elem.css({
                position: 'absolute',
                top: '',
                transform: 'translateZ(0) translate(0, ' + top + 'px)'
            });
        };

        this.fix = function(additionalOffset) {
            var offset = options.startOffset + additionalOffset;

            state = 'fixed';
            requestAnimationFrame(function() {
                $elem.css({
                    position: 'fixed',
                    top: offset,
                    transform: ''
                });
            });
        };

        this.update = function() {
            var scrollTop   = $(window).scrollTop();
            var start       = that.startAt();
            var end         = that.endAt();
            var diff        = end - start;
            var currentDiff = scrollTop - start;
            var diffOffsets = (options.endOffset - options.startOffset) || 0;

            // Above start
            if (scrollTop <= start) {
                if (state == 'fixed' || state == 'init') {
                    that.release(0);
                }

            // Between start and end
            } else if (scrollTop <= end) {
                if (diffOffsets) {
                    that.fix(diffOffsets * currentDiff / diff);
                } else if (state == 'released' || state == 'init') {
                    that.fix(0);
                }

            // Below end
            } else {
                if (state == 'fixed' || state == 'init') {
                    that.release(diff + diffOffsets);
                }
            }
        };

        $(window).on('scroll resize fix:update', this.update);
        this.update();
    };

    $.fn.fix = function(options) {
        this.each(function() {
            return new FixedElement(this, options);
        });
    };
})(jQuery, window);
