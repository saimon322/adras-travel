import '@fancyapps/fancybox/dist/jquery.fancybox.min';
import '@chenfengyuan/datepicker';
// import 'select2';
import {WOW} from 'wowjs';
import { sliders } from './sliders';
import './svg-sprite';

var winWidth = $(window).width();

$(document).ready(function () {
    'use strict';
        
    $(window).on("resize", function () {
        winWidth = $(window).width();
        if (winWidth >= 768) {
            $("body").removeClass("overflow");
        }
    });

    // init fancybox
    $('[data-fancybox]').fancybox({
        backFocus: false,
    });

    // init wow
    let wow = new WOW ();
    wow.init();

    // init sliders
    sliders($('.js-slider'));

    // init datepicker
    $(".datepicker").datepicker({
        format: "dd/mm/yyyy",
        startDate: new Date()
    });

    // init select2
    // $(".select").select2({
    //     minimumResultsForSearch: -1
    // });

    // main-header scroll fixed
    let scrollPos = 0;
    window.addEventListener('scroll', () => {
        let newScrollPos = (document.body.getBoundingClientRect()).top;
        if (newScrollPos < -100) {
            if (! $('.header-sticky').length) {
                $('html').addClass('header-sticky');
                $('.main-header').hide();
                setTimeout(() => {
                    $('.main-header').show();
                })
            }
        } else {
            $('html').removeClass('header-sticky header-sticky-show');
        }

        if (newScrollPos > scrollPos) {
            // SCROLL UP
            if ($('.header-sticky').length) {
                $('html').addClass('header-sticky-show');
            }
        } else {
            // SCROLL DOWN
            $('html').removeClass('header-sticky-show');
        }

        $("html").removeClass("show-dropdown-nav");
        scrollPos = (document.body.getBoundingClientRect()).top;
    });

    // main-nav
    $(".main-nav__list > li > a").on("click", function(e){
        if (winWidth >= 1200) {
            e.preventDefault();
            $("html").addClass("show-dropdown-nav");
        }
    });

    $(document).on("mouseup", function (e) {
        if ($('.show-dropdown-nav').length) {
            if (!$('.main-header').is(e.target) && 
                $('.main-header').has(e.target).length === 0) {
                    $("html").removeClass("show-dropdown-nav");
                    $("body").removeClass("overflow");
                    if (winWidth < 1200) {
                        $(".main-nav").stop().slideUp(500);
                    }
            }
        }
    });
        
    $(window).on("resize", function () {
        if (winWidth < 1200) {
            if ($('.show-dropdown-nav').length) {
                $(".main-nav").show();
                $("body").addClass("overflow");
            } 
            if (!$('.show-dropdown-nav').length) {
                $(".main-nav").hide();
            } 
        } else {
            if ($('.show-dropdown-nav').length) {
                $(".main-nav__sublist").show();
            }
        }
    });

    // main-header hamburger
    $(".hamburger").on("click", function(){
        $("html").toggleClass("show-dropdown-nav");
        $(".main-nav__sublist").show();
        $(".main-nav").stop().slideToggle(500);

        if (winWidth < 768) {
            $("body").toggleClass("overflow");
        }
    });

    // START COUNTRIES
    ////////////////////////////////////////////////////////////////////////////
    $(".mega-slider__main").height($(".mega-slide--active").height());

    $(window).on("resize", function () {
        $(".mega-slider__main").height($(".mega-slide--active").height());
    });
    
    // mega-slider nav
    $(".mega-slide-link").on("click", function(e){
        e.preventDefault();
        let megaSlide = $($(this).attr("href"));
        $(".mega-slide-link").removeClass("mega-slide-link--active");
        $(this).addClass("mega-slide-link--active");
        $(".mega-slide").removeClass("mega-slide--active");
        megaSlide.addClass("mega-slide--active");
        megaSliderHeight(megaSlide);        
    })

    function megaSliderHeight(megaSlide) {
        let megaSlideHeight = megaSlide.height();
        if (megaSlideHeight != $(".mega-slider__main").height()) {
            $(".mega-slider__main").animate({
                "height": megaSlideHeight
            }, 500);
            $('html, body').animate({
                scrollTop:  $(".mega-slider").offset().top
            }, 500);
        }
    }
    // END COUNTRIES
    ////////////////////////////////////////////////////////////////////////////

    // map points
    $(".map-point__dot").on("click", function(){
        let point = $(this).parent();
        $(".map-point").not(point).removeClass("map-point--active");
        point.toggleClass("map-point--active");
    })

    $(".map").mouseup(function (e) {
        if (!$('.map-point').is(e.target) && 
            $('.map-point').has(e.target).length === 0) {
                $(".map-point").removeClass("map-point--active");
        }
    });

    // faq questions
    $(".faq-item__header").on("click", function(){
        let faqItem = $(this).parents(".faq-item");
        let faqOthers = $(".faq-item").not(faqItem);
        faqOthers.removeClass("faq-item--active");
        faqOthers.children(".faq-item__answer").slideUp();
        faqItem.toggleClass("faq-item--active");
        faqItem.children(".faq-item__answer").slideToggle();
    })

    // tour program day
    $(".tour-day__header").on("click", function(){
        let dayItem = $(this).parents(".tour-day");
        let dayOthers = $(".tour-day").not(dayItem);
        dayOthers.removeClass("tour-day--active");
        dayOthers.children(".tour-day__content").slideUp();
        dayItem.toggleClass("tour-day--active");
        dayItem.children(".tour-day__content").slideToggle();
    })

    // tour type content toggler
    $(".tour-type__content").hide();
    $(".tour-type__header").on("click", function(e){
        e.preventDefault();
        let tourType = $(this).parents(".tour-type");
        $(".tour-type").not(tourType).removeClass("tour-type--active").find(".tour-type__content").slideUp();
        tourType.toggleClass("tour-type--active").find(".tour-type__content").slideToggle();
    })

    // blog aside resize function

    var mobileBlog = true;
    if (winWidth < 1200) {
        mobileBlog = false;
    }
    $(window).on("load resize", () => {
        if (winWidth < 1200 && !mobileBlog) {
            $(".page-aside__blog > li").removeClass("active");
            $(".page-aside__blog .page-aside__sublist").hide();
            $(".page-aside__blog").removeClass("showed");
            mobileBlog = true;
        }
        if (winWidth >= 1200 && mobileBlog) {
            $(".page-aside__blog > .current-menu-item").addClass("active");
            $(".page-aside__blog .active .page-aside__sublist").show();
            $(".page-aside__blog").addClass("showed");
            mobileBlog = false;
        }
    })

    $(".page-aside__blog .page-aside__link").click(function(e){
        e.preventDefault();
        let item = $(this).parent();
        let activeItem = $(".page-aside__blog > li.active").not(item);
        activeItem.removeClass("active");
        activeItem.find(".page-aside__sublist").slideUp();
        item.toggleClass("active");
        item.find(".page-aside__sublist").slideToggle();
        $(".page-aside__blog").addClass("showed");
        $(".page-aside__mobile").addClass("active");
    })

    $(".page-aside__mobile").click(function(){
        $(this).toggleClass("active");
        let list = $(this).siblings("ul");
        list.toggleClass("showed");
        list.children("li").removeClass("active");
        list.find(".page-aside__sublist").slideUp();
    })

    // select not empty
    $(document).on('change', 'select', function(){
        $(this).addClass("selected");
    });

    // 100 vh fix
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');
    window.addEventListener('resize', () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', vh + 'px');
    });

}); // end ready
