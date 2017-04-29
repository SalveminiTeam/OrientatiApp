import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import _ from "lodash";

import { DettagliPage } from '../dettagli/dettagli'

interface IRoom {
    "nome": string;
    "categoria": string;
    "descrizione": string;
    "piano": number;
    "foto": string;
    "photo360": string;
}

@Component({
  selector: 'page-mappa',
  templateUrl: 'mappa.html'
})
export class MappaPage {

    rooms: IRoom[] = [];

    locRooms: IRoom[] = [];

    zoom: number = 0.3;
    zoomMax: number = 2;
    zoomMin: number = 0.3;
    zoomStep: number = 0.5;

    floor: number = 0;

    constructor(public navCtrl: NavController, public http: Http, public modalCtrl: ModalController) {
        this.http.get('assets/data/rooms_data.json').map((res: Response) => res.json()).subscribe(data => {
            this.rooms = data.stanze;

            this.locRooms = _.cloneDeep<IRoom[]>(this.rooms);

        });
    }


    ionViewWillEnter() {

    }


    getIdxByName(list, name: string) {
        return list.findIndex(roomI => roomI.nome == name);
    }

    enterRoom(name: string) {

        if (name != null && name != '') {

            let idx = this.getIdxByName(this.locRooms, name);

            if (idx == -1) {
                console.error("Selected name '" + name + "' doesn't exist in the array.")
            } else {
                let room = this.locRooms[idx];


                let profileModal = this.modalCtrl.create(DettagliPage, { title: room.nome, description: room.descrizione, bannerImage: "assets/360photos/banner/" + room.photo360 + ".jpg", photo360: room.photo360, photo: room.foto });
                profileModal.present();
            }
        }
    }


  zoomIn() {

      let tempZoom: number;

      tempZoom = this.zoom + this.zoomStep;

      if (tempZoom <= this.zoomMax)
          this.zoom = this.zoom + this.zoomStep;
      else
          this.zoom = this.zoomMax;
  }

  zoomOut() {

      let tempZoom: number;

      tempZoom = this.zoom - this.zoomStep;

      if (tempZoom >= this.zoomMin)
          this.zoom = this.zoom - this.zoomStep;
      else
          this.zoom = this.zoomMin;
  }

}
