import { Component } from '@angular/core'
import { ViewController, ModalController } from 'ionic-angular'

import { Credits } from '../../pages/credits/credits'

@Component({
    template: `
    <ion-list>
      <button ion-item (click)="openCredits()">Credits</button>
      <button ion-item onclick="location.href='https://goo.gl/forms/9Sx1cBAxN3Ks9ReP2'">Invia un feedback</button>
    </ion-list>
  `
})

    //todo: add options
export class PopoverPage {
    constructor(public viewCtrl: ViewController, public modalCtrl: ModalController) { }

    openCredits() {
        this.viewCtrl.dismiss();
        let profileModal = this.modalCtrl.create(Credits);
        profileModal.present();
    }

    close() {
        this.viewCtrl.dismiss();
    }
}