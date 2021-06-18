var config = {
    "map": {
        "*": {
            "menu-medellin": "js/menu-medellin",
            "ui-toggle": "js/toggle",
            "ui-simple-toggle": "js/simple-toggle",
            "nav-toggle": "js/nav-toggle",
            "ui-canvas": "js/ui-canvas",
            "owl": "js/vendor/owl.carousel",
            "swiper": "js/vendor/swiper",
            "product-page-gallery": "js/product-page-gallery",
            "qty-buttons": "js/qty-buttons",
            "form-labels": "js/form-labels",
            "products-carousel": "js/products-carousel",
            "checkout-offcanvas": "js/checkout-offcanvas",
            'sticky-header': 'js/sticky-header',
            'header-account-links': 'js/header-account-links'
        }
    },
    deps: [
        'js/vendor/lazysizes.min',
        "js/theme"
    ],
    paths: {
        "owl": "js/vendor/owl.carousel"
    },
    shim: {
        "owl" : {
            deps: ['jquery']
        }
    },
    config: {
        mixins: {
            'Magento_Swatches/js/swatch-renderer': {
                'Magento_Swatches/js/swatch-renderer-mixin': true
            },
            'Magento_ConfigurableProduct/js/configurable': {
                'Magento_ConfigurableProduct/js/configurable-mixin': true
            },
        }
    }
};
