import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController) {
        this.menu.swipeEnable(false);
    }

    startTour() {
        this.navCtrl.setRoot(TabsPage);
    }
}
