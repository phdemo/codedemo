import { HttpClient, json } from 'aurelia-fetch-client';
let httpClient = new HttpClient();

/*
 * Model proxy for the images to be shown in the image slider.
 *
 * Takes care of asynchronously downloading the images.
 */
export class imagesApi {

    constructor() {
        httpClient.configure(config => {
            config
                .withBaseUrl('https://pawhermansen.dk/codedemo/backend/')
                .withDefaults({
                    headers: {
                        'Accept': 'application/json'
                    }
                });
        });
    }

    getImagenames() {
        return httpClient.fetch('images.php/')
            .then(response => {
                if (response.status !== 200) {
                    return [];
                } else {
                    return response.json();
                }
            })
            .then(response => {
                return response;
            });

    }

    getImagedata(imagename) {
        return httpClient.fetch('images.php/?image=' + encodeURIComponent(imagename))
            .then(response => {
                if (response.status !== 200) {
                    return { imagedata: '' };
                } else {
                    return response.json();
                }
            })
            .then(response => {
                if (response.hasOwnProperty('imagedata')) {
                    return response.imagedata;
                } else {
                    return '';
                }
            });
    }

}
