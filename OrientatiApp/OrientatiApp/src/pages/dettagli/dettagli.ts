import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { Viewer } from '../viewer/viewer'

@Component({
  selector: 'page-dettagli',
  templateUrl: 'dettagli.html',
})
export class DettagliPage {



    title: string;
    descrizione: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris rutrum lacinia turpis non dictum. Ut pulvinar ligula ex, sed viverra metus convallis et. Phasellus interdum lorem nulla, et cursus sem pellentesque at. Ut non bibendum tortor. Nunc sollicitudin gravida enim at elementum. Ut ut elit pretium, rhoncus eros non, molestie nibh. Proin ut lorem vestibulum, condimentum eros vitae, elementum enim. Vivamus purus augue, malesuada sed turpis eu, posuere facilisis tortor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris rutrum lacinia turpis non dictum. Ut pulvinar ligula ex, sed viverra metus convallis et. Phasellus interdum lorem nulla, et cursus sem pellentesque at. Ut non bibendum tortor. Nunc sollicitudin gravida enim at elementum. Ut ut elit pretium, rhoncus eros non, molestie nibh. Proin ut lorem vestibulum, condimentum eros vitae, elementum enim. Vivamus purus augue, malesuada sed turpis eu, posuere facilisis tortor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.";
    bannerImage: string;
    photo360: string;

    tabBarElement: any;

    constructor(public navCtrl: NavController, public params: NavParams, public modalCtrl: ModalController) {
        this.bannerImage = params.get("bannerImage");
        this.title = params.get("title");
        this.descrizione = params.get("description");
        this.photo360 = params.get("photo360");
    }

    ionViewWillEnter() {

    }

    ionViewWillLeave() {

    }

    show360() {
        let profileModal = this.modalCtrl.create(Viewer, { image: this.photo360, title: this.title });
        profileModal.present();
    }

    back() {
        this.navCtrl.pop();
    }
}
