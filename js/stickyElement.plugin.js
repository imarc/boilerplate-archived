;(function($, window) {

    /**
     * This jQuery plugin provides the ability to stick and unstick elements
     * based on the current scroll position. For example,
     *
     * To have an element scroll with the page until reaches the top, then
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
     *     stopEarly (integer, default 0)
     *         If specified, unsticks the element when it reaches this distance
     *         from the top of an 'until' element.
     */
    var FixedElement = function(elem, options) {
        var defaults = {
            startOffset: 0,
            stopEarly: 0
        };
        options = $.extend(defaults, options);

        var that = this,
            state = 'init',
            elem = $(elem),
            dupe = elem
            .clone()
            .addClass('fixed-element-duplicate')
            .css({
                visibility: 'hidden'
            })
            .insertAfter(elem);

        if ('until' in options) {
            options.until = $(options.until);
        }

        elem.css({
            position: 'absolute'
        });

        that.startAt = function() {
            return dupe.offset().top - options.startOffset;
        };

        that.endAt = function() {
            var offset = that.startAt();
            if ('duration' in options) {
                offset += options.duration;
            } else if ('until' in options) {
                offset = options.until.offset().top;
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

        that.release = function(top) {
            state = 'released';
            elem.css({
                position: 'absolute',
                top: '',
                transform: 'translateZ(0) translate(0, ' + top + 'px)'
            });
        };

        that.fix = function(percentage) {
            var offset = options.startOffset;

            if (percentage !== undefined) {
                offset += (options.endOffset - options.startOffset) * percentage;
            }

            state = 'fixed';
            requestAnimationFrame(function() {
                elem.css({
                    position: 'fixed',
                    top: offset,
                    transform: ''
                });
            });
        };

        that.update = function() {
            var scrollTop = $(window).scrollTop();
            var start = that.startAt(),
                end   = that.endAt();

            if (scrollTop <= start) {
                if (state == 'fixed' || state == 'init') {
                    that.release(0);
                }
            } else if (scrollTop <= end) {
                if ('endOffset' in options && options.endOffset != options.startOffset) {
                    var percentage = (scrollTop - start)/(end - start);
                    that.fix(percentage);
                } else if (state == 'released' || state == 'init') {
                    that.fix(percentage);
                }
            } else {
                if (state == 'fixed' || state == 'init') {
                    if ('endOffset' in options) {
                        that.release(end + options.endOffset - options.startOffset - start);
                    } else {
                        that.release(end - start);
                    }
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
