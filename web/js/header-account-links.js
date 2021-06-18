define([
    'jquery',
    'matchMedia'
], function ($, matchMedia) {
    'use strict';

    $.widget('medellin.headerAccountLinks', {
        _init: function () {
            var headerLinks = '.header.links';
            var desktopParent = this.options.desktopParent;
            var mobileParent = this.options.mobileParent;

            matchMedia({
                media: this.options.breakpoint,
                entry: $.proxy(function () {
                    this.checkChildElement(desktopParent, headerLinks);
                }, this),
                exit: $.proxy(function () {
                    this.checkChildElement(mobileParent, headerLinks);
                }, this)
            });
        },

        checkChildElement: function (parentEl, childEl) {
            if (!$(parentEl).children(childEl).length) {
                this.moveElement(parentEl, childEl);
            }
        },

        moveElement: function (parent, element) {
            $(element)
                .appendTo(parent)
                .toggleClass(this.options.cssClass)
        },
    });

    return $.medellin.headerAccountLinks
});
