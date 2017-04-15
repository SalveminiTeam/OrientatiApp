import { Component, Input } from '@angular/core';
declare const THREE;


@Component({
    selector: 'img-card',
    templateUrl: 'ImageCard.html'
})
export class ImageCardComponent {

    @Input() title: string;
    @Input() subtitle: string;
    @Input() image: string;

    constructor() {
    }

}

