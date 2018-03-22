webpackJsonp([0],{

/***/ "./resources/assets/js/accordion.plugin.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery) {/**
 *
 * jQuery Accordion Plugin
 */

;(function ($) {
    'use strict';

    $.fn.accordion = function (options) {
        var plugin = this;

        var defaults = {
            hiddenOnLoad: true,
            singleOpen: true
        };

        plugin.settings = $.extend({}, defaults, options);

        return this.each(function () {

            var $header = $(this).find('.header');
            var $content = $(this).find('.content');

            if (plugin.settings.hiddenOnLoad) {
                $header.parent().addClass('close initially-hidden');
            } else {
                $header.parent().addClass('open');
            }

            $header.on('click', function () {

                if (!$(this).parent().hasClass('open') && plugin.settings.singleOpen) {
                    $header.parent().removeClass('open').addClass('close');
                    $content.slideUp();
                }

                $(this).parent().toggleClass('open close');

                $(this).siblings('.content').slideToggle();
            });
        });
    };
})(jQuery);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./resources/assets/js/app.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(jQuery, $) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__accordion_plugin_js__ = __webpack_require__("./resources/assets/js/accordion.plugin.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__accordion_plugin_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__accordion_plugin_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dropdown_plugin_js__ = __webpack_require__("./resources/assets/js/dropdown.plugin.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dropdown_plugin_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__dropdown_plugin_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mobileNavigation_plugin_js__ = __webpack_require__("./resources/assets/js/mobileNavigation.plugin.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mobileNavigation_plugin_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__mobileNavigation_plugin_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__stickyElement_plugin_js__ = __webpack_require__("./resources/assets/js/stickyElement.plugin.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__stickyElement_plugin_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__stickyElement_plugin_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__stickyHeader_plugin_js__ = __webpack_require__("./resources/assets/js/stickyHeader.plugin.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__stickyHeader_plugin_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__stickyHeader_plugin_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tabs_plugin_js__ = __webpack_require__("./resources/assets/js/tabs.plugin.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tabs_plugin_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__tabs_plugin_js__);
window.$ = window.jQuery = jQuery;








$(function () {
    $('nav.primary').dropdown();
    $('header.primary').stickyHeader();
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/jquery/dist/jquery.js"), __webpack_require__("./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./resources/assets/js/dropdown.plugin.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery) {/**
 *
 * jQuery Dropdown Plugin
 */

;(function ($) {
    'use strict';

    $.fn.dropdown = function () {
        var $menuItem = $('nav.primary > ul > li');

        $menuItem.hover(function () {
            $(this).find('.dropdown').addClass('open');
        }, function () {
            $(this).find('.dropdown').removeClass('open');
        });
    };
})(jQuery);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./resources/assets/js/mobileNavigation.plugin.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery) {/**
 *
 * jQuery Mobile Navigation Plugin
 */

;(function ($) {
    'use strict';

    $.fn.mobileNavigation = function (options) {
        var plugin = this;

        var defaults = {
            toggleClass: 'menu-toggle',
            wrapperClass: 'shell',
            subMenuClass: 'dropdown',
            directionFrom: 'left',
            overlayCss: {
                display: 'none',
                background: '#000000',
                bottom: '0%',
                height: '100%',
                left: '0%',
                opacity: '.4',
                position: 'fixed',
                right: '0%',
                top: '0%',
                width: '100%'
            }
        };

        this.settings = $.extend({}, defaults, options);

        this.closeAll = function () {
            toggleAll();
        };

        /**
         *
         * Return CSS selector from class name.
         */

        var toSelector = function toSelector(className) {
            return '.' + className;
        };

        /**
         *
         * Validate optionals params when initializing library.
         */

        var validateOptions = function validateOptions() {

            var classRegExp = new RegExp(/^\./);

            $.each(plugin.settings, function (key, value) {

                if (key === 'directionFrom') {

                    if (value !== 'left' && value !== 'right') {
                        $.error('Wrong direction. Choose  "left" or "right".');
                    }

                    return true;
                }

                if (classRegExp.test(value)) {
                    $.error('The value ' + value + ' for ' + key + ' just needs the class name not css selector.');
                }
            });
        };

        /**
         *
         * Toggles Individual Menu
         * .init sets the menu opacity to 1 to prevent FOUC.
         */

        var toggleMenu = function toggleMenu() {
            if (!$(this).hasClass('init')) {
                $(this).addClass('init');
            }

            $(this).toggleClass('open');
        };

        /**
         *
         *  Toggles All Menus
         */

        var toggleAll = function toggleAll() {
            var toggleSelector = toSelector(plugin.settings.toggleClass);
            var subMenuClass = toSelector(plugin.settings.subMenuClass);
            var $overlay = $(toSelector(plugin.settings.wrapperClass)).find('.mobile-overlay');

            $overlay.toggle();

            toggleFreezeFrame();

            $(toggleSelector).find('i').toggleClass('fa-bars fa-times');

            $(plugin[0].parentNode).find(subMenuClass).each(function () {
                if ($(this).hasClass('open')) {
                    toggleMenu.call(this);
                }
            });

            toggleMenu.call(plugin[0]);
        };

        /**
         *
         * Sets the direction from where the menu animates from.
         */

        var setMenuDirection = function setMenuDirection() {
            var subMenuClass = toSelector(plugin.settings.subMenuClass);

            $(this).addClass(plugin.settings.directionFrom).find(subMenuClass).addClass(plugin.settings.directionFrom);
        };

        /**
         *
         * Toggles the main menu. Closes other sub menus if they're open.
         */

        var bindToggle = function bindToggle() {
            var $toggle = $(toSelector(plugin.settings.toggleClass));

            $toggle.on('click', toggleAll);
        };

        /**
         *
         * Bind sub menu button to toggle child menu.
         */

        var bindSubMenuToggle = function bindSubMenuToggle() {
            var subMenuClass = toSelector(plugin.settings.subMenuClass);
            var $pluginParent = $(plugin[0].parentNode);

            $(this).find('.sub-menu-toggle').on('click', $pluginParent, function () {
                var text = $(this).data('menu');
                toggleMenu.call($(subMenuClass + '[data-menu="' + text + '"]'));
            });
        };

        /**
         *
         * Append buttons to list items with subMenu menus. Add back buttons to menus.
         */

        var appendControl = function appendControl() {
            var subMenuClass = toSelector(plugin.settings.subMenuClass);
            var text = $(this).find('> a').text();

            if ($(this).find(subMenuClass).length == 0) {
                return true;
            }

            $(this).append('<button class="sub-menu-toggle" data-menu="' + text + '"><i class="fa fa-angle-right" aria-hidden="true"></i></button>');

            $(this).find(subMenuClass + ' ul').first().prepend('<li><button class="sub-menu-toggle" data-menu="' + text + '"><i class="fa fa-angle-left" aria-hidden="true"></i> ' + text + '</button></li>');
        };

        /**
         *
         * Find all sub menus and append as a sibling of library's initialized class.
         */

        var cloneAndAppendMenu = function cloneAndAppendMenu() {
            var subMenuClass = toSelector(plugin.settings.subMenuClass);
            var clone = $(this).clone(true, true);
            var pluginParent = plugin[0].parentNode;

            // Remove sub menus from mark up
            $(clone).find(subMenuClass).remove();

            // Checks for sub menu of another sub menu and call function recursively
            if ($(this).find(subMenuClass).length > 0) {
                cloneAndAppendMenu.call($(this).find(subMenuClass));
            }

            // Remove after cloning and appending
            $(this).closest(pluginParent).append(clone).end().remove();
        };

        /**
         *
         *  Set unique identifier on each menu.
         */

        var setMenuId = function setMenuId() {
            var subMenuClass = toSelector(plugin.settings.subMenuClass);
            var text = $(this).siblings('a').text();

            $(this).find(subMenuClass).each(function () {
                var text = $(this).siblings('a').text();
                $(this).attr('data-menu', text).addClass('sub-menu');
            }).end().attr('data-menu', text);
        };

        /**
         *
         * Set up sub menu
         */

        var initSubMenu = function initSubMenu() {
            var subMenuClass = toSelector(plugin.settings.subMenuClass);
            var $menuItems = $(this).find('nav ul li');

            // For each menu item
            $menuItems.each(function () {
                appendControl.call(this);
                bindSubMenuToggle.call(this);
            });

            // For each menu
            $(this).find(subMenuClass).each(function (index) {
                setMenuId.call(this, index);
                cloneAndAppendMenu.call(this);
            });
        };

        /**
         *
         * Insert overlay and bind it to close all menus on click
         */

        var addOverlay = function addOverlay() {
            var overlay = '<div class="mobile-overlay"></div>';
            overlay = $(overlay).css(plugin.settings.overlayCss);

            $(toSelector(plugin.settings.wrapperClass)).append($(overlay));

            $(overlay).on('click', function () {
                toggleAll();
            });
        };

        /*
         *
         * Freeze frame toggle
         */

        var toggleFreezeFrame = function toggleFreezeFrame() {
            var scroll = {
                'height': '100%',
                'overflow': 'hidden'
            };

            if ($(plugin[0]).hasClass('open')) {
                scroll.overflow = 'auto';
            }

            $('html').css(scroll);
        };

        /**
         *
         * Set up main menu
         */
        var init = function init() {
            validateOptions();
            addOverlay();
            setMenuDirection.call(this);
            bindToggle.call(this);
        };

        /**
         *
         * Do this each time the library is initialized
         */

        return this.each(function () {
            init.call(this);
            initSubMenu.call(this);
        });
    };
})(jQuery);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./resources/assets/js/stickyElement.plugin.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery) {/**
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
 *
 *     classWhileFixed (string, default "element-fixed")
 *         This lets you specify a class to add to the element while it's stuck. Defaults to "element-fixed".
 */

;(function ($, window) {
    'use strict';

    var FixedElement = function FixedElement(elem, options) {
        var defaults = {
            classWhileFixed: 'element-fixed',
            startOffset: 0,
            stopEarly: 0
        };

        options = $.extend(defaults, options);

        var that = this,
            state = 'init',
            $elem = $(elem),
            $dupe = $elem.clone().addClass('fixed-element-duplicate').css({
            visibility: 'hidden'
        }).insertAfter($elem);

        if ('until' in options) {
            options.$until = $(options.until);
        }

        if ('untilVisible' in options) {
            options.$untilVisible = $(options.untilVisible);
        }

        $elem.css({
            position: 'absolute'
        });

        this.startAt = function () {
            return $dupe.offset().top - options.startOffset;
        };

        this.endAt = function () {
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

        this.release = function (top) {
            state = 'released';
            $elem.removeClass(options.classWhileFixed).css({
                position: 'absolute',
                top: '',
                transform: 'translateZ(0) translate(0, ' + top + 'px)'
            });
        };

        this.fix = function (additionalOffset) {
            var offset = options.startOffset + additionalOffset;

            state = 'fixed';
            requestAnimationFrame(function () {
                $elem.addClass(options.classWhileFixed).css({
                    position: 'fixed',
                    top: offset,
                    transform: ''
                });
            });
        };

        this.update = function () {
            var scrollTop = $(window).scrollTop();
            var start = that.startAt();
            var end = that.endAt();
            var diff = end - start;
            var currentDiff = scrollTop - start;
            var diffOffsets = options.endOffset - options.startOffset || 0;

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

    $.fn.fix = function (options) {
        this.each(function () {
            return new FixedElement(this, options);
        });
    };
})(jQuery, window);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./resources/assets/js/stickyHeader.plugin.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery) {/**
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
            var delta = 5;
            var $header = $(this);
            var $headerContent = $('.header-content');
            var initialHeight = $header.outerHeight();
            var $searchDrawer = $('.search-drawer');
            var $searchToggle = $('.search-toggle');

            // handle search form toggling
            $searchToggle.on('click', function (e) {
                e.preventDefault();
                $searchDrawer.find('> div').toggleClass('open');
            });

            // set up JS-enabled stuff
            $header.addClass('sticky');
            $body.css('padding-top', initialHeight);

            $window.scroll(function (event) {
                didScroll = true;
            });

            var scrollCheck = function scrollCheck() {
                if (didScroll) {
                    hasScrolled();
                    didScroll = false;
                }
                requestAnimationFrame(scrollCheck);
            };

            requestAnimationFrame(scrollCheck);

            var hasScrolled = function hasScrolled() {
                var height = $header.outerHeight();
                var scrollPos = $window.scrollTop();
                var doNothing = scrollPos == lastScrollTop || Math.abs(lastScrollTop - scrollPos) <= delta;

                if (doNothing) {
                    return;
                }

                // If they scrolled down and are past the header, add class .header-up.
                if (scrollPos > lastScrollTop && scrollPos > height) {
                    // Scroll Down
                    $header.addClass('header-up').css('top', -height);
                } else {
                    // Scroll Up
                    $header.removeClass('header-up').css('top', '0');
                }

                lastScrollTop = scrollPos;
            };

            $window.resize(function () {
                // check for inner containter to measure height
                // incase the search drawer is open
                var height = $headerContent.outerHeight();

                $body.css('padding-top', height);
                hasScrolled();
            });
        });
    };
})(jQuery);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./resources/assets/js/tabs.plugin.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery) {/**
 *
 * jQuery Tabs Plugin
 */

;(function ($) {
    'use strict';

    $.fn.tabs = function () {
        this.each(function () {
            var $nav = $(this).find('nav');
            var $tabs = $nav.find('li');
            var $panel = $(this).find('.panel');

            $tabs.click(function () {
                var $this = $(this);
                var $i = $this.index();
                var $activePanel = $panel.eq($i);

                $panel.not($activePanel).removeClass('active');
                $activePanel.addClass('active');

                $this.siblings('li').removeClass('active');
                $this.addClass('active');
            });
        });
    };
})(jQuery);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./resources/assets/sass/app.scss":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("./resources/assets/js/app.js");
module.exports = __webpack_require__("./resources/assets/sass/app.scss");


/***/ })

},[0]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2FjY29yZGlvbi5wbHVnaW4uanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9kcm9wZG93bi5wbHVnaW4uanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9tb2JpbGVOYXZpZ2F0aW9uLnBsdWdpbi5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3N0aWNreUVsZW1lbnQucGx1Z2luLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvc3RpY2t5SGVhZGVyLnBsdWdpbi5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3RhYnMucGx1Z2luLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvc2Fzcy9hcHAuc2Nzcz8xNGY0Il0sIm5hbWVzIjpbIiQiLCJmbiIsImFjY29yZGlvbiIsIm9wdGlvbnMiLCJwbHVnaW4iLCJkZWZhdWx0cyIsImhpZGRlbk9uTG9hZCIsInNpbmdsZU9wZW4iLCJzZXR0aW5ncyIsImV4dGVuZCIsImVhY2giLCIkaGVhZGVyIiwiZmluZCIsIiRjb250ZW50IiwicGFyZW50IiwiYWRkQ2xhc3MiLCJvbiIsImhhc0NsYXNzIiwicmVtb3ZlQ2xhc3MiLCJzbGlkZVVwIiwidG9nZ2xlQ2xhc3MiLCJzaWJsaW5ncyIsInNsaWRlVG9nZ2xlIiwialF1ZXJ5Iiwid2luZG93IiwiZHJvcGRvd24iLCJzdGlja3lIZWFkZXIiLCIkbWVudUl0ZW0iLCJob3ZlciIsIm1vYmlsZU5hdmlnYXRpb24iLCJ3cmFwcGVyQ2xhc3MiLCJzdWJNZW51Q2xhc3MiLCJkaXJlY3Rpb25Gcm9tIiwib3ZlcmxheUNzcyIsImRpc3BsYXkiLCJiYWNrZ3JvdW5kIiwiYm90dG9tIiwiaGVpZ2h0IiwibGVmdCIsIm9wYWNpdHkiLCJwb3NpdGlvbiIsInJpZ2h0IiwidG9wIiwid2lkdGgiLCJjbG9zZUFsbCIsInRvZ2dsZUFsbCIsInRvU2VsZWN0b3IiLCJjbGFzc05hbWUiLCJ2YWxpZGF0ZU9wdGlvbnMiLCJjbGFzc1JlZ0V4cCIsIlJlZ0V4cCIsImtleSIsInZhbHVlIiwiZXJyb3IiLCJ0ZXN0IiwidG9nZ2xlTWVudSIsInRvZ2dsZVNlbGVjdG9yIiwiJG92ZXJsYXkiLCJ0b2dnbGUiLCJ0b2dnbGVGcmVlemVGcmFtZSIsInBhcmVudE5vZGUiLCJjYWxsIiwic2V0TWVudURpcmVjdGlvbiIsImJpbmRUb2dnbGUiLCIkdG9nZ2xlIiwiYmluZFN1Yk1lbnVUb2dnbGUiLCIkcGx1Z2luUGFyZW50IiwidGV4dCIsImRhdGEiLCJhcHBlbmRDb250cm9sIiwibGVuZ3RoIiwiYXBwZW5kIiwiZmlyc3QiLCJwcmVwZW5kIiwiY2xvbmVBbmRBcHBlbmRNZW51IiwiY2xvbmUiLCJwbHVnaW5QYXJlbnQiLCJyZW1vdmUiLCJjbG9zZXN0IiwiZW5kIiwic2V0TWVudUlkIiwiYXR0ciIsImluaXRTdWJNZW51IiwiJG1lbnVJdGVtcyIsImluZGV4IiwiYWRkT3ZlcmxheSIsIm92ZXJsYXkiLCJjc3MiLCJzY3JvbGwiLCJvdmVyZmxvdyIsImluaXQiLCJGaXhlZEVsZW1lbnQiLCJlbGVtIiwiY2xhc3NXaGlsZUZpeGVkIiwic3RhcnRPZmZzZXQiLCJzdG9wRWFybHkiLCJ0aGF0Iiwic3RhdGUiLCIkZWxlbSIsIiRkdXBlIiwidmlzaWJpbGl0eSIsImluc2VydEFmdGVyIiwiJHVudGlsIiwidW50aWwiLCIkdW50aWxWaXNpYmxlIiwidW50aWxWaXNpYmxlIiwic3RhcnRBdCIsIm9mZnNldCIsImVuZEF0IiwiZHVyYXRpb24iLCJkb2N1bWVudCIsImVuZE9mZnNldCIsInJlbGVhc2UiLCJ0cmFuc2Zvcm0iLCJmaXgiLCJhZGRpdGlvbmFsT2Zmc2V0IiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwidXBkYXRlIiwic2Nyb2xsVG9wIiwic3RhcnQiLCJkaWZmIiwiY3VycmVudERpZmYiLCJkaWZmT2Zmc2V0cyIsIiR3aW5kb3ciLCIkYm9keSIsImRpZFNjcm9sbCIsImxhc3RTY3JvbGxUb3AiLCJkZWx0YSIsIiRoZWFkZXJDb250ZW50IiwiaW5pdGlhbEhlaWdodCIsIm91dGVySGVpZ2h0IiwiJHNlYXJjaERyYXdlciIsIiRzZWFyY2hUb2dnbGUiLCJlIiwicHJldmVudERlZmF1bHQiLCJldmVudCIsInNjcm9sbENoZWNrIiwiaGFzU2Nyb2xsZWQiLCJzY3JvbGxQb3MiLCJkb05vdGhpbmciLCJNYXRoIiwiYWJzIiwicmVzaXplIiwidGFicyIsIiRuYXYiLCIkdGFicyIsIiRwYW5lbCIsImNsaWNrIiwiJHRoaXMiLCIkaSIsIiRhY3RpdmVQYW5lbCIsImVxIiwibm90Il0sIm1hcHBpbmdzIjoiOzs7OztBQUFBOzs7OztBQUtBLENBQUMsQ0FBQyxVQUFTQSxDQUFULEVBQVk7QUFDVjs7QUFFQUEsTUFBRUMsRUFBRixDQUFLQyxTQUFMLEdBQWlCLFVBQVNDLE9BQVQsRUFBa0I7QUFDL0IsWUFBSUMsU0FBUyxJQUFiOztBQUVBLFlBQUlDLFdBQVc7QUFDWEMsMEJBQWMsSUFESDtBQUVYQyx3QkFBWTtBQUZELFNBQWY7O0FBS0FILGVBQU9JLFFBQVAsR0FBa0JSLEVBQUVTLE1BQUYsQ0FBUyxFQUFULEVBQWFKLFFBQWIsRUFBdUJGLE9BQXZCLENBQWxCOztBQUVBLGVBQU8sS0FBS08sSUFBTCxDQUFVLFlBQVc7O0FBRXhCLGdCQUFJQyxVQUFXWCxFQUFFLElBQUYsRUFBUVksSUFBUixDQUFhLFNBQWIsQ0FBZjtBQUNBLGdCQUFJQyxXQUFXYixFQUFFLElBQUYsRUFBUVksSUFBUixDQUFhLFVBQWIsQ0FBZjs7QUFFQSxnQkFBR1IsT0FBT0ksUUFBUCxDQUFnQkYsWUFBbkIsRUFBaUM7QUFDN0JLLHdCQUFRRyxNQUFSLEdBQWlCQyxRQUFqQixDQUEwQix3QkFBMUI7QUFDSCxhQUZELE1BRU87QUFDSEosd0JBQVFHLE1BQVIsR0FBaUJDLFFBQWpCLENBQTBCLE1BQTFC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Q0FBVSxhQUFWLEVBQXlCbEQsTUFBekI7QUFDQW9HO0FBQ0gsYUFQRDtBQVNILFNBekVNLENBQVA7QUEwRUgsS0E5RUQ7QUFnRkgsQ0FwRkEsRUFvRkVsSCxNQXBGRixFOzs7Ozs7OztBQ0xEOzs7OztBQUtBLENBQUMsQ0FBQyxVQUFTdkIsQ0FBVCxFQUFZO0FBQ1Y7O0FBRUFBLE1BQUVDLEVBQUYsQ0FBSzhJLElBQUwsR0FBWSxZQUFXO0FBQ25CLGFBQUtySSxJQUFMLENBQVUsWUFBVztBQUNqQixnQkFBSXNJLE9BQVNoSixFQUFFLElBQUYsRUFBUVksSUFBUixDQUFhLEtBQWIsQ0FBYjtBQUNBLGdCQUFJcUksUUFBU0QsS0FBS3BJLElBQUwsQ0FBVSxJQUFWLENBQWI7QUFDQSxnQkFBSXNJLFNBQVNsSixFQUFFLElBQUYsRUFBUVksSUFBUixDQUFhLFFBQWIsQ0FBYjs7QUFFQXFJLGtCQUFNRSxLQUFOLENBQVksWUFBVztBQUNuQixvQkFBSUMsUUFBZXBKLEVBQUUsSUFBRixDQUFuQjtBQUNBLG9CQUFJcUosS0FBZUQsTUFBTWhFLEtBQU4sRUFBbkI7QUFDQSxvQkFBSWtFLGVBQWVKLE9BQU9LLEVBQVAsQ0FBVUYsRUFBVixDQUFuQjs7QUFFQUgsdUJBQU9NLEdBQVAsQ0FBV0YsWUFBWCxFQUF5QnBJLFdBQXpCLENBQXFDLFFBQXJDO0FBQ0FvSSw2QkFBYXZJLFFBQWIsQ0FBc0IsUUFBdEI7O0FBRUFxSSxzQkFBTS9ILFFBQU4sQ0FBZSxJQUFmLEVBQXFCSCxXQUFyQixDQUFpQyxRQUFqQztBQUNBa0ksc0JBQU1ySSxRQUFOLENBQWUsUUFBZjtBQUNILGFBVkQ7QUFXSCxTQWhCRDtBQWlCSCxLQWxCRDtBQW9CSCxDQXZCQSxFQXVCRVEsTUF2QkYsRTs7Ozs7Ozs7QUNMRCx5QyIsImZpbGUiOiIvanMvYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogalF1ZXJ5IEFjY29yZGlvbiBQbHVnaW5cbiAqL1xuXG47KGZ1bmN0aW9uKCQpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICAkLmZuLmFjY29yZGlvbiA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIHBsdWdpbiA9IHRoaXM7XG5cbiAgICAgICAgdmFyIGRlZmF1bHRzID0ge1xuICAgICAgICAgICAgaGlkZGVuT25Mb2FkOiB0cnVlLFxuICAgICAgICAgICAgc2luZ2xlT3BlbjogdHJ1ZVxuICAgICAgICB9O1xuXG4gICAgICAgIHBsdWdpbi5zZXR0aW5ncyA9ICQuZXh0ZW5kKHt9LCBkZWZhdWx0cywgb3B0aW9ucyk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgdmFyICRoZWFkZXIgID0gJCh0aGlzKS5maW5kKCcuaGVhZGVyJyk7XG4gICAgICAgICAgICB2YXIgJGNvbnRlbnQgPSAkKHRoaXMpLmZpbmQoJy5jb250ZW50Jyk7XG5cbiAgICAgICAgICAgIGlmKHBsdWdpbi5zZXR0aW5ncy5oaWRkZW5PbkxvYWQpIHtcbiAgICAgICAgICAgICAgICAkaGVhZGVyLnBhcmVudCgpLmFkZENsYXNzKCdjbG9zZSBpbml0aWFsbHktaGlkZGVuJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRoZWFkZXIucGFyZW50KCkuYWRkQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJGhlYWRlci5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgICAgIGlmKCEkKHRoaXMpLnBhcmVudCgpLmhhc0NsYXNzKCdvcGVuJykgJiYgcGx1Z2luLnNldHRpbmdzLnNpbmdsZU9wZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgJGhlYWRlci5wYXJlbnQoKS5yZW1vdmVDbGFzcygnb3BlbicpLmFkZENsYXNzKCdjbG9zZScpO1xuICAgICAgICAgICAgICAgICAgICAkY29udGVudC5zbGlkZVVwKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAgICAgICAgICAgLnRvZ2dsZUNsYXNzKCdvcGVuIGNsb3NlJyk7XG5cbiAgICAgICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgIC5zaWJsaW5ncygnLmNvbnRlbnQnKVxuICAgICAgICAgICAgICAgICAgICAuc2xpZGVUb2dnbGUoKTtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSk7XG4gICAgfTtcblxufSkoalF1ZXJ5KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2FjY29yZGlvbi5wbHVnaW4uanMiLCJ3aW5kb3cuJCA9IHdpbmRvdy5qUXVlcnkgPSBqUXVlcnk7XG5cbmltcG9ydCAnLi9hY2NvcmRpb24ucGx1Z2luLmpzJ1xuaW1wb3J0ICcuL2Ryb3Bkb3duLnBsdWdpbi5qcydcbmltcG9ydCAnLi9tb2JpbGVOYXZpZ2F0aW9uLnBsdWdpbi5qcydcbmltcG9ydCAnLi9zdGlja3lFbGVtZW50LnBsdWdpbi5qcydcbmltcG9ydCAnLi9zdGlja3lIZWFkZXIucGx1Z2luLmpzJ1xuaW1wb3J0ICcuL3RhYnMucGx1Z2luLmpzJ1xuXG5cbiQoZnVuY3Rpb24gKCkge1xuICAgICQoJ25hdi5wcmltYXJ5JykuZHJvcGRvd24oKTtcbiAgICAkKCdoZWFkZXIucHJpbWFyeScpLnN0aWNreUhlYWRlcigpO1xufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2FwcC5qcyIsIi8qKlxuICpcbiAqIGpRdWVyeSBEcm9wZG93biBQbHVnaW5cbiAqL1xuXG47KGZ1bmN0aW9uKCQpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICAkLmZuLmRyb3Bkb3duID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciAkbWVudUl0ZW0gPSAkKCduYXYucHJpbWFyeSA+IHVsID4gbGknKTtcblxuICAgICAgICAkbWVudUl0ZW0uaG92ZXIoXG4gICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmZpbmQoJy5kcm9wZG93bicpLmFkZENsYXNzKCdvcGVuJyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5maW5kKCcuZHJvcGRvd24nKS5yZW1vdmVDbGFzcygnb3BlbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH07XG59KShqUXVlcnkpO1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2Ryb3Bkb3duLnBsdWdpbi5qcyIsIi8qKlxuICpcbiAqIGpRdWVyeSBNb2JpbGUgTmF2aWdhdGlvbiBQbHVnaW5cbiAqL1xuXG47KGZ1bmN0aW9uKCQpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICAkLmZuLm1vYmlsZU5hdmlnYXRpb24gPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgIHZhciBwbHVnaW4gPSB0aGlzO1xuXG4gICAgICAgIHZhciBkZWZhdWx0cyA9IHtcbiAgICAgICAgICAgIHRvZ2dsZUNsYXNzOiAnbWVudS10b2dnbGUnLFxuICAgICAgICAgICAgd3JhcHBlckNsYXNzOiAnc2hlbGwnLFxuICAgICAgICAgICAgc3ViTWVudUNsYXNzOiAnZHJvcGRvd24nLFxuICAgICAgICAgICAgZGlyZWN0aW9uRnJvbTogJ2xlZnQnLFxuICAgICAgICAgICAgb3ZlcmxheUNzczoge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdub25lJyxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnIzAwMDAwMCcsXG4gICAgICAgICAgICAgICAgYm90dG9tOiAnMCUnLFxuICAgICAgICAgICAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgICAgICAgICAgIGxlZnQ6ICcwJScsXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogJy40JyxcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcbiAgICAgICAgICAgICAgICByaWdodDogJzAlJyxcbiAgICAgICAgICAgICAgICB0b3A6ICcwJScsXG4gICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG5cbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9ICQuZXh0ZW5kKHt9LCBkZWZhdWx0cywgb3B0aW9ucyk7XG5cbiAgICAgICAgdGhpcy5jbG9zZUFsbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdG9nZ2xlQWxsKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIFJldHVybiBDU1Mgc2VsZWN0b3IgZnJvbSBjbGFzcyBuYW1lLlxuICAgICAgICAgKi9cblxuICAgICAgICB2YXIgdG9TZWxlY3RvciA9IGZ1bmN0aW9uKGNsYXNzTmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuICcuJyArIGNsYXNzTmFtZTtcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogVmFsaWRhdGUgb3B0aW9uYWxzIHBhcmFtcyB3aGVuIGluaXRpYWxpemluZyBsaWJyYXJ5LlxuICAgICAgICAgKi9cblxuICAgICAgICB2YXIgdmFsaWRhdGVPcHRpb25zID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgIHZhciBjbGFzc1JlZ0V4cCA9IG5ldyBSZWdFeHAoL15cXC4vKTtcblxuICAgICAgICAgICAgJC5lYWNoKHBsdWdpbi5zZXR0aW5ncywgZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuXG4gICAgICAgICAgICAgICAgaWYoa2V5ID09PSAnZGlyZWN0aW9uRnJvbScpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZih2YWx1ZSAhPT0gJ2xlZnQnICYmIHZhbHVlICE9PSAncmlnaHQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkLmVycm9yKCdXcm9uZyBkaXJlY3Rpb24uIENob29zZSAgXCJsZWZ0XCIgb3IgXCJyaWdodFwiLicpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoY2xhc3NSZWdFeHAudGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgJC5lcnJvcignVGhlIHZhbHVlICcgKyB2YWx1ZSArICcgZm9yICcgKyBrZXkgKyAnIGp1c3QgbmVlZHMgdGhlIGNsYXNzIG5hbWUgbm90IGNzcyBzZWxlY3Rvci4nKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBUb2dnbGVzIEluZGl2aWR1YWwgTWVudVxuICAgICAgICAgKiAuaW5pdCBzZXRzIHRoZSBtZW51IG9wYWNpdHkgdG8gMSB0byBwcmV2ZW50IEZPVUMuXG4gICAgICAgICAqL1xuXG4gICAgICAgIHZhciB0b2dnbGVNZW51ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZighJCh0aGlzKS5oYXNDbGFzcygnaW5pdCcpKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaW5pdCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqICBUb2dnbGVzIEFsbCBNZW51c1xuICAgICAgICAgKi9cblxuICAgICAgICB2YXIgdG9nZ2xlQWxsID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgdG9nZ2xlU2VsZWN0b3IgPSB0b1NlbGVjdG9yKHBsdWdpbi5zZXR0aW5ncy50b2dnbGVDbGFzcyk7XG4gICAgICAgICAgICB2YXIgc3ViTWVudUNsYXNzICAgPSB0b1NlbGVjdG9yKHBsdWdpbi5zZXR0aW5ncy5zdWJNZW51Q2xhc3MpO1xuICAgICAgICAgICAgdmFyICRvdmVybGF5ICAgICAgID0gJCh0b1NlbGVjdG9yKHBsdWdpbi5zZXR0aW5ncy53cmFwcGVyQ2xhc3MpKS5maW5kKCcubW9iaWxlLW92ZXJsYXknKTtcblxuICAgICAgICAgICAgJG92ZXJsYXkudG9nZ2xlKCk7XG5cbiAgICAgICAgICAgIHRvZ2dsZUZyZWV6ZUZyYW1lKCk7XG5cbiAgICAgICAgICAgICQodG9nZ2xlU2VsZWN0b3IpLmZpbmQoJ2knKS50b2dnbGVDbGFzcygnZmEtYmFycyBmYS10aW1lcycpO1xuXG4gICAgICAgICAgICAkKHBsdWdpblswXS5wYXJlbnROb2RlKVxuICAgICAgICAgICAgICAgIC5maW5kKHN1Yk1lbnVDbGFzcylcbiAgICAgICAgICAgICAgICAuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoJCh0aGlzKS5oYXNDbGFzcygnb3BlbicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2dnbGVNZW51LmNhbGwodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdG9nZ2xlTWVudS5jYWxsKHBsdWdpblswXSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIFNldHMgdGhlIGRpcmVjdGlvbiBmcm9tIHdoZXJlIHRoZSBtZW51IGFuaW1hdGVzIGZyb20uXG4gICAgICAgICAqL1xuXG4gICAgICAgIHZhciBzZXRNZW51RGlyZWN0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgc3ViTWVudUNsYXNzID0gdG9TZWxlY3RvcihwbHVnaW4uc2V0dGluZ3Muc3ViTWVudUNsYXNzKTtcblxuICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcyhwbHVnaW4uc2V0dGluZ3MuZGlyZWN0aW9uRnJvbSlcbiAgICAgICAgICAgICAgICAuZmluZChzdWJNZW51Q2xhc3MpXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKHBsdWdpbi5zZXR0aW5ncy5kaXJlY3Rpb25Gcm9tKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogVG9nZ2xlcyB0aGUgbWFpbiBtZW51LiBDbG9zZXMgb3RoZXIgc3ViIG1lbnVzIGlmIHRoZXkncmUgb3Blbi5cbiAgICAgICAgICovXG5cbiAgICAgICAgdmFyIGJpbmRUb2dnbGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciAkdG9nZ2xlID0gJCh0b1NlbGVjdG9yKHBsdWdpbi5zZXR0aW5ncy50b2dnbGVDbGFzcykpO1xuXG4gICAgICAgICAgICAkdG9nZ2xlLm9uKCdjbGljaycsIHRvZ2dsZUFsbCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEJpbmQgc3ViIG1lbnUgYnV0dG9uIHRvIHRvZ2dsZSBjaGlsZCBtZW51LlxuICAgICAgICAgKi9cblxuICAgICAgICB2YXIgYmluZFN1Yk1lbnVUb2dnbGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBzdWJNZW51Q2xhc3MgID0gdG9TZWxlY3RvcihwbHVnaW4uc2V0dGluZ3Muc3ViTWVudUNsYXNzKTtcbiAgICAgICAgICAgIHZhciAkcGx1Z2luUGFyZW50ID0gJChwbHVnaW5bMF0ucGFyZW50Tm9kZSk7XG5cbiAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgICAuZmluZCgnLnN1Yi1tZW51LXRvZ2dsZScpXG4gICAgICAgICAgICAgICAgLm9uKCdjbGljaycsICRwbHVnaW5QYXJlbnQsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGV4dCA9ICQodGhpcykuZGF0YSgnbWVudScpO1xuICAgICAgICAgICAgICAgICAgICB0b2dnbGVNZW51LmNhbGwoJChzdWJNZW51Q2xhc3MgKyAnW2RhdGEtbWVudT1cIicgKyB0ZXh0ICsgJ1wiXScpKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBBcHBlbmQgYnV0dG9ucyB0byBsaXN0IGl0ZW1zIHdpdGggc3ViTWVudSBtZW51cy4gQWRkIGJhY2sgYnV0dG9ucyB0byBtZW51cy5cbiAgICAgICAgICovXG5cbiAgICAgICAgdmFyIGFwcGVuZENvbnRyb2wgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBzdWJNZW51Q2xhc3MgPSB0b1NlbGVjdG9yKHBsdWdpbi5zZXR0aW5ncy5zdWJNZW51Q2xhc3MpO1xuICAgICAgICAgICAgdmFyIHRleHQgICAgICAgICA9ICQodGhpcykuZmluZCgnPiBhJykudGV4dCgpO1xuXG4gICAgICAgICAgICBpZigkKHRoaXMpLmZpbmQoc3ViTWVudUNsYXNzKS5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgnPGJ1dHRvbiBjbGFzcz1cInN1Yi1tZW51LXRvZ2dsZVwiIGRhdGEtbWVudT1cIicgKyB0ZXh0ICsgJ1wiPjxpIGNsYXNzPVwiZmEgZmEtYW5nbGUtcmlnaHRcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+PC9idXR0b24+Jyk7XG5cbiAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgICAuZmluZChzdWJNZW51Q2xhc3MgKyAnIHVsJykuZmlyc3QoKVxuICAgICAgICAgICAgICAgIC5wcmVwZW5kKCc8bGk+PGJ1dHRvbiBjbGFzcz1cInN1Yi1tZW51LXRvZ2dsZVwiIGRhdGEtbWVudT1cIicgKyB0ZXh0ICsgJ1wiPjxpIGNsYXNzPVwiZmEgZmEtYW5nbGUtbGVmdFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT4gJyArIHRleHQgKyAnPC9idXR0b24+PC9saT4nKVxuXG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEZpbmQgYWxsIHN1YiBtZW51cyBhbmQgYXBwZW5kIGFzIGEgc2libGluZyBvZiBsaWJyYXJ5J3MgaW5pdGlhbGl6ZWQgY2xhc3MuXG4gICAgICAgICAqL1xuXG4gICAgICAgIHZhciBjbG9uZUFuZEFwcGVuZE1lbnUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBzdWJNZW51Q2xhc3MgPSB0b1NlbGVjdG9yKHBsdWdpbi5zZXR0aW5ncy5zdWJNZW51Q2xhc3MpO1xuICAgICAgICAgICAgdmFyIGNsb25lICAgICAgICA9ICQodGhpcykuY2xvbmUodHJ1ZSwgdHJ1ZSk7XG4gICAgICAgICAgICB2YXIgcGx1Z2luUGFyZW50ID0gcGx1Z2luWzBdLnBhcmVudE5vZGU7XG5cbiAgICAgICAgICAgIC8vIFJlbW92ZSBzdWIgbWVudXMgZnJvbSBtYXJrIHVwXG4gICAgICAgICAgICAkKGNsb25lKS5maW5kKHN1Yk1lbnVDbGFzcykucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgIC8vIENoZWNrcyBmb3Igc3ViIG1lbnUgb2YgYW5vdGhlciBzdWIgbWVudSBhbmQgY2FsbCBmdW5jdGlvbiByZWN1cnNpdmVseVxuICAgICAgICAgICAgaWYoJCh0aGlzKS5maW5kKHN1Yk1lbnVDbGFzcykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGNsb25lQW5kQXBwZW5kTWVudS5jYWxsKCQodGhpcykuZmluZChzdWJNZW51Q2xhc3MpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gUmVtb3ZlIGFmdGVyIGNsb25pbmcgYW5kIGFwcGVuZGluZ1xuICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgIC5jbG9zZXN0KHBsdWdpblBhcmVudClcbiAgICAgICAgICAgICAgICAuYXBwZW5kKGNsb25lKVxuICAgICAgICAgICAgICAgIC5lbmQoKVxuICAgICAgICAgICAgICAgIC5yZW1vdmUoKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogIFNldCB1bmlxdWUgaWRlbnRpZmllciBvbiBlYWNoIG1lbnUuXG4gICAgICAgICAqL1xuXG4gICAgICAgIHZhciBzZXRNZW51SWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBzdWJNZW51Q2xhc3MgPSB0b1NlbGVjdG9yKHBsdWdpbi5zZXR0aW5ncy5zdWJNZW51Q2xhc3MpO1xuICAgICAgICAgICAgdmFyIHRleHQgICAgICAgICA9ICQodGhpcykuc2libGluZ3MoJ2EnKS50ZXh0KCk7XG5cbiAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgICAuZmluZChzdWJNZW51Q2xhc3MpXG4gICAgICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZXh0ID0gJCh0aGlzKS5zaWJsaW5ncygnYScpLnRleHQoKTtcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKCdkYXRhLW1lbnUnLCB0ZXh0KS5hZGRDbGFzcygnc3ViLW1lbnUnKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5lbmQoKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdkYXRhLW1lbnUnLCB0ZXh0KTtcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogU2V0IHVwIHN1YiBtZW51XG4gICAgICAgICAqL1xuXG4gICAgICAgIHZhciBpbml0U3ViTWVudSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHN1Yk1lbnVDbGFzcyA9IHRvU2VsZWN0b3IocGx1Z2luLnNldHRpbmdzLnN1Yk1lbnVDbGFzcyk7XG4gICAgICAgICAgICB2YXIgJG1lbnVJdGVtcyAgID0gJCh0aGlzKS5maW5kKCduYXYgdWwgbGknKTtcblxuICAgICAgICAgICAgLy8gRm9yIGVhY2ggbWVudSBpdGVtXG4gICAgICAgICAgICAkbWVudUl0ZW1zXG4gICAgICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGFwcGVuZENvbnRyb2wuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgYmluZFN1Yk1lbnVUb2dnbGUuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gRm9yIGVhY2ggbWVudVxuICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgIC5maW5kKHN1Yk1lbnVDbGFzcylcbiAgICAgICAgICAgICAgICAuZWFjaChmdW5jdGlvbihpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICBzZXRNZW51SWQuY2FsbCh0aGlzLCBpbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIGNsb25lQW5kQXBwZW5kTWVudS5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEluc2VydCBvdmVybGF5IGFuZCBiaW5kIGl0IHRvIGNsb3NlIGFsbCBtZW51cyBvbiBjbGlja1xuICAgICAgICAgKi9cblxuICAgICAgICB2YXIgYWRkT3ZlcmxheSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIG92ZXJsYXkgPSAnPGRpdiBjbGFzcz1cIm1vYmlsZS1vdmVybGF5XCI+PC9kaXY+JztcbiAgICAgICAgICAgIG92ZXJsYXkgICAgID0gJChvdmVybGF5KS5jc3MocGx1Z2luLnNldHRpbmdzLm92ZXJsYXlDc3MpO1xuXG4gICAgICAgICAgICAkKHRvU2VsZWN0b3IocGx1Z2luLnNldHRpbmdzLndyYXBwZXJDbGFzcykpLmFwcGVuZCgkKG92ZXJsYXkpKTtcblxuICAgICAgICAgICAgJChvdmVybGF5KS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0b2dnbGVBbGwoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH07XG5cbiAgICAgICAgLypcbiAgICAgICAgICpcbiAgICAgICAgICogRnJlZXplIGZyYW1lIHRvZ2dsZVxuICAgICAgICAgKi9cblxuICAgICAgICB2YXIgdG9nZ2xlRnJlZXplRnJhbWUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBzY3JvbGwgPSB7XG4gICAgICAgICAgICAgICAgJ2hlaWdodCc6ICcxMDAlJyxcbiAgICAgICAgICAgICAgICAnb3ZlcmZsb3cnOiAnaGlkZGVuJ1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYoJChwbHVnaW5bMF0pLmhhc0NsYXNzKCdvcGVuJykpIHtcbiAgICAgICAgICAgICAgICBzY3JvbGwub3ZlcmZsb3cgPSAnYXV0byc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICQoJ2h0bWwnKS5jc3Moc2Nyb2xsKTtcblxuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBTZXQgdXAgbWFpbiBtZW51XG4gICAgICAgICAqL1xuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFsaWRhdGVPcHRpb25zKCk7XG4gICAgICAgICAgICBhZGRPdmVybGF5KCk7XG4gICAgICAgICAgICBzZXRNZW51RGlyZWN0aW9uLmNhbGwodGhpcyk7XG4gICAgICAgICAgICBiaW5kVG9nZ2xlLmNhbGwodGhpcyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIERvIHRoaXMgZWFjaCB0aW1lIHRoZSBsaWJyYXJ5IGlzIGluaXRpYWxpemVkXG4gICAgICAgICAqL1xuXG4gICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpbml0LmNhbGwodGhpcyk7XG4gICAgICAgICAgICBpbml0U3ViTWVudS5jYWxsKHRoaXMpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG59KShqUXVlcnkpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9tb2JpbGVOYXZpZ2F0aW9uLnBsdWdpbi5qcyIsIi8qKlxuICogVGhpcyBqUXVlcnkgcGx1Z2luIHByb3ZpZGVzIHRoZSBhYmlsaXR5IHRvIHN0aWNrIGFuZCB1bnN0aWNrIGVsZW1lbnRzXG4gKiBiYXNlZCBvbiB0aGUgY3VycmVudCBzY3JvbGwgcG9zaXRpb24uIEZvciBleGFtcGxlLFxuICpcbiAqIFRvIGhhdmUgYW4gZWxlbWVudCBzY3JvbGwgd2l0aCB0aGUgcGFnZSB1bnRpbCBpdCByZWFjaGVzIHRoZSB0b3AsIHRoZW5cbiAqIHN0aWNrIHRvIHRoZSBwYWdlOlxuICpcbiAqICAgICAkKCdhc2lkZS5wcmltYXJ5IHNlY3Rpb24udG9jJykuZml4KCk7XG4gKlxuICogVG8gZG8gdGhlIHNhbWUsIGJ1dCBzdGljayAxMDAgcGl4ZWxzIGJlZm9yZSBpdCByZWFjaGVzIHRoZSB0b3Agb2YgdGhlIHBhZ2U6XG4gKlxuICogICAgICQoJ2FzaWRlLnByaW1hcnkgc2VjdGlvbi50b2MnKS5maXgoe1xuICogICAgICAgICBzdGFydE9mZnNldDogMTAwXG4gKiAgICAgfSk7XG4gKlxuICogVG8gc3RheSBzdHVjayB0byB0aGUgdG9wIG9mIHRoZSBwYWdlIGZvciA1MDAgcGl4ZWxzIG9mIHZlcnRpY2FsIHNjcm9sbGluZzpcbiAqXG4gKiAgICAgJCgnLnN0aWNreScpLmZpeCh7XG4gKiAgICAgICAgIHN0YXJ0T2Zmc2V0OiAxMDAsXG4gKiAgICAgICAgIGR1cmF0aW9uOiA1MDBcbiAqICAgICB9KTtcbiAqXG4gKlxuICpcbiAqIE9QVElPTlNcbiAqXG4gKiAgICAgc3RhcnRPZmZzZXQgKGludGVnZXIsIGRlZmF1bHQ6IDApXG4gKiAgICAgICAgIEhvdyBtYW55IHBpeGVscyBmcm9tIHRoZSB0b3Agb2YgdGhlIHZpZXdwb3J0IHRvIHN0YXJ0IHN0aWNraW5nLlxuICpcbiAqICAgICBlbmRPZmZzZXQgKGludGVnZXIpXG4gKiAgICAgICAgIElmIHNwZWNpZmllZCBhbmQgZGlmZmVyZW50IHRoYW4gc3RhcnRPZmZzZXQsIHRoZSBzdGlja3kgZWxlbWVudCB3aWxsXG4gKiAgICAgICAgIGFuaW1hdGUgYXMgeW91IHNjcm9sbCBmcm9tIHRoZSBzdGFydE9mZnNldCB0byB0aGUgZW5kT2Zmc2V0XG4gKiAgICAgICAgIHdoaWxlIHRoZSBlbGVtZW50IGlzIGZpeGVkLlxuICpcbiAqICAgICBkdXJhdGlvbiAoaW50ZWdlcilcbiAqICAgICAgICAgSWYgc3BlY2lmaWVkLCB0aGUgZWxlbWVudCB3aWxsIHVuc3RpY2sgb25jZSB0aGlzIG51bWJlciBvZlxuICogICAgICAgICBwaXhlbHMgaGFzIGJlZW4gc2Nyb2xsZWQuXG4gKlxuICogICAgIHVudGlsIChzZWxlY3RvcilcbiAqICAgICAgICAgSWYgc3BlY2lmaWVkLCB0aGUgc3RpY2t5IGVsZW1lbnQgdW5zdGlja3Mgd2hlbiB0aGlzIGVsZW1lbnQgc2Nyb2xscyBldmVuXG4gKiAgICAgICAgIHdpdGggdGhlIHN0aWNrZWQgZWxlbWVudC5cbiAqXG4gKiAgICAgdW50aWxWaXNpYmxlIChzZWxlY3RvcilcbiAqICAgICAgICAgSWYgc3BlaWNpZmVkLCB0aGUgc3RpY2t5IGVsZW1lbnQgdW5zdGljayB3aGVuIGFueSBvZiB0aGlzIGVsZW1lbnQgc2Nyb2xsc1xuICogICAgICAgICBpbnRvIHZpZXcuXG4gKlxuICogICAgIHN0b3BFYXJseSAoaW50ZWdlciwgZGVmYXVsdDogMClcbiAqICAgICAgICAgSWYgc3BlY2lmaWVkLCB1bnN0aWNrcyB0aGUgZWxlbWVudCB3aGVuIGl0IHJlYWNoZXMgdGhpcyBkaXN0YW5jZVxuICogICAgICAgICBmcm9tIHRoZSB0b3Agb2YgYW4gJ3VudGlsJyBlbGVtZW50LlxuICpcbiAqICAgICBjbGFzc1doaWxlRml4ZWQgKHN0cmluZywgZGVmYXVsdCBcImVsZW1lbnQtZml4ZWRcIilcbiAqICAgICAgICAgVGhpcyBsZXRzIHlvdSBzcGVjaWZ5IGEgY2xhc3MgdG8gYWRkIHRvIHRoZSBlbGVtZW50IHdoaWxlIGl0J3Mgc3R1Y2suIERlZmF1bHRzIHRvIFwiZWxlbWVudC1maXhlZFwiLlxuICovXG5cbjsoZnVuY3Rpb24oJCwgd2luZG93KSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgdmFyIEZpeGVkRWxlbWVudCA9IGZ1bmN0aW9uKGVsZW0sIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIGRlZmF1bHRzID0ge1xuICAgICAgICAgICAgY2xhc3NXaGlsZUZpeGVkOiAnZWxlbWVudC1maXhlZCcsXG4gICAgICAgICAgICBzdGFydE9mZnNldDogMCxcbiAgICAgICAgICAgIHN0b3BFYXJseTogMFxuICAgICAgICB9O1xuXG4gICAgICAgIG9wdGlvbnMgPSAkLmV4dGVuZChkZWZhdWx0cywgb3B0aW9ucyk7XG5cbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzLFxuICAgICAgICAgICAgc3RhdGUgPSAnaW5pdCcsXG4gICAgICAgICAgICAkZWxlbSA9ICQoZWxlbSksXG4gICAgICAgICAgICAkZHVwZSA9ICRlbGVtXG4gICAgICAgICAgICAuY2xvbmUoKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdmaXhlZC1lbGVtZW50LWR1cGxpY2F0ZScpXG4gICAgICAgICAgICAuY3NzKHtcbiAgICAgICAgICAgICAgICB2aXNpYmlsaXR5OiAnaGlkZGVuJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5pbnNlcnRBZnRlcigkZWxlbSk7XG5cbiAgICAgICAgaWYgKCd1bnRpbCcgaW4gb3B0aW9ucykge1xuICAgICAgICAgICAgb3B0aW9ucy4kdW50aWwgPSAkKG9wdGlvbnMudW50aWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCd1bnRpbFZpc2libGUnIGluIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIG9wdGlvbnMuJHVudGlsVmlzaWJsZSA9ICQob3B0aW9ucy51bnRpbFZpc2libGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgJGVsZW0uY3NzKHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuc3RhcnRBdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuICRkdXBlLm9mZnNldCgpLnRvcCAtIG9wdGlvbnMuc3RhcnRPZmZzZXQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5lbmRBdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIG9mZnNldCA9IHRoaXMuc3RhcnRBdCgpO1xuXG4gICAgICAgICAgICBpZiAoJ2R1cmF0aW9uJyBpbiBvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgb2Zmc2V0ICs9IG9wdGlvbnMuZHVyYXRpb247XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCd1bnRpbCcgaW4gb3B0aW9ucykge1xuICAgICAgICAgICAgICAgIG9mZnNldCA9IG9wdGlvbnMuJHVudGlsLm9mZnNldCgpLnRvcDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoJ3VudGlsVmlzaWJsZScgaW4gb3B0aW9ucykge1xuICAgICAgICAgICAgICAgIG9mZnNldCA9IG9wdGlvbnMuJHVudGlsVmlzaWJsZS5vZmZzZXQoKS50b3AgLSAkKHdpbmRvdykuaGVpZ2h0KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG9mZnNldCA9ICQoZG9jdW1lbnQpLmhlaWdodCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoJ2VuZE9mZnNldCcgaW4gb3B0aW9ucykge1xuICAgICAgICAgICAgICAgIG9mZnNldCAtPSBvcHRpb25zLmVuZE9mZnNldDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb2Zmc2V0IC09IG9wdGlvbnMuc3RhcnRPZmZzZXQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBvZmZzZXQgLSBvcHRpb25zLnN0b3BFYXJseTtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLnJlbGVhc2UgPSBmdW5jdGlvbih0b3ApIHtcbiAgICAgICAgICAgIHN0YXRlID0gJ3JlbGVhc2VkJztcbiAgICAgICAgICAgICRlbGVtLnJlbW92ZUNsYXNzKG9wdGlvbnMuY2xhc3NXaGlsZUZpeGVkKVxuICAgICAgICAgICAgICAgIC5jc3Moe1xuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWigwKSB0cmFuc2xhdGUoMCwgJyArIHRvcCArICdweCknXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5maXggPSBmdW5jdGlvbihhZGRpdGlvbmFsT2Zmc2V0KSB7XG4gICAgICAgICAgICB2YXIgb2Zmc2V0ID0gb3B0aW9ucy5zdGFydE9mZnNldCArIGFkZGl0aW9uYWxPZmZzZXQ7XG5cbiAgICAgICAgICAgIHN0YXRlID0gJ2ZpeGVkJztcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkZWxlbS5hZGRDbGFzcyhvcHRpb25zLmNsYXNzV2hpbGVGaXhlZClcbiAgICAgICAgICAgICAgICAgICAgLmNzcyh7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogb2Zmc2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAnJ1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMudXBkYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgc2Nyb2xsVG9wICAgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG4gICAgICAgICAgICB2YXIgc3RhcnQgICAgICAgPSB0aGF0LnN0YXJ0QXQoKTtcbiAgICAgICAgICAgIHZhciBlbmQgICAgICAgICA9IHRoYXQuZW5kQXQoKTtcbiAgICAgICAgICAgIHZhciBkaWZmICAgICAgICA9IGVuZCAtIHN0YXJ0O1xuICAgICAgICAgICAgdmFyIGN1cnJlbnREaWZmID0gc2Nyb2xsVG9wIC0gc3RhcnQ7XG4gICAgICAgICAgICB2YXIgZGlmZk9mZnNldHMgPSAob3B0aW9ucy5lbmRPZmZzZXQgLSBvcHRpb25zLnN0YXJ0T2Zmc2V0KSB8fCAwO1xuXG4gICAgICAgICAgICAvLyBBYm92ZSBzdGFydFxuICAgICAgICAgICAgaWYgKHNjcm9sbFRvcCA8PSBzdGFydCkge1xuICAgICAgICAgICAgICAgIGlmIChzdGF0ZSA9PSAnZml4ZWQnIHx8IHN0YXRlID09ICdpbml0Jykge1xuICAgICAgICAgICAgICAgICAgICB0aGF0LnJlbGVhc2UoMCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBCZXR3ZWVuIHN0YXJ0IGFuZCBlbmRcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2Nyb2xsVG9wIDw9IGVuZCkge1xuICAgICAgICAgICAgICAgIGlmIChkaWZmT2Zmc2V0cykge1xuICAgICAgICAgICAgICAgICAgICB0aGF0LmZpeChkaWZmT2Zmc2V0cyAqIGN1cnJlbnREaWZmIC8gZGlmZik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PSAncmVsZWFzZWQnIHx8IHN0YXRlID09ICdpbml0Jykge1xuICAgICAgICAgICAgICAgICAgICB0aGF0LmZpeCgwKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEJlbG93IGVuZFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoc3RhdGUgPT0gJ2ZpeGVkJyB8fCBzdGF0ZSA9PSAnaW5pdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5yZWxlYXNlKGRpZmYgKyBkaWZmT2Zmc2V0cyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgICQod2luZG93KS5vbignc2Nyb2xsIHJlc2l6ZSBmaXg6dXBkYXRlJywgdGhpcy51cGRhdGUpO1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH07XG5cbiAgICAkLmZuLmZpeCA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBGaXhlZEVsZW1lbnQodGhpcywgb3B0aW9ucyk7XG4gICAgICAgIH0pO1xuICAgIH07XG59KShqUXVlcnksIHdpbmRvdyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3N0aWNreUVsZW1lbnQucGx1Z2luLmpzIiwiLyoqXG4gKlxuICogalF1ZXJ5IFN0aWNreSBIZWFkZXIgUGx1Z2luXG4gKi9cblxuOyhmdW5jdGlvbiAoJCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIHZhciAkd2luZG93ID0gJCh3aW5kb3cpO1xuICAgICQuZm4uc3RpY2t5SGVhZGVyID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIHBsdWdpbiA9IHRoaXM7XG4gICAgICAgIHZhciAkYm9keSA9ICQoJ2JvZHknKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgLy8gaGVhZGVyIGhpZGUgYW5kIHNob3cgb24gc2Nyb2xsIHVwL2Rvd25cbiAgICAgICAgICAgIHZhciBkaWRTY3JvbGw7XG4gICAgICAgICAgICB2YXIgbGFzdFNjcm9sbFRvcCAgPSAwO1xuICAgICAgICAgICAgdmFyIGRlbHRhICAgICAgICAgID0gNTtcbiAgICAgICAgICAgIHZhciAkaGVhZGVyICAgICAgICA9ICQodGhpcyk7XG4gICAgICAgICAgICB2YXIgJGhlYWRlckNvbnRlbnQgPSAkKCcuaGVhZGVyLWNvbnRlbnQnKTtcbiAgICAgICAgICAgIHZhciBpbml0aWFsSGVpZ2h0ICA9ICRoZWFkZXIub3V0ZXJIZWlnaHQoKTtcbiAgICAgICAgICAgIHZhciAkc2VhcmNoRHJhd2VyICA9ICQoJy5zZWFyY2gtZHJhd2VyJyk7XG4gICAgICAgICAgICB2YXIgJHNlYXJjaFRvZ2dsZSAgPSAkKCcuc2VhcmNoLXRvZ2dsZScpO1xuXG4gICAgICAgICAgICAvLyBoYW5kbGUgc2VhcmNoIGZvcm0gdG9nZ2xpbmdcbiAgICAgICAgICAgICRzZWFyY2hUb2dnbGUub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAkc2VhcmNoRHJhd2VyLmZpbmQoJz4gZGl2JykudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBzZXQgdXAgSlMtZW5hYmxlZCBzdHVmZlxuICAgICAgICAgICAgJGhlYWRlci5hZGRDbGFzcygnc3RpY2t5Jyk7XG4gICAgICAgICAgICAkYm9keS5jc3MoJ3BhZGRpbmctdG9wJywgaW5pdGlhbEhlaWdodCk7XG5cbiAgICAgICAgICAgICR3aW5kb3cuc2Nyb2xsKGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICAgICAgICBkaWRTY3JvbGwgPSB0cnVlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHZhciBzY3JvbGxDaGVjayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmIChkaWRTY3JvbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgaGFzU2Nyb2xsZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgZGlkU2Nyb2xsID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShzY3JvbGxDaGVjayk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc2Nyb2xsQ2hlY2spO1xuXG4gICAgICAgICAgICB2YXIgaGFzU2Nyb2xsZWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgaGVpZ2h0ICAgICA9ICRoZWFkZXIub3V0ZXJIZWlnaHQoKTtcbiAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsUG9zICA9ICR3aW5kb3cuc2Nyb2xsVG9wKCk7XG4gICAgICAgICAgICAgICAgdmFyIGRvTm90aGluZyA9IChcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsUG9zID09IGxhc3RTY3JvbGxUb3AgfHxcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5hYnMobGFzdFNjcm9sbFRvcCAtIHNjcm9sbFBvcykgPD0gZGVsdGFcbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgaWYoZG9Ob3RoaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBJZiB0aGV5IHNjcm9sbGVkIGRvd24gYW5kIGFyZSBwYXN0IHRoZSBoZWFkZXIsIGFkZCBjbGFzcyAuaGVhZGVyLXVwLlxuICAgICAgICAgICAgICAgIGlmIChzY3JvbGxQb3MgPiBsYXN0U2Nyb2xsVG9wICYmIHNjcm9sbFBvcyA+IGhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBTY3JvbGwgRG93blxuICAgICAgICAgICAgICAgICAgICAkaGVhZGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2hlYWRlci11cCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAuY3NzKCd0b3AnLCAtaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBTY3JvbGwgVXBcbiAgICAgICAgICAgICAgICAgICAgJGhlYWRlclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdoZWFkZXItdXAnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmNzcygndG9wJywgJzAnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsYXN0U2Nyb2xsVG9wID0gc2Nyb2xsUG9zO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgJHdpbmRvdy5yZXNpemUoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAvLyBjaGVjayBmb3IgaW5uZXIgY29udGFpbnRlciB0byBtZWFzdXJlIGhlaWdodFxuICAgICAgICAgICAgICAgIC8vIGluY2FzZSB0aGUgc2VhcmNoIGRyYXdlciBpcyBvcGVuXG4gICAgICAgICAgICAgICAgdmFyIGhlaWdodCA9ICRoZWFkZXJDb250ZW50Lm91dGVySGVpZ2h0KCk7XG5cbiAgICAgICAgICAgICAgICAkYm9keS5jc3MoJ3BhZGRpbmctdG9wJywgaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICBoYXNTY3JvbGxlZCgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSk7XG4gICAgfTtcblxufSkoalF1ZXJ5KTtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zdGlja3lIZWFkZXIucGx1Z2luLmpzIiwiLyoqXG4gKlxuICogalF1ZXJ5IFRhYnMgUGx1Z2luXG4gKi9cblxuOyhmdW5jdGlvbigkKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgJC5mbi50YWJzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciAkbmF2ICAgPSAkKHRoaXMpLmZpbmQoJ25hdicpO1xuICAgICAgICAgICAgdmFyICR0YWJzICA9ICRuYXYuZmluZCgnbGknKTtcbiAgICAgICAgICAgIHZhciAkcGFuZWwgPSAkKHRoaXMpLmZpbmQoJy5wYW5lbCcpO1xuXG4gICAgICAgICAgICAkdGFicy5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgJHRoaXMgICAgICAgID0gJCh0aGlzKTtcbiAgICAgICAgICAgICAgICB2YXIgJGkgICAgICAgICAgID0gJHRoaXMuaW5kZXgoKTtcbiAgICAgICAgICAgICAgICB2YXIgJGFjdGl2ZVBhbmVsID0gJHBhbmVsLmVxKCRpKTtcblxuICAgICAgICAgICAgICAgICRwYW5lbC5ub3QoJGFjdGl2ZVBhbmVsKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgJGFjdGl2ZVBhbmVsLmFkZENsYXNzKCdhY3RpdmUnKTtcblxuICAgICAgICAgICAgICAgICR0aGlzLnNpYmxpbmdzKCdsaScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAkdGhpcy5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBcbn0pKGpRdWVyeSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy90YWJzLnBsdWdpbi5qcyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL3Nhc3MvYXBwLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IC4vcmVzb3VyY2VzL2Fzc2V0cy9zYXNzL2FwcC5zY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=