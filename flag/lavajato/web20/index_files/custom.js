$(document).ready(function () {

    jQuery(function ($) {
        jQuery('a[rel="tooltip"]').tooltip();
        jQuery('a[rel="popover"]').popover();

        $('#posts')
            .infinitescroll({
                'loadingImg': '/images/load.gif',
                'loadingText': 'Carregando...',
                'donetext': 'Sem mais resultados',
                'itemSelector': 'div.post',
                'navSelector': 'div.infinite_navigation',
                'nextSelector': 'div.infinite_navigation a:first',
                'bufferPx': '50',
                maxPage: 4
            });
        $(window).unbind('.infscr');
        $('a#loadmore').click(function () {
            $(document).trigger('retrieve.infscr');
            return false;
        });
    });
});
