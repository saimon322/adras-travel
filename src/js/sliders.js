import Swiper from 'swiper/swiper-bundle.min.js';

export function sliders($this) {
	$this.each((i, elem) => {
		let sliderId = $(elem).attr('id');
		let $slider = $(`#${sliderId}`);
		let sliderArrows = $slider.data('arrows') || 'swiper-button';
		let sliderScrollbar = $slider.data('scrollbar');
		let showSlides = $slider.data('show-slides') || 'auto';
        let sliderLoop = $slider.data('loop');
        let sliderSpeed = $slider.data('speed');
		let prevNavTemp = `<button class="${sliderArrows} ${sliderArrows}--prev" type="button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 59 59" fill="none" stroke="currentColor"><path d="M32 22L24 29.5L32 37" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="29.5" cy="29.5" r="28.5" transform="rotate(-180 29.5 29.5)" stroke-width="2"/></svg></button>`;
		let nextNavTemp = `<button class="${sliderArrows} ${sliderArrows}--next" type="button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 59 59" fill="none" stroke="currentColor"><path d="M27 37L35 29.5L27 22" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="29.5" cy="29.5" r="28.5" stroke-width="2"/></svg></button>`;

		$slider.addClass('swiper-container swiper-slider');
		$slider.find('.swiper-slide').wrapAll('<div class="swiper-wrapper"></div>');

		if (sliderArrows) {
			$slider.prepend(prevNavTemp);
			$slider.append(nextNavTemp);
        }

		let swiper = new Swiper((`#${sliderId}`), {
            slidesPerView: showSlides,
            loop: sliderLoop ? true : false,
            speed: sliderSpeed ? sliderSpeed : 300,
			navigation: sliderArrows ? {
				nextEl: `.${sliderArrows}--next`,
				prevEl: `.${sliderArrows}--prev`,
            } : false,
			scrollbar: sliderScrollbar ? {
				hide: false,
				draggable: true,
				el: `.${sliderScrollbar}`,
			} : false,
			breakpoints: {
				320: {
					slidesPerView: 'auto',
				},
				640: {
					slidesPerView: 'auto',
				},
				860: {
					slidesPerView: 'auto',
				}
            }
        });
    });
    
    // slider buttons auto hiding
    // $(window).on("load resize", function() {
    //     $(".slider-scrollbar").each(function(){
    //         if ($(this).is(":visible")) {
    //             $(this).siblings(".swiper-button").show();
    //         } else {
    //             $(this).siblings(".swiper-button").hide();
    //         }
    //     });
    // });
}
