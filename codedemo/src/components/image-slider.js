import Swiper from 'swiper/js/swiper';
import { BindingEngine, bindable, bindingMode, inject } from 'aurelia-framework';

@inject(BindingEngine)
export class ImageSliderCustomElement {
    @bindable() images;

    constructor(bindingEngine) {
        this.bindingEngine = bindingEngine;
        this.mySwiper = null;
    }

    attached() {
        this.mySwiper = new Swiper('.swiper-container', {
            slidesPerView: 3,
            loopFillGroupWithBlank: false,
            spaceBetween: 30,
            loop: true,
            breakpoints: {
                1199: {
                    slidesPerView: 2,
                },
                991: {
                    slidesPerView: 1,
                }
            }
        });

        // Add images that were already downloaded
        for (let i = 0; i < this.images.length; i++) {
            this.addNewImageToSlider(i);
        }

        // Catch every time a new image has been downloaded
        this.subscription = this.bindingEngine.collectionObserver(this.images)
            .subscribe((splices) => this.imagesChanged(splices));
    }

    detached() {
        this.subscription.dispose();
    }

    // Adds any new images that have been downloaded
    imagesChanged(splices) {
        if (this.mySwiper != null) {
            for (let i = 0; i < splices.length; i++) {
                var splice = splices[i];
                for (let j = 0; j < splice.addedCount; j++) {
                    this.addNewImageToSlider(splice.index + j);
                }

                if (splice.removed.length > 0) {
                    // Ignored for now
                }
            }
        }
    }

    // Inserts a new image into the image slider
    addNewImageToSlider(idx) {
        let addedImagedata = this.images[idx];
        let slide = '<div class="swiper-slide"><img src="' +
            addedImagedata +
            '" alt="Image"/></div>';
        this.mySwiper.appendSlide(slide);
    }

    slideNext() {
        this.mySwiper.slideNext();
    }

    slidePrev() {
        this.mySwiper.slidePrev();
    }
}
