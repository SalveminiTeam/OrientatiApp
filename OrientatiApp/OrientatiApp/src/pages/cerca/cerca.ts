import { Component } from '@angular/core';
import { NavController, ModalController, Keyboard, ToastController } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { DettagliPage } from '../dettagli/dettagli';

declare const jss;

interface IRoom {
    "nome": string;
    "categoria": string;
    "descrizione": string;
    "piano": number;
    "foto": string;
    "photo360": string;
}

interface ICategory {
    "nome": string;
    "foto": string;
    "sottotitolo": string;
}

@Component({
  selector: 'page-cerca',
  templateUrl: 'cerca.html'
})

export class CercaPage {

    cat: ICategory[] = [];
    rooms: IRoom[] = [];
    items = [];
    searchQuery: string = "";

    isInCat: boolean = false;


    constructor(public navCtrl: NavController, public http: Http, public modalCtrl: ModalController, public keyB: Keyboard, public toastCtrl: ToastController) {
        this.http.get('assets/data/rooms_data.json').map((res: Response) => res.json()).subscribe(data => {
            this.rooms = data.stanze;
            this.cat = data.categorie;

            this.getItems(null);


            console.log(this.rooms);
        }); 
    }

    ionViewWillEnter() {
        this.searchQuery = "";
        this.updateButton();

    }


    getItems(ev) {

        let pos: number = -1;
        let field: string;
        let query: string;
        let search: string = this.searchQuery.toLowerCase();

        pos = search.indexOf(":");

        if (pos >= 0) {
            field = search.substr(0, pos);
        } else {
            field = "nome";
        }

        query = search.substring(pos+1);

        this.items = this.rooms.filter((value) => {
            let found = false;
            if (value[field])
                found = value[field].toString().toLowerCase().includes(query);

            return found;
        });

    }

    enterCat(item: ICategory) {
        this.searchQuery = "categoria:" + item.nome;
        this.isInCat = true;
        this.updateButton();
        this.getItems(null);
    }

    enterRoom(room: IRoom) {
        let profileModal = this.modalCtrl.create(DettagliPage, { title: room.nome, description: room.descrizione, bannerImage: "assets/360photos/banner/" + room.photo360 + ".jpg", photo360: room.photo360, photo: room.foto });
        profileModal.present();
    }

    onCancel(ev) {
        this.searchQuery = "";
        this.keyB.close();
        this.isInCat = false;
        this.updateButton();
    }

    onClear(ev) {
        this.searchQuery = "";
        this.isInCat = false;
        this.updateButton();
    }


    updateButton() {

        if (this.isInCat || this.searchQuery != '') {
            jss.set('page-cerca .searchbar-md .searchbar-search-icon', {
                'display': 'none !important'
            });

            jss.set('page-cerca .searchbar-md .searchbar-md-cancel', {
                'display': 'block !important'
            });
        } else {
            jss.set('page-cerca .searchbar-md .searchbar-search-icon', {
                'display': 'block !important'
            });

            jss.set('page-cerca .searchbar-md .searchbar-md-cancel', {
                'display': 'none !important'
            });
        }

    }

    showToast(msg: string, duration: number = 2000, position: string = "bottom") {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: duration,
            position: position
        });
        toast.present();
    }


}
