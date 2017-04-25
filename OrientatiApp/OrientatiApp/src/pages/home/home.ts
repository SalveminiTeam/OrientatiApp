import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';

import { Viewer } from '../viewer/viewer';

/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController) {
        this.menu.swipeEnable(false);
    }

  startTour() {

      this.navCtrl.push(Viewer, { image: "360photo.png", title: "Snow" });
  }
}
