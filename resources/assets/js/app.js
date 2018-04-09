window.$ = window.jQuery = jQuery;

import './accordion.plugin.js'
import './dropdown.plugin.js'
import './mobileNavigation.plugin.js'
import './stickyElement.plugin.js'
import './stickyHeader.plugin.js'
import './tabs.plugin.js'


$(function () {
    $('nav.primary').dropdown();
    $('header.primary').stickyHeader();
});
