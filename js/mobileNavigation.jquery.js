'use strict';

/**
 *
 * jQuery Mobile Navigation PLugin
 *
 *Version: 0.0.0
 *Author: Tommy Chanthaboune <tommy@imarc.com>
 */

(function ($) {

	$.fn.mobileNavigation = function (options) {
		var plugin = this;

		var defaults = {
			buttonToggleClass: 'menu-toggle',
			menuToggleClass: 'open',
			directionFrom: 'left',
			wrapper: 'wrapper'
		};

		var toggle = function () {
			$(this).toggleClass(plugin.settings.menuToggleClass);
		};

		var hasChildren = function () {

		};

		var setDirection = function () {
			try {
				if (plugin.settings.directionFrom !== 'left' && plugin.settings.directionFrom !== 'right') {
					throw 'Wrong direction. Choose  "left" or "right".'
				}
			} catch (err) {
				$.error(err);
			}

			$(this).addClass(plugin.settings.directionFrom);
		};

		var init = function () {
			setDirection.call(this);
		};

		var bindEvents = function () {
			var $toggle = $('.' + plugin.settings.buttonToggleClass);
			$toggle.on('click', $.proxy(toggle, this));
		};

		this.settings = $.extend({}, plugin.defaults, options);

		return this.each(function () {

			init.call(this);

			bindEvents.call(this);

		});
	};

})(jQuery);