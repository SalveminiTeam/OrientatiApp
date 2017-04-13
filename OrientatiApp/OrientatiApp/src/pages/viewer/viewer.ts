import { ViewChild, Component, AfterViewInit, ElementRef } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { Viewer360Component } from '../../components/viewer360/viewer360'

@Component({
  selector: 'page-viewer',
  templateUrl: 'viewer.html'
})
export class Viewer implements AfterViewInit {

  @ViewChild('viewer') Viewer360;

  public image: string;
  public title: string;
  tabBarElement: any;

  constructor(public navCtrl: NavController, public params: NavParams) {
      this.image = params.get("image");
      this.title = params.get("title");
      this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
  }

  ionViewWillEnter() {
      this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave() {
      this.tabBarElement.style.display = 'flex';
  }

  ngAfterViewInit() {
      if (this.Viewer360) {
          this.Viewer360.Init(this.image);
          this.Viewer360.animate();
      }
  }

}
