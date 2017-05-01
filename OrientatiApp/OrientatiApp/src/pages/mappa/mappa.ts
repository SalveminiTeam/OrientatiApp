import { Component, ViewChild, AfterViewInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { NavController, ModalController, ToastController } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import _ from "lodash";

import { DettagliPage } from '../dettagli/dettagli'

declare const imageMapResize;

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
export class MappaPage implements AfterViewInit {

    @ViewChild("mapT") mapT: ElementRef;
    @ViewChild("map1") map1: ElementRef;
    @ViewChild("map2") map2: ElementRef;

    rooms: IRoom[] = [];

    locRooms: IRoom[] = [];

    pinch;

    heightT: number = 100;
    height1: number = 100;
    height2: number = 100;

    heightMax: number = 300;
    heightMin: number = 100;
    heightStep: number = 30;

    opacityT: number = 1;
    opacity1: number = 0;
    opacity2: number = 0;

    displayT: string = 'block';
    display1: string = 'none';
    display2: string = 'none';

    floor: number = 0;

    constructor(public navCtrl: NavController, public http: Http, public modalCtrl: ModalController, private cd: ChangeDetectorRef, public toastCtrl: ToastController) {
        this.http.get('assets/data/rooms_data.json').map((res: Response) => res.json()).subscribe(data => {
            this.rooms = data.stanze;

            this.locRooms = _.cloneDeep<IRoom[]>(this.rooms);

        });
    }

    ngAfterViewInit() {
        this.updateMapSize();
    }

    range(val: number, min: number, max: number, oldMin: number = 0.5, oldMax: number = 2): number {
        return (((val - oldMin) * (max - min)) / (oldMax - oldMin)) + min;
    }

    onPinch(e) {
        this.pinch = e.scale;

        let zoom: number = e.scale.toPrecision(2);

        this.setHeight(this.range(zoom, this.heightMin, this.heightMax));

       
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

      let height: number = this.getHeight();  
      let tempHeight: number;

      tempHeight = height + this.heightStep;

      if (tempHeight <= this.heightMax)
          this.setHeight(height + this.heightStep);
      else
          this.setHeight(this.heightMax);

      this.updateMapSize();

  }

  zoomOut() {

      let height: number = this.getHeight();
      let tempHeight: number;

      tempHeight = height - this.heightStep;

      if (tempHeight >= this.heightMin)
          this.setHeight(height - this.heightStep);
      else
          this.setHeight(this.heightMin);

      this.updateMapSize();

  }

  getHeight(): number {

      let height: number;

      switch (this.floor) {
          case 0:
              height = this.heightT;
              break;
          case 1:
              height = this.height1;
              break;
          case 2:
              height = this.height2;
              break;
      }

      return height;

  }

  setHeight(val: number) {

      switch (this.floor) {
          case 0:
              this.heightT = val;
              break;
          case 1:
              this.height1 = val;
              break;
          case 2:
              this.height2 = val;
              break;
      }
  }


  changeFloor(floor: number) {
      this.floor = floor;

      switch (floor) {
          case 0:
              setTimeout(() => {
                  this.opacity1 = 0;
                  this.opacity2 = 0;
              }, 100);

              this.display1 = this.display2 = 'none';

              this.displayT = 'block';
              setTimeout(() => { this.opacityT = 1; }, 100);

              this.updateMapSize();

              break;
          case 1:
              setTimeout(() => {
                  this.opacityT = 0;
                  this.opacity2 = 0;
              }, 100);

              this.displayT = this.display2 = 'none';

              this.display1 = 'block';
              setTimeout(() => { this.opacity1 = 1; }, 100);

              this.updateMapSize();

              break;
          case 2:
              setTimeout(() => {
                  this.opacity1 = 0;
                  this.opacityT = 0;
              }, 100);

              this.display1 = this.displayT = 'none';

              this.display2 = 'block';
              setTimeout(() => { this.opacity2 = 1; }, 100);

              this.updateMapSize();

              break;
      }
  }

  updateMapSize() {

      this.cd.markForCheck();
      setTimeout(() => {
          switch (this.floor) {
              case 0:
                  imageMapResize(this.mapT.nativeElement);
                  break;
              case 1:
                  imageMapResize(this.map1.nativeElement);
                  break;
              case 2:
                  imageMapResize(this.map2.nativeElement);
                  break;
          }
      }, 50
      );

      this.cd.markForCheck();
  }


  showToast(msg: string, duration: number = 2000, position: string = "top") {
      let toast = this.toastCtrl.create({
          message: msg,
          duration: duration,
          position: position
      });
      toast.present();
  }

}
