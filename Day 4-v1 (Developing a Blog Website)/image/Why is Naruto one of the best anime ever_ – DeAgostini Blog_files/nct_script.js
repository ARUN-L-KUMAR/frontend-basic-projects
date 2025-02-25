jQuery(function ($) {
    //---*************** test data cookie ***************
//    document.cookie = "FPC_COMPARE=%7B%22count%22%3A2%2C%22ids%22%3A%5B%2231%22%2C%2259%22%5D%7D;";
//    document.cookie = "FPC_WISHLIST=%7B%22count%22%3A1%2C%22ids%22%3A%5B%22103%22%5D%7D;";
//    document.cookie = "FPC_CART=%7B%22cart_qty%22%3A1%2C%22subtotal%22%3A%22%5Cu00a369.99%22%2C%22empty_message%22%3Anull%7D;";
    //---*************** test data cookie ***************
    var windowSize = getWindowSize();
    
    function toggleMenu() {
        $('.td-header-magento-menu').on('click', function () {
            if( e.which == 2 ) {
                e.preventDefault();
            }
            if (windowSize[0]<=1023) {
                $('#popId-topMenu').fadeToggle();
            } else {
                return;
            }
        });
    }
    toggleMenu();
   
    $(window).on('resize', function() {
        var windowSize = getWindowSize();
        if (windowSize[0]>1023) {
            $('#topMenu').show();
            $('#popId-topMenu').removeAttr('style');
        }
        
        toggleMenu();
        
        
    });
    
    setMageServiceReady();

    function setMageServiceReady() {
        var compare_c = getCookie('FPC_COMPARE');
        if (typeof compare_c != 'undefined') {
            var compare_obj = JSON.parse(compare_c),
                    compare = compare_obj.count * 1;

            if (compare > 0)
                $('#nct-c-compare').text('(' + compare + ')');
            else
                $('#nct-c-compare').text('');
        }

        var wishlist_c = getCookie('FPC_WISHLIST');
        if (typeof wishlist_c != 'undefined') {
            var wishlist_obj = JSON.parse(wishlist_c),
                    wishlist = wishlist_obj.count * 1;

            if (wishlist > 0)
                $('#nct-c-wishlist').text('(' + wishlist + ')');
            else
                $('#nct-c-wishlist').text('');
        }

        var cart_c = getCookie('FPC_CART');
        if (typeof cart_c != 'undefined') {
            var cart_obj = JSON.parse(cart_c),
                    cart_qty = cart_obj.cart_qty * 1;

            if (cart_qty > 0) {
                $('#nct-c-cart').text('(' + cart_qty + ')');
                $('#nct-c-price').text(cart_obj.subtotal);
            } else {
                $('#nct-c-cart').text('');
                $('#nct-c-price').text('£0.00');
            }
        }
    }

    function getCookie(name) {
        var matches = document.cookie.match(new RegExp(
                "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
                ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }


    $('.selectboxit-container').on('click', function () {
        var container = $('.nct-lang');
        if (container.hasClass('open')) {
            container.removeClass('open');
        } else {
            container.addClass('open');
        }
        return false;
    });
    
    $(document).on('click', function (e) {
        var point = e.target;
        if (!$(point).parents().addBack().is('.nct-lang')) {
            var container = $('.nct-lang');
            container.removeClass('open');
        } 
    });
    
    
    
    $('#newsletter').focusout(function() {
        var email = $(this).val();
        nctValidateEmail(email)
    });
    
    $('#newsletter-validate-detail').submit(function() {
        var email = $('#newsletter').val();

        if (!nctValidateRequired(email) || !nctValidateEmail(email)) {
            return false;
        }
    });
    
    $('#td-header-search-button').on('click', function() {
        setTimeout(function() {   
            td_ajax_search.show_search_box();
        }, 1);
    });
    
    function nctValidateRequired(val) {
        if (val.length === 0) {
            $('#advice-validate-email-newsletter').text('This is a required field.').show(200);
            return false;
        }
        return true;
    }
    
    function nctValidateEmail (email) {
        var re = /^([a-z0-9,!\#\$%&'\*\+\/=\?\^_`\{\|\}~-]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z0-9,!\#\$%&'\*\+\/=\?\^_`\{\|\}~-]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*@([a-z0-9-]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z0-9-]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*\.(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]){2,})$/i;
        if (!re.test(email)) {
            $('#advice-validate-email-newsletter').text('Please enter a valid email address. For example johndoe@domain.com.').show(200);
            return false;
        } else {
            $('#advice-validate-email-newsletter').hide(200);
            return true;
        }
    }
    
    if (window.location.hash == '#_=_') window.close();
    
    function getWindowSize() {
        var c=0,o=0;
        if (typeof window.innerWidth=="number") c=window.innerWidth,o=window.innerHeight;
        else if (document.documentElement&&(document.documentElement.clientWidth||document.documentElement.clientHeight))
            c=document.documentElement.clientWidth,o=document.documentElement.clientHeight;
        else if (document.body&&(document.body.clientWidth||document.body.clientHeight))
            c=document.body.clientWidth,o=document.body.clientHeight;
        return[c,o];
    }
});
