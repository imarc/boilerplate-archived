$(function() {
    // header hide and show on scroll up/down
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var initialHeaderHeight = $('header.primary').outerHeight();

    // set top padding on body so header doesn't overlap content
    $('body').css('padding-top', initialHeaderHeight);

    $(window).scroll(function(event){
        didScroll = true;
    });

    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    var hasScrolled = function() {
        var headerHeight = $('header.primary').outerHeight();
        var scrollPos = $(this).scrollTop();

        // Make sure they scroll more than delta
        if(Math.abs(lastScrollTop - scrollPos) <= delta)
            return;

        // If they scrolled down and are past the header, add class .header-up.
        if (scrollPos > lastScrollTop && scrollPos > headerHeight){
            // Scroll Down
            $('header.primary').addClass('header-up').css('top', -headerHeight);
            $('body').css('padding-top', headerHeight);
        } else {
            // Scroll Up
            $('header.primary').removeClass('header-up').css('top', '0');
        }

        lastScrollTop = scrollPos;
    }

    $(window).resize(function(){
        var headerHeight = $('header.primary').outerHeight();
        hasScrolled();
        $('body').css('padding-top', headerHeight);
    });
});