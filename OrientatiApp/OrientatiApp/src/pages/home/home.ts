import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Viewer } from '../viewer/viewer'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  show360(img: string, ttl: string) {
      this.navCtrl.push(Viewer, { image: img, title: ttl }, { animation: 'md-transition' } )
  }

}
