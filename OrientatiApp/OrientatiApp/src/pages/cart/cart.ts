import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';

import { Thanks } from '../thanks/thanks';

interface IFood {
    "nome": string;
    "prezzo": number;
    "quantita": number;
}

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class Cart {

    cart: IFood[] = [];

    total: number = 0;

    constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public viewCtrl: ViewController) {
        this.cart = navParams.get('cart');
        this.calcTotal();
    }

    toMoney(value: number) {
        if (value < 1) { return value.toPrecision(2) }
        else if (value < 10) { return value.toPrecision(3) }
        else if (value < 100) { return value.toPrecision(4) }
    }


    ionViewDidLoad() {

    }

    calcTotal() {

        let tempTotal: number = 0;

        for (let item of this.cart) {
            tempTotal = tempTotal + (item.prezzo * item.quantita);
        }
        this.total = tempTotal;

    }

    back() {
        this.viewCtrl.dismiss();
    }

    submit() {
        let profileModal = this.modalCtrl.create(Thanks);
        profileModal.onDidDismiss( () => { this.back(); })
        profileModal.present();
    }

}
