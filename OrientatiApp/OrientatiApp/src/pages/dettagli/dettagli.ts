import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-dettagli',
  templateUrl: 'dettagli.html',
})
export class DettagliPage {



    nome: string = "Auditorium";
    descrizione: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris rutrum lacinia turpis non dictum. Ut pulvinar ligula ex, sed viverra metus convallis et. Phasellus interdum lorem nulla, et cursus sem pellentesque at. Ut non bibendum tortor. Nunc sollicitudin gravida enim at elementum. Ut ut elit pretium, rhoncus eros non, molestie nibh. Proin ut lorem vestibulum, condimentum eros vitae, elementum enim. Vivamus purus augue, malesuada sed turpis eu, posuere facilisis tortor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris rutrum lacinia turpis non dictum. Ut pulvinar ligula ex, sed viverra metus convallis et. Phasellus interdum lorem nulla, et cursus sem pellentesque at. Ut non bibendum tortor. Nunc sollicitudin gravida enim at elementum. Ut ut elit pretium, rhoncus eros non, molestie nibh. Proin ut lorem vestibulum, condimentum eros vitae, elementum enim. Vivamus purus augue, malesuada sed turpis eu, posuere facilisis tortor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.";

    tabBarElement: any;

    constructor(public navCtrl: NavController, public params: NavParams) {

    }

    ionViewWillEnter() {

    }

    ionViewWillLeave() {

    }

    back() {
        this.navCtrl.pop();
    }
}
