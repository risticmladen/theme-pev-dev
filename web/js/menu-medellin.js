define(
    [
    'jquery',
    'matchMedia'
    ],
    function ($, mediaCheck) {
    var html = $('html'),
        headerContainer = $('.header-container--inverted'),
        menuItem = $('.ui-menu li.level-top.parent'),
        offCanvasItem = $('.category-item.parent > a'),
        offCanvasItemReverse = offCanvasItem.toArray(),
        offCanvasItemReverseFinal = offCanvasItemReverse.reverse(),
        navToggle = $('.nav-toggle'),
        navOverlay = $('.nav-overlay'),
        offCanvasOverlay = $('.off-canvas-overlay'),
        offCanvasClose = $('.main-nav-canvas-close'),
        openTimer = null,
        closeTimer = null,
        jsToggleTitle = $('.js-toggle-title'),
        jsToggleContent = $('.js-toggle-content');
        var bodyStyles = window.getComputedStyle(document.documentElement);
        var bpLarge = bodyStyles.getPropertyValue('--medium');
        // IE Fallback
        if ((typeof bpLarge !== 'undefined') && (bpLarge === '')) {
            bpLarge = '768px';
        }
        //style = getComputedStyle(document.body),
        //console.log(style.getPropertyValue('--viewport-off-canvas'));
    mediaCheck({
        media: '(min-width:' + bpLarge + ')',
        entry: $.proxy(function () {
            navToggle.off('click');
            offCanvasOverlay.off('click');
            offCanvasClose.off('click');
            offCanvasItem.each(function (i, el) {
                $(el).off('click');
                if ($(el).hasClass('opened')) {
                    $(el).removeClass('opened');
                    $(el).next('.submenu').removeClass('opened');
                    navOverlay.removeClass('active');
                }
            });
            if (html.hasClass('nav-open')) {
                html.removeClass('nav-open');
                offCanvasOverlay.removeClass('active');
                html.removeClass('nav-before-open');
            }
            function openNav(el)
            {
                if (closeTimer) {
                    clearTimeout(closeTimer);
                }
                openTimer = setTimeout(function () {
                    if (jsToggleTitle.hasClass('opened')) {
                        jsToggleTitle.removeClass('opened');
                        jsToggleContent.removeClass('opened');
                    }
                    if (menuItem.not($(el)).hasClass('opened')) {
                        menuItem.not($(el)).removeClass('opened');
                    }
                    $(el).addClass('opened');
                    navOverlay.addClass('active');
                    if (headerContainer) {
                        headerContainer.addClass('background-enabled');
                    }
                },300);
            };
            function closeNav(el)
            {
                if (openTimer) {
                    clearTimeout(openTimer);
                }
                closeTimer = setTimeout(function () {
                    $(el).removeClass('opened');
                    navOverlay.removeClass('active');
                    if (headerContainer) {
                        headerContainer.removeClass('background-enabled');
                    }
                },300);
            }
            menuItem.each(function (i,el) {
                $(el).mouseenter(function (ev) {
                   openNav(el);
                });
                $(el).on('focusin', function (ev) {
                    openNav(el);
                });
                $(el).mouseleave(function (ev) {
                   closeNav(el);
                });
                $(el).on('focusout', function (ev) {
                    closeNav(el);
                });
            });
        }, this),
        exit: $.proxy(function () {
            menuItem.off('mouseenter');
            menuItem.off('mouseleave');
            menuItem.off('focusin');
            menuItem.off('focusout');
            navToggle.click(function (e) {
                if (html.hasClass('nav-open')) {
                    html.removeClass('nav-open');
                    setTimeout(function () {
                        offCanvasOverlay.removeClass('active');
                        html.removeClass('nav-before-open');
                    }, 300);
                } else {
                    html.addClass('nav-before-open');
                    setTimeout(function () {
                        offCanvasOverlay.addClass('active');
                        html.addClass('nav-open');
                    }, 42);
                }
            });
            offCanvasOverlay.click(function (e) {
                html.removeClass('nav-open');
                setTimeout(function () {
                    offCanvasOverlay.removeClass('active');
                    html.removeClass('nav-before-open');
                }, 300);
            });
            offCanvasClose.click(function (e) {
                html.removeClass('nav-open');
                setTimeout(function () {
                    offCanvasOverlay.removeClass('active');
                    html.removeClass('nav-before-open');
                }, 300);
            });
            offCanvasItem.each(function (i, el) {
                $(el).click(function (ev) {
                    ev.preventDefault();
                    var $parentLi = $(el).parent();

                    $parentLi.toggleClass('opened');
                    $parentLi.siblings().removeClass('opened');
                });
            });
        }, this)
    });
    }
);
