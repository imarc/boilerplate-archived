(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["/js/app"],{

/***/ "./resources/assets/js/accordion.plugin.js":
/*!*************************************************!*\
  !*** ./resources/assets/js/accordion.plugin.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery) {/**
 *
 * jQuery Accordion Plugin
 */
;

(function ($) {
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
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./resources/assets/js/app.js":
/*!************************************!*\
  !*** ./resources/assets/js/app.js ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(jQuery, $) {/* harmony import */ var _accordion_plugin_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./accordion.plugin.js */ "./resources/assets/js/accordion.plugin.js");
/* harmony import */ var _accordion_plugin_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_accordion_plugin_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _dropdown_plugin_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dropdown.plugin.js */ "./resources/assets/js/dropdown.plugin.js");
/* harmony import */ var _dropdown_plugin_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_dropdown_plugin_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mobileNavigation_plugin_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mobileNavigation.plugin.js */ "./resources/assets/js/mobileNavigation.plugin.js");
/* harmony import */ var _mobileNavigation_plugin_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mobileNavigation_plugin_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _stickyElement_plugin_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./stickyElement.plugin.js */ "./resources/assets/js/stickyElement.plugin.js");
/* harmony import */ var _stickyElement_plugin_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_stickyElement_plugin_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _stickyHeader_plugin_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./stickyHeader.plugin.js */ "./resources/assets/js/stickyHeader.plugin.js");
/* harmony import */ var _stickyHeader_plugin_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_stickyHeader_plugin_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _tabs_plugin_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tabs.plugin.js */ "./resources/assets/js/tabs.plugin.js");
/* harmony import */ var _tabs_plugin_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_tabs_plugin_js__WEBPACK_IMPORTED_MODULE_5__);
window.$ = window.jQuery = jQuery;






$(function () {
  $('nav.primary').dropdown();
  $('header.primary').stickyHeader();
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js"), __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./resources/assets/js/dropdown.plugin.js":
/*!************************************************!*\
  !*** ./resources/assets/js/dropdown.plugin.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery) {/**
 *
 * jQuery Dropdown Plugin
 */
;

(function ($) {
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
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./resources/assets/js/mobileNavigation.plugin.js":
/*!********************************************************!*\
  !*** ./resources/assets/js/mobileNavigation.plugin.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery) {/**
 *
 * jQuery Mobile Navigation Plugin
 */
;

(function ($) {
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
      var pluginParent = plugin[0].parentNode; // Remove sub menus from mark up

      $(clone).find(subMenuClass).remove(); // Checks for sub menu of another sub menu and call function recursively

      if ($(this).find(subMenuClass).length > 0) {
        cloneAndAppendMenu.call($(this).find(subMenuClass));
      } // Remove after cloning and appending


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
      var $menuItems = $(this).find('nav ul li'); // For each menu item

      $menuItems.each(function () {
        appendControl.call(this);
        bindSubMenuToggle.call(this);
      }); // For each menu

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
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./resources/assets/js/stickyElement.plugin.js":
/*!*****************************************************!*\
  !*** ./resources/assets/js/stickyElement.plugin.js ***!
  \*****************************************************/
/*! no static exports found */
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
;

(function ($, window) {
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
      var diffOffsets = options.endOffset - options.startOffset || 0; // Above start

      if (scrollTop <= start) {
        if (state == 'fixed' || state == 'init') {
          that.release(0);
        } // Between start and end

      } else if (scrollTop <= end) {
        if (diffOffsets) {
          that.fix(diffOffsets * currentDiff / diff);
        } else if (state == 'released' || state == 'init') {
          that.fix(0);
        } // Below end

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
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./resources/assets/js/stickyHeader.plugin.js":
/*!****************************************************!*\
  !*** ./resources/assets/js/stickyHeader.plugin.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery) {/**
 *
 * jQuery Sticky Header Plugin
 */
;

(function ($) {
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
      var $searchToggle = $('.search-toggle'); // handle search form toggling

      $searchToggle.on('click', function (e) {
        e.preventDefault();
        $searchDrawer.find('> div').toggleClass('open');
      }); // set up JS-enabled stuff

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
        } // If they scrolled down and are past the header, add class .header-up.


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
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./resources/assets/js/tabs.plugin.js":
/*!********************************************!*\
  !*** ./resources/assets/js/tabs.plugin.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery) {/**
 *
 * jQuery Tabs Plugin
 */
;

(function ($) {
  'use strict';

  $.fn.tabs = function () {
    this.each(function () {
      var $nav = $(this).find('nav');
      var $tabs = $nav.find('li');
      var $panel = $(this).find('.panel');

      if (location.hash) {
        $tabs.each(function () {
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

      $tabs.click(function () {
        var $this = $(this);
        var $i = $this.index();
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
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./resources/assets/sass/app.scss":
/*!****************************************!*\
  !*** ./resources/assets/sass/app.scss ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!***************************************************************************!*\
  !*** multi ./resources/assets/js/app.js ./resources/assets/sass/app.scss ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/marcelmoreau/Sites/git/boilerplate/resources/assets/js/app.js */"./resources/assets/js/app.js");
module.exports = __webpack_require__(/*! /Users/marcelmoreau/Sites/git/boilerplate/resources/assets/sass/app.scss */"./resources/assets/sass/app.scss");


/***/ })

},[[0,"/js/manifest","/js/vendor"]]]);
//# sourceMappingURL=app.js.map