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

		var toSelector = function (className) {
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

		var setMenuDirection = function () {
			var childClass = toSelector(plugin.settings.childClass);

			$(this)
				.addClass(plugin.settings.directionFrom)
				.find(childClass).addClass(plugin.settings.directionFrom);
		};

		var bindToggle = function () {
			var toggleSelector = toSelector(plugin.settings.toggleClass);
			var childClass     = toSelector(plugin.settings.childClass);
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
			var childClass    = toSelector(plugin.settings.childClass);
			var $pluginParent = $(plugin[0].parentNode);

			$(this)
				.find('.secondary-toggle')
				.on('click', $pluginParent, function () {
					var text = $(this).data('menu');
					toggle.call($(childClass+'[data-menu="'+text+'"'));

				});

		};

		var appendControl = function () {
			var childClass = toSelector(plugin.settings.childClass);
			var text = $(this).find('> a').text();

			$(this)
				.append('<button class="secondary-toggle" data-menu="' + text + '"><i class="fa fa-angle-right"></i></button>');

			$(this)
				.find('>'+ childClass+ '> ul')
				.prepend('<li><button class="secondary-toggle" data-menu="' + text + '"><i class="fa fa-angle-left"></i></button></li>')


		};

		var cloneAndAppendMenu = function () {
			var childClass   = toSelector(plugin.settings.childClass);
			var clone        = $(this).clone(true, true);
			var pluginParent = plugin[0].parentNode;

			$(clone).find(childClass).remove();

			if($(this).find(childClass).length > 0){
				cloneAndAppendMenu.call($(this).find(childClass));
			}

			$(this)
				.closest(pluginParent)
				.append(clone)
				.end()
				.remove();
		};

		var setMenuId = function (index) {
			var childClass = toSelector(plugin.settings.childClass);
			var text = $(this).siblings('a').text();

			$(this)
				.find(childClass)
				.each(function () {
					var text = $(this).siblings('a').text();
					$(this).attr('data-menu', text).addClass('tertiary');
				})
				.end()
				.attr('data-menu', text);
		}

		var initChildren = function () {
			var childClass = toSelector(plugin.settings.childClass);
			var $menuItems = $(this).find('nav ul li');

			$menuItems.each(function (index) {
				if ($(this).find(childClass).length == 0) {
					return true;
				}
				appendControl.call(this);
				bindChildToggle.call(this);
			});

			$(this).find(childClass).each(function (index) {
				setMenuId.call(this, index);
				cloneAndAppendMenu.call(this);
			});


		}

		var init = function () {
			validateOptions();
			setMenuDirection.call(this);
			bindToggle.call(this);
		};

		return this.each(function () {

			init.call(this);
			initChildren.call(this);

		});
	};

})(jQuery);