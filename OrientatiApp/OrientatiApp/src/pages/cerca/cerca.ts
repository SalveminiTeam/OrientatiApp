import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-cerca',
  templateUrl: 'cerca.html'
})

export class CercaPage {

    rooms;
    items = [];

    constructor(public navCtrl: NavController, public http: Http) {
        this.rooms = this.http.get('data/data.json'); subscribe(rooms => {
            this.rooms = rooms;
        }); 
        console.log(this.rooms);
        this.initializeItems();
    }


    initializeItems() {
        for (let element of this.rooms) {
            this.items.push(element);
        }
        console.log(this.items);
    }



    getItems(ev) {

    }

}
