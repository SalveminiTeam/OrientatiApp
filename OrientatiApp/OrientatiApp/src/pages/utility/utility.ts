import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import _ from "lodash";

import { Cart } from '../cart/cart';

interface IFood {
    "nome": string;
    "prezzo": number;
    "quantita": number;
}

interface ICat {
    "nome": string;
    "cibo": IFood[];
}
 
@Component({
  selector: 'page-utility',
  templateUrl: 'utility.html'
})
export class UtilityPage {

    cats: ICat[] = [];
    items: ICat[] = [];
    cart: IFood[] = [];

    searchQuery: string = "";
    total: number = 0;


    constructor(public navCtrl: NavController, public http: Http, public modalCtrl: ModalController, public alertCtrl: AlertController) {  

        this.http.get('assets/data/bar_data.json').map((res: Response) => res.json()).subscribe(data => {
            this.cats = data.categorie;
            this.cart = this.getWholeList(_.cloneDeep<ICat[]>(this.cats));
            console.log(this.cart);
            this.getItems(null);
        });

        let alert = this.alertCtrl.create({
            title: 'Attenzione',
            subTitle: "L'Utility del bar non è attualmente funzionante. Gli ordini non verranno processati.",
            buttons: ['OK']
        });
        alert.present();

    }

    getItems(ev) {

        if (this.searchQuery != "") {
            for (let cat of this.cats) {
                this.items.filter(ca => ca.nome == cat.nome)[0].cibo = cat.cibo.filter(food => food['nome'].toLowerCase().includes(this.searchQuery.toLowerCase()));
            }
        } else { this.items = _.cloneDeep<ICat[]>(this.cats); }
    }

    addItem(food: IFood) {
        let idx: number = this.getIdxByName(this.cart, food.nome);
        if (this.cart[idx].quantita < food.quantita) {
            this.cart[idx].quantita++;

            this.calcTotal();
        }
    }

    removeItem(food: IFood) {
        let idx: number = this.getIdxByName(this.cart, food.nome);
        if (this.cart[idx].quantita > 0) {
            this.cart[idx].quantita--;

            this.calcTotal();
        }
    }


    getWholeList(list: ICat[]) {

        let cart: IFood[] = [];

        for (let cat of list) {
            for (let food of cat.cibo) {
                food.quantita = 0;
                cart.push(food);
            }
        }

        return cart;

    }

    getIdxByName(list, name: string) {
        return list.findIndex(foodI => foodI.nome == name);
    }

    calcTotal() {

        let tempTotal: number = 0;

        for (let item of this.cart) {
            tempTotal = tempTotal + (item.prezzo * item.quantita);
        }
        this.total = tempTotal;

    }

    toMoney(value: number) {
        if (value < 1) { return value.toPrecision(2) }
        else if (value < 10) { return value.toPrecision(3) }
        else if (value < 100) { return value.toPrecision(4) }
    }

    getOpacity() {

        if (this.total > 0) {
            return '0';
        } else {
            return '-100%';
        }
    }

    getMargin() {
        if (this.total > 0) {
            return '5.54rem';
        } else {
            return '0px';
        }
    }

    reset() {
        this.cart = this.getWholeList(_.cloneDeep<ICat[]>(this.cats));

        this.searchQuery = "";
        this.getItems(null);
        this.total = 0;
    }

    submit() {
        let profileModal = this.modalCtrl.create(Cart, { cart: this.cart });
        profileModal.onWillDismiss((value) => {
            if (value) {
                this.reset();
            }
        });
        profileModal.present();
    }
}
