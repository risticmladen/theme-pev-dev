define(['jquery', 'swiper'], function ($, Swiper) {
    'use strict';

    var galleryTop, galleryThumbs;

    $.widget('medellin.productPageGallery', {
        options: {
            bodySelector: $('body'),
            bodyCssClassName: 'no-scroll',
            closeGallerySelector: $('.close-gallery'),
            galleryCssClassName: 'gallery-placeholder--fixed',
            toggleCssClassName: 'no-display',
            slideImgSelector: $('.gallery-top img')
        },

        _init: function () {

                galleryThumbs = new Swiper('.gallery-thumbs', {
                spaceBetween: 5,
                slidesPerView: 3,
                // Navigation arrows
                navigation: {
                    nextEl: '.gallery-thumbs .swiper-button-next',
                    prevEl: '.gallery-thumbs .swiper-button-prev',
                },
                lazy: {
                    loadPrevNext: true,
                },
                breakpoints: {
                    420: {
                        slidesPerView: 4,
                    },
                    540: {
                        slidesPerView: 5,
                    },
                    768: {
                        slidesPerView: 4,
                    },
                    960: {
                        slidesPerView: 5,
                    },
                    1200: {
                        slidesPerView: 6,
                    },
                    1400: {
                        slidesPerView: 7,
                    }
                },
                on: {
                    init: function () {
                        $('.gallery-thumbs').removeClass('is-loading');
                    }
                }
            });

            galleryTop = new Swiper('.gallery-top', {
                loop: false,
                autoHeight: true,
                pagination: {
                    el: '.swiper-pagination',
                },
                keyboard: {
                    enabled: true,
                },
                navigation: {
                    nextEl: '.gallery-top .swiper-button-next',
                    prevEl: '.gallery-top .swiper-button-prev',
                },
                thumbs: {
                    swiper: galleryThumbs
                },
                grabCursor: true,
                lazy: {
                    loadPrevNext: true,
                },
                on: {
                    slideChange: function () {
                        $(galleryTop.slides[galleryTop.realIndex]).removeClass('is-loading');
                    }
                }
            });

            this.options.slideImgSelector.on('click', $.proxy(function () {
                this.enterFullScreenMode();
            }, this));

            this.options.closeGallerySelector.on('click', $.proxy(function () {
                this.exitFullScreenMode();
            }, this));

            this.observeKeyboardEvents();
        },

        enterFullScreenMode: function () {
            this.options.bodySelector.addClass(this.options.bodyCssClassName);
            this.element.addClass(this.options.galleryCssClassName);
            this.options.closeGallerySelector.removeClass(this.options.toggleCssClassName);
            galleryTop.update();
        },

        exitFullScreenMode: function () {
            this.options.bodySelector.removeClass(this.options.bodyCssClassName);
            this.element.removeClass(this.options.galleryCssClassName);
            this.options.closeGallerySelector.addClass(this.options.toggleCssClassName);
            galleryTop.update();
        },

        observeKeyboardEvents: function () {
            // handle keyboard keys
            $(document).on('keyup', $.proxy(function (e) {
                switch (e.keyCode) {
                    // escape key
                    case 27:
                        this.exitFullScreenMode();
                        break;
                    default:
                        break;
                }
            }, this));
        },

        refreshGallery: function (images) {
            if (images) {
                galleryTop.removeAllSlides();
                galleryThumbs.removeAllSlides();

                images.forEach($.proxy(function (image) {
                    galleryTop.appendSlide('<div class="swiper-slide"><img src="'+image.img+'" alt="'+image.caption+'" /></div>');
                    galleryThumbs.appendSlide('<div class="swiper-slide"><img src="'+image.thumb+'" alt="'+image.caption+'" /></div>');
                }, this));
            }
        }
    });

    return $.medellin.productPageGallery;
});
