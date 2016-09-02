$(function() {
    $('.tabs nav:first-child li').click(function() {
        var $this = $(this);
        var $tabs = $this.closest('.tabs').find('.tab');
        var $li = $this.is('li') ? $this : $this.closest('li');
        var $activeTab = $tabs.eq($li.index());

        $tabs.not($activeTab).removeClass('active');
        $activeTab.addClass('active');

        $li.siblings('li').removeClass('active');
        $li.addClass('active');
    });
});




;(function($) {
    $.fn.showHide = function(control_selector, content_selector) {
        this.each(function() {
            var container = $(this);
            var control = container.find(control_selector);
            var content = container.find(content_selector);

            control.click(function() {
                if (content.is(':visible')) {
                    content.hide();
                } else {
                    content.show();
                }
            });

            content.hide();
        });
    };
})(jQuery);