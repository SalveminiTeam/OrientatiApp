import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { Viewer } from '../viewer/viewer'

@Component({
  selector: 'page-utility',
  templateUrl: 'utility.html'
})
export class UtilityPage {

    constructor(public navCtrl: NavController, public modalCtrl: ModalController) {

    }

  show360(img: string, ttl: string) {
      let profileModal = this.modalCtrl.create(Viewer, { image: img, title: ttl } );
      profileModal.present();
  }

}
