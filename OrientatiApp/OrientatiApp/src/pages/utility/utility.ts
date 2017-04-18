import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Viewer } from '../viewer/viewer'

@Component({
  selector: 'page-utility',
  templateUrl: 'utility.html'
})
export class UtilityPage {

  constructor(public navCtrl: NavController) {

  }

  show360(img: string, ttl: string) {
      this.navCtrl.push(Viewer, { image: img, title: ttl }, { animation: 'md-transition' })
  }

}
