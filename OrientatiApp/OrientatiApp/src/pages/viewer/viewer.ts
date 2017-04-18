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
  }

  ionViewWillEnter() {
      this.Viewer360.startAnimation();
  }

  ionViewWillLeave() {
      this.Viewer360.stopAnimation();
  }

  ngAfterViewInit() {
      if (this.Viewer360) {
          this.Viewer360.Init(this.image);
      }
  }

  toggleMode() {
      this.Viewer360.toggleControls();
  }

  back() {
      this.navCtrl.pop();
  }

  toggleRotation() {
      this.Viewer360.toggleRotation();
  }

  panEvent(e) {

      if (this.Viewer360.isNormal()) {
          if (this.Viewer360.isRotating()) {
              this.Viewer360.toggleRotation();
          }
      }
  }

  

}
