window.$ = window.jQuery = jQuery;

import './accordion.plugin.js'
import './dropdown.plugin.js'
import './mobileNavigation.plugin.js'
import './stickyElement.plugin.js'
import './stickyHeader.plugin.js'
import './tabs.plugin.js'


$(function () {
    $('.accordion').accordion();
    $('nav.primary').dropdown();
    $('.mobile').mobileNavigation();
    $('header.primary').stickyHeader();
    $('.tabs').tabs();

    $('aside.primary section').fix();

    $('.sticky').fix({
        startOffset: 100,
        duration: 500,
    });
});
