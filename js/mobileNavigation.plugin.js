/**
 *
 * jQuery Mobile Navigation Plugin
 */

;(function($) {
    'use strict';

    $.fn.mobileNavigation = function(options) {
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

        this.closeAll = function() {
            toggleAll();
        };

        /**
         *
         * Return CSS selector from class name.
         */

        var toSelector = function(className) {
            return '.' + className;
        };

        /**
         *
         * Validate optionals params when initializing library.
         */

        var validateOptions = function() {

            var classRegExp = new RegExp(/^\./);

            $.each(plugin.settings, function(key, value) {

                if(key === 'directionFrom') {

                    if(value !== 'left' && value !== 'right') {
                        $.error('Wrong direction. Choose  "left" or "right".');
                    }

                    return true;
                }

                if(classRegExp.test(value)) {
                    $.error('The value ' + value + ' for ' + key + ' just needs the class name not css selector.');
                }

            });
        };

        /**
         *
         * Toggles Individual Menu
         * .init sets the menu opacity to 1 to prevent FOUC.
         */

        var toggleMenu = function() {
            if(!$(this).hasClass('init')) {
                $(this).addClass('init');
            }

            $(this).toggleClass('open');
        };

        /**
         *
         *  Toggles All Menus
         */

        var toggleAll = function() {
            var toggleSelector = toSelector(plugin.settings.toggleClass);
            var subMenuClass   = toSelector(plugin.settings.subMenuClass);
            var $overlay       = $(toSelector(plugin.settings.wrapperClass)).find('.mobile-overlay');

            $overlay.toggle();

            toggleFreezeFrame();

            $(toggleSelector).find('i').toggleClass('fa-bars fa-close');

            $(plugin[0].parentNode)
                .find(subMenuClass)
                .each(function() {
                    if($(this).hasClass('open')) {
                        toggleMenu.call(this);
                    }
                });

            toggleMenu.call(plugin[0]);
        };

        /**
         *
         * Sets the direction from where the menu animates from.
         */

        var setMenuDirection = function() {
            var subMenuClass = toSelector(plugin.settings.subMenuClass);

            $(this)
                .addClass(plugin.settings.directionFrom)
                .find(subMenuClass)
                .addClass(plugin.settings.directionFrom);
        };

        /**
         *
         * Toggles the main menu. Closes other sub menus if they're open.
         */

        var bindToggle = function() {
            var $toggle = $(toSelector(plugin.settings.toggleClass));

            $toggle.on('click', toggleAll);
        };

        /**
         *
         * Bind sub menu button to toggle child menu.
         */

        var bindSubMenuToggle = function() {
            var subMenuClass  = toSelector(plugin.settings.subMenuClass);
            var $pluginParent = $(plugin[0].parentNode);

            $(this)
                .find('.sub-menu-toggle')
                .on('click', $pluginParent, function() {
                    var text = $(this).data('menu');
                    toggleMenu.call($(subMenuClass + '[data-menu="' + text + '"]'));
                });

        };

        /**
         *
         * Append buttons to list items with subMenu menus. Add back buttons to menus.
         */

        var appendControl = function() {
            var subMenuClass = toSelector(plugin.settings.subMenuClass);
            var text         = $(this).find('> a').text();

            if($(this).find(subMenuClass).length == 0) {
                return true;
            }

            $(this)
                .append('<button class="sub-menu-toggle" data-menu="' + text + '"><i class="fa fa-angle-right" aria-hidden="true"></i></button>');

            $(this)
                .find('>' + subMenuClass + '> ul')
                .prepend('<li><button class="sub-menu-toggle" data-menu="' + text + '"><i class="fa fa-angle-left"></i> ' + text + '</button></li>')


        };

        /**
         *
         * Find all sub menus and append as a sibling of library's initialized class.
         */

        var cloneAndAppendMenu = function() {
            var subMenuClass = toSelector(plugin.settings.subMenuClass);
            var clone        = $(this).clone(true, true);
            var pluginParent = plugin[0].parentNode;

            // Remove sub menus from mark up
            $(clone).find(subMenuClass).remove();

            // Checks for sub menu of another sub menu and call function recursively
            if($(this).find(subMenuClass).length > 0) {
                cloneAndAppendMenu.call($(this).find(subMenuClass));
            }

            // Remove after cloning and appending
            $(this)
                .closest(pluginParent)
                .append(clone)
                .end()
                .remove();
        };

        /**
         *
         *  Set unique identifier on each menu.
         */

        var setMenuId = function() {
            var subMenuClass = toSelector(plugin.settings.subMenuClass);
            var text         = $(this).siblings('a').text();

            $(this)
                .find(subMenuClass)
                .each(function() {
                    var text = $(this).siblings('a').text();
                    $(this).attr('data-menu', text).addClass('sub-menu');
                })
                .end()
                .attr('data-menu', text);
        };

        /**
         *
         * Set up sub menu
         */

        var initSubMenu = function() {
            var subMenuClass = toSelector(plugin.settings.subMenuClass);
            var $menuItems   = $(this).find('nav ul li');

            // For each menu item
            $menuItems
                .each(function() {
                    appendControl.call(this);
                    bindSubMenuToggle.call(this);
                });

            // For each menu
            $(this)
                .find(subMenuClass)
                .each(function(index) {
                    setMenuId.call(this, index);
                    cloneAndAppendMenu.call(this);
                });

        };

        /**
         *
         * Insert overlay and bind it to close all menus on click
         */

        var addOverlay = function() {
            var overlay = '<div class="mobile-overlay"></div>';
            overlay     = $(overlay).css(plugin.settings.overlayCss);

            $(toSelector(plugin.settings.wrapperClass)).append($(overlay));

            $(overlay).on('click', function() {
                toggleAll();
            });

        };

        /*
         *
         * Freeze frame toggle
         */

        var toggleFreezeFrame = function() {
            var scroll = {
                'height': '100%',
                'overflow': 'hidden'
            };

            if($(plugin[0]).hasClass('open')) {
                scroll.overflow = 'auto';
            }

            $('html').css(scroll);

        };

        /**
         *
         * Set up main menu
         */
        var init = function() {
            validateOptions();
            addOverlay();
            setMenuDirection.call(this);
            bindToggle.call(this);
        };

        /**
         *
         * Do this each time the library is initialized
         */

        return this.each(function() {
            init.call(this);
            initSubMenu.call(this);
        });
    };

})(jQuery);

$(function() {
    // Mobile Navigation
    $('.mobile').mobileNavigation();

});
