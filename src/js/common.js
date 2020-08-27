import {WOW} from 'wowjs';
import '@fancyapps/fancybox/dist/jquery.fancybox.min';
import './svg-sprite';

var winWidth = $(window).width();
var isDesktop;

$(document).ready(function () {
    'use strict';

    if (winWidth >= 1200) 
        isDesktop = true;
      else 
        isDesktop = false;
        
    $(window).resize(function () {
        winWidth = $(window).width();
        if (winWidth >= 1200) {
            if (!isDesktop) {
                $(".main-nav__sublist").show();
            }
            isDesktop = true;
        }
        else {
            if (isDesktop && $('.show-dropdown-nav').length) {
                $(".main-nav").show();
            }
            isDesktop = false;
        }
    });

    // init fancybox
    $('[data-fancybox]').fancybox({
        backFocus: false,
    });

    // init wow
    let wow = new WOW ();
    wow.init();

    // main-nav
    $(".main-nav__list > li > a").click(function(e){
        e.preventDefault();
        $("html").addClass("show-dropdown-nav");
        $(".main-nav__sublist").stop().slideDown(500);
    });

    $(document).mouseup(function (e) {
        if ($('.show-dropdown-nav').length) {
            if (!$('.main-header').is(e.target) && 
                $('.main-header').has(e.target).length === 0) {
                    $("html").removeClass("show-dropdown-nav");
                    $(".main-nav__sublist").stop().slideUp(500);
            }
        }
    });

    // main-header hamburger
    $(".hamburger").click(function(){
        $("html").toggleClass("show-dropdown-nav");
        $(".main-nav").stop().slideToggle(500);
    });

}); // end ready
