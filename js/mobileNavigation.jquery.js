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
			toggleClass: 'menu-toggle',
			menuToggleClass: 'open',
			wrapperClass: 'wrapper',
			childClass: 'dropdown',
			directionFrom: 'left'
		};

		this.settings = $.extend({}, defaults, options);

		var createSelector = function (className) {
			return '.' + className
		}

		var validateOptions = function () {

			var classRegExp = new RegExp(/^\./);

			$.each(plugin.settings, function (key, value) {

				if (key === 'directionFrom') {

					if (value !== 'left' && value !== 'right') {
						$.error('Wrong direction. Choose  "left" or "right".')
					}

					return true;
				}

				if (classRegExp.test(value)) {
					$.error('The value ' + value + ' for ' + key + ' just needs the class name not css selector.')
				}

			});
		}

		var toggle = function () {
			if (!$(this).hasClass('init')) {
				$(this).addClass('init');
			}

			$(this).toggleClass(plugin.settings.menuToggleClass);
		};

		var setDirection = function () {
			$(this).addClass(plugin.settings.directionFrom);
		};

		var bindToggle = function () {
			var toggleSelector = createSelector(plugin.settings.toggleClass);
			var childClass     = createSelector(plugin.settings.childClass);
			var $toggle        = $(toggleSelector);

			$toggle.on('click', $.proxy(function () {

				$(plugin[0].parentNode)
					.find(childClass)
					.each(function () {
						if ($(this).hasClass(plugin.settings.menuToggleClass)) {
							toggle.call(this);
						}
					});

				toggle.call(this);
			}, this));
		};

		var bindChildToggle = function () {
			var childClass    = createSelector(plugin.settings.childClass);
			var $pluginParent = $(plugin[0].parentNode);

			$(this)
				.find('.secondary-toggle')
				.on('click', $pluginParent, $.proxy(function () {
					var index = $(this).index();
					var menu  = $(childClass + '[data-menu="' + index + '"]');

					toggle.call($(childClass + '[data-menu="' + index + '"]'));

				}, this));

		};

		var appendChildControls = function () {

			$(this)
				.append('<button class="secondary-toggle" data-menu="' + $(this).index() + '"><i class="fa fa-angle-right"></i></button>')
				.find('.dropdown ul')
				.prepend('<li><button class="secondary-toggle" data-menu="' + $(this).index() + '"><i class="fa fa-angle-left"></i></button></li>');
		};

		var cloneAndAppendChild = function () {
			var childClass   = createSelector(plugin.settings.childClass);
			var clone        = $(this).find(childClass).clone(true, true);
			var pluginParent = plugin[0].parentNode;

			$(this)
				.find(childClass)
				.remove()
				.end()
				.closest(pluginParent)
				.append(clone);

		};

		var setMenuIndex = function () {
			var childClass = createSelector(plugin.settings.childClass);

			$(this).find(childClass).attr('data-menu', $(this).index());
		}

		var initChildren = function () {
			var childClass      = createSelector(plugin.settings.childClass);
			var pluginParent    = plugin[0].parentNode;
			var $child          = $(pluginParent).find(childClass);
			var $secondaryItems = $(this).find('nav ul li');

			$child.each(function () {
				setDirection.call(this);
			});

			$secondaryItems.each(function () {
				if ($(this).find(childClass).length == 0) {
					return true;
				}

				setMenuIndex.call(this);
				appendChildControls.call(this);
				bindChildToggle.call(this);
				cloneAndAppendChild.call(this);
			});


		}

		var init = function () {
			validateOptions();
			setDirection.call(this);
			bindToggle.call(this);
		};

		return this.each(function () {

			init.call(this);
			initChildren.call(this);

		});
	};

})(jQuery);