import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-mappa',
  templateUrl: 'mappa.html'
})
export class MappaPage {

    zoom: number = 1;
    zoomMax: number = 2.5;
    zoomMin: number = 0.7;
    zoomStep: number = 0.5;

    floor: number = 0;

    constructor(public navCtrl: NavController) {

    }


    ionViewWillEnter() {

    }

  zoomIn() {

      let tempZoom: number;

      tempZoom = this.zoom + this.zoomStep;

      if (tempZoom <= this.zoomMax)
          this.zoom = this.zoom + this.zoomStep;
      else
          this.zoom = this.zoomMax;
  }

  zoomOut() {

      let tempZoom: number;

      tempZoom = this.zoom - this.zoomStep;

      if (tempZoom >= this.zoomMin)
          this.zoom = this.zoom - this.zoomStep;
      else
          this.zoom = this.zoomMin;
  }

}
