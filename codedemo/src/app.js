import 'bootstrap';
import { imagesApi } from './imagesApi';
import { BindingEngine, inject } from 'aurelia-framework';

/*
 * The main app that binds everything together.
 * Takes care of getting data for the image slider.
 */

@inject(imagesApi)
export class App {
    constructor(imagesApi) {
        this.imagesApi = imagesApi;
        this.images = [];
    }

    attached() {
        // It is a requirement to load the images with ajax/json.
        // First load the list of available images
        this.imagesApi.getImagenames().then(imagelist => {
            if (typeof imagelist !== 'undefined' && imagelist != null && imagelist.length > 0) {

                // Second load each available image one by one as a base64 string
                for (const imageName of imagelist) {
                    this.imagesApi.getImagedata(imageName).then(image => {
                        this.images.push(image);
                    });
                }
            }
        });
    }

}
