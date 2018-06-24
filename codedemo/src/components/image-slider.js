import Swiper from 'swiper/js/swiper';
import { bindable } from 'aurelia-framework';

export class ImageSliderCustomElement {
    @bindable() imageUrls;

    constructor() {
        this.mySwiper = null;
    }

    attached() {
        this.mySwiper = new Swiper('.swiper-container', {
            slidesPerView: 3,
            loopFillGroupWithBlank: false,
            spaceBetween: 30,
            loop: true,

            // Navigation arrows
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                1199: {
                    slidesPerView: 2,
                },
                991: {
                    slidesPerView: 1,
                }
            }
        });

    }

    slideNext() {
        this.mySwiper.slideNext();
    }

    slidePrev() {
        this.mySwiper.slidePrev();
    }
}
