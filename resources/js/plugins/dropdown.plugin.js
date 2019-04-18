/**
 *
 * jQuery Dropdown Plugin
 */

'use strict';
import $ from 'jquery';

$.fn.dropdown = function() {
    var $menuItem = $('nav.primary > ul > li');

    $menuItem.hover(
        function() {
            $(this).find('.dropdown').addClass('open');
        },
        function() {
            $(this).find('.dropdown').removeClass('open');
        }
    );
};
