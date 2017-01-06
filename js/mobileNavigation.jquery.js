'use strict';

/**
 *
 * jQuery Mobile Navigation Plugin
 *
 *Version: 0.1.0
 *Author: Tommy Chanthaboune <tommy@imarc.com>
 */

(function ($) {

    $.fn.mobileNavigation = function (options) {
        var plugin = this;

        var defaults = {
            toggleClass: 'menu-toggle',
            menuToggleClass: 'open',
            wrapperClass: 'wrapper',
            subMenuClass: 'dropdown',
            directionFrom: 'left'
        };

        this.settings = $.extend({}, defaults, options);

        /**
         *
         * Return CSS selector from class name.
         *
         */
        var toSelector = function (className) {
            return '.' + className;
        };

        /**
         *
         * Validate optionals params when initializing library.
         *
         */
        var validateOptions = function () {

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
         * Toggles menu
         * .init sets the menu opacity to 1 to prevent FOUC.
         *
         */
        var toggle = function () {
            if (!$(this).hasClass('init')) {
                $(this).addClass('init');
            }

            $(this).toggleClass(plugin.settings.menuToggleClass);
        };


        /**
         *
         * Sets the direction from where the menu animates from.
         *
         */
        var setMenuDirection = function () {
            var subMenuClass = toSelector(plugin.settings.subMenuClass);

            $(this)
                .addClass(plugin.settings.directionFrom)
                .find(subMenuClass)
                .addClass(plugin.settings.directionFrom);
        };

        /**
         *
         * Toggles the main menu. Closes other sub menus if they're open.
         *
         */
        var bindToggle = function () {
            var toggleSelector = toSelector(plugin.settings.toggleClass);
            var subMenuClass   = toSelector(plugin.settings.subMenuClass);
            var $toggle        = $(toggleSelector);

            $toggle.on('click', $.proxy(function (el) {

                $(toggleSelector).find('i').toggleClass('fa-bars fa-close');

                $(plugin[0].parentNode)
                    .find(subMenuClass)
                    .each(function () {
                        if ($(this).hasClass(plugin.settings.menuToggleClass)) {
                            toggle.call(this);
                        }
                    });

                toggle.call(this);
            }, this));
        };

        /**
         *
         * Toggle sub menus.
         *
         */
        var bindSubMenuToggle = function () {
            var subMenuClass  = toSelector(plugin.settings.subMenuClass);
            var $pluginParent = $(plugin[0].parentNode);

            $(this)
                .find('.sub-menu-toggle')
                .on('click', $pluginParent, function () {
                    var text = $(this).data('menu');
                    toggle.call($(subMenuClass + '[data-menu="' + text + '"]'));
                });

        };

        /**
         *
         * Append buttons to list items with subMenu menus. Add back buttons to menus.
         *
         */
        var appendControl = function () {
            var subMenuClass = toSelector(plugin.settings.subMenuClass);
            var text         = $(this).find('> a').text();

            if ($(this).find(subMenuClass).length == 0) {
                return true;
            }

            $(this)
                .append('<button class="sub-menu-toggle" data-menu="' + text + '"><i class="fa fa-angle-right"></i></button>');

            $(this)
                .find('>' + subMenuClass + '> ul')
                .prepend('<li><button class="sub-menu-toggle" data-menu="' + text + '"><i class="fa fa-angle-left"></i> ' + text + '</button></li>')


        };

        /**
         *
         * Find all sub menus and append as a sibling of library's initialized class.
         *
         */
        var cloneAndAppendMenu = function () {
            var subMenuClass = toSelector(plugin.settings.subMenuClass);
            var clone        = $(this).clone(true, true);
            var pluginParent = plugin[0].parentNode;

            // Remove sub menus from mark up
            $(clone).find(subMenuClass).remove();

            // Checks for sub menu of another sub menu and call function recursively
            if ($(this).find(subMenuClass).length > 0) {
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
         *
         */
        var setMenuId = function () {
            var subMenuClass = toSelector(plugin.settings.subMenuClass);
            var text         = $(this).siblings('a').text();

            $(this)
                .find(subMenuClass)
                .each(function () {
                    var text = $(this).siblings('a').text();
                    $(this).attr('data-menu', text).addClass('sub-menu');
                })
                .end()
                .attr('data-menu', text);
        };

        /**
         *
         * Set up sub menu
         *
         */
        var initSubMenu = function () {
            var subMenuClass = toSelector(plugin.settings.subMenuClass);
            var $menuItems   = $(this).find('nav ul li');

            // For each menu item
            $menuItems
                .each(function () {
                    appendControl.call(this);
                    bindSubMenuToggle.call(this);
                });

            // For each menu
            $(this)
                .find(subMenuClass)
                .each(function (index) {
                    setMenuId.call(this, index);
                    cloneAndAppendMenu.call(this);
                });

        };

        /**
         *
         * Set up main menu
         *
         */
        var init = function () {
            validateOptions();
            setMenuDirection.call(this);
            bindToggle.call(this);
        };

        /**
         *
         * Do this each time the library is initialized
         *
         */
        return this.each(function () {
            init.call(this);
            initSubMenu.call(this);
        });
    };

})(jQuery);