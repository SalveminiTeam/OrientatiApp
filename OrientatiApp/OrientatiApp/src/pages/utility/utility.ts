﻿import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import _ from "lodash";

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
    position: string = "fixed";

    constructor(public navCtrl: NavController, public http: Http, public modalCtrl: ModalController) {  
        this.http.get('assets/data/bar_data.json').map((res: Response) => res.json()).subscribe(data => {
            this.cats = data.categorie;
            this.cart = this.getWholeList(_.cloneDeep<ICat[]>(this.cats));
            console.log(this.cart);
            this.getItems(null);
        });
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
            return '1';
        } else {
            return '0';
        }
    }

    getMargin() {
        if (this.total > 0) {
            return '48px';
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

}
