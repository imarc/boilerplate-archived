(function ($) {
    $.fn.stickyHeader = function (options) {
        var plugin = this;

        this.defaults = {};

        this.settings = $.extend({}, plugin.defaults, options);

        return this.each(function () {

            // header hide and show on scroll up/down
            var didScroll;
            var lastScrollTop = 0;
            var delta         = 5;
            var initialHeight = $(this).outerHeight();

            // set top padding on body so header doesn't overlap content
            $('body').css('padding-top', initialHeight);

            $(window).scroll(function(event){
                didScroll = true;
            });

            function scrollCheck() {
                if (didScroll) {
                    hasScrolled();
                    didScroll = false;
                }
                requestAnimationFrame(scrollCheck);
            };

            requestAnimationFrame(scrollCheck);
            
            var hasScrolled = function() {
                var height     = $(this).outerHeight();
                var scrollPos  = $(this).scrollTop();

                // Make sure they scroll more than delta
                if(Math.abs(lastScrollTop - scrollPos) <= delta)
                    return;

                // If they scrolled down and are past the header, add class .header-up.
                if (scrollPos > lastScrollTop && scrollPos > height){
                    // Scroll Down
                    $(this)
                        .addClass('header-up')
                        .css('top', -height);
                    $('body').css('padding-top', height);
                } else {
                    // Scroll Up
                    $(this)
                        .removeClass('header-up')
                        .css('top', '0');
                }

                lastScrollTop = scrollPos;

            };

            $(window).resize(function(){
                var height   = $(this).outerHeight();
                hasScrolled();
                $('body').css('padding-top', height);
            });

        });
    };

})(jQuery);


$('header.primary').stickyHeader();



// (function($) {

//     $.fn.stickyHeader = function() {
//         this.each( function() {
//             // header hide and show on scroll up/down
//             var didScroll;
//             var lastScrollTop = 0;
//             var delta         = 5;
//             var initialHeight = $(this).outerHeight();

//             // set top padding on body so header doesn't overlap content
//             $('body').css('padding-top', initialHeight);

//             $(window).scroll(function(event){
//                 didScroll = true;
//             });

//             function scrollCheck() {
//                 if (didScroll) {
//                     hasScrolled();
//                     didScroll = false;
//                 }
//                 requestAnimationFrame(scrollCheck);
//             };

//             requestAnimationFrame(scrollCheck);
            
//             var hasScrolled = function() {
//                 var height     = $(this).outerHeight();
//                 var scrollPos  = $(this).scrollTop();

//                 // Make sure they scroll more than delta
//                 if(Math.abs(lastScrollTop - scrollPos) <= delta)
//                     return;

//                 // If they scrolled down and are past the header, add class .header-up.
//                 if (scrollPos > lastScrollTop && scrollPos > height){
//                     // Scroll Down
//                     $(this)
//                         .addClass('header-up')
//                         .css('top', -height);
//                     $('body').css('padding-top', height);
//                 } else {
//                     // Scroll Up
//                     $(this)
//                         .removeClass('header-up')
//                         .css('top', '0');
//                 }

//                 lastScrollTop = scrollPos;

//             };

//             $(window).resize(function(){
//                 var height   = $(this).outerHeight();
//                 hasScrolled();
//                 $('body').css('padding-top', height);
//             });

//         });
//     }

// }(jQuery));


// $(function() {
//     // header hide and show on scroll up/down
//     var didScroll;
//     var lastScrollTop       = 0;
//     var delta               = 5;
//     var initialHeaderHeight = $('header.primary').outerHeight();

//     // set top padding on body so header doesn't overlap content
//     $('body').css('padding-top', initialHeaderHeight);

//     $(window).scroll(function(event){
//         didScroll = true;
//     });

//     function scrollCheck() {
//         if (didScroll) {
//             hasScrolled();
//             didScroll = false;
//         }
//         requestAnimationFrame(scrollCheck);
//     };

//     requestAnimationFrame(scrollCheck);

//     var hasScrolled = function() {
//         var $headerPrimary = $('header.primary');
//         var headerHeight   = $headerPrimary.outerHeight();
//         var scrollPos      = $(this).scrollTop();

//         // Make sure they scroll more than delta
//         if(Math.abs(lastScrollTop - scrollPos) <= delta)
//             return;

//         // If they scrolled down and are past the header, add class .header-up.
//         if (scrollPos > lastScrollTop && scrollPos > headerHeight){
//             // Scroll Down
//             $headerPrimary
//                 .addClass('header-up')
//                 .css('top', -headerHeight);
//             $('body').css('padding-top', headerHeight);
//         } else {
//             // Scroll Up
//             $headerPrimary
//                 .removeClass('header-up')
//                 .css('top', '0');
//         }

//         lastScrollTop = scrollPos;
//     }

//     $(window).resize(function(){
//         var $headerPrimary = $('header.primary');
//         var headerHeight   = $headerPrimary.outerHeight();
//         hasScrolled();
//         $('body').css('padding-top', headerHeight);
//     });
// });