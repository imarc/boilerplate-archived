'use strict';

/**
 *
 * jQuery Mobile Navigation Plugin
 *
 *Version: 0.1.0
 *Author: Tommy Chanthaboune <tommy@imarc.com>
 */

(function ($) {

	$.fn.accordion = function (options) {
		var plugin = this;

		var defaults = {
			hiddenOnLoad: true,
			singleOpen: true
		};

		this.settings = $.extend({}, defaults, options);


		return this.each(function () {

			var $header  = $(this).find('.accordion-group > button')
			var $content = $(this).find('.accordion-group > div')


			if (plugin.settings.hiddenOnLoad) {
				$content.addClass('hidden');
			} else {
				$header.addClass('active')
			}

			$header.on('click', function () {

				if(!$(this).hasClass('active') && plugin.settings.singleOpen){
					$header.removeClass('active');
					$content.slideUp();
				}

				$(this)
					.toggleClass('active')
					.siblings('div')
					.slideToggle();

			});

		});
	};

})(jQuery);

$(function () {
	var $accordion = $('.accordion');
	$accordion.accordion();
});