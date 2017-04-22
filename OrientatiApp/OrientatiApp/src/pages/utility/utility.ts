import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import _ from "lodash";

interface IFood {
    "nome": string;
    "prezzo": number;
    "quantità": number;
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
    searchQuery: string = "";

    constructor(public navCtrl: NavController, public http: Http, public modalCtrl: ModalController) {  
        this.http.get('assets/data/bar_data.json').map((res: Response) => res.json()).subscribe(data => {
            this.cats = data.categorie;
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

}
