import { Component, ViewChild, AfterViewInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { NavController, ModalController, ToastController, Gesture, FabContainer, PopoverController } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import _ from "lodash";

import { DettagliPage } from '../dettagli/dettagli'
import { PopoverPage } from '../../components/popoverMenu/popoverPage'

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

    transforms = [];
    adjustScale = 1;

    currentScale = null;


    heightT: number = 100;
    height1: number = 100;
    height2: number = 100;

    heightMax: number = 300;
    heightMin: number = 100;
    heightStep: number = 35;

    opacityT: number = 1;
    opacity1: number = 0;
    opacity2: number = 0;

    displayT: string = 'block';
    display1: string = 'none';
    display2: string = 'none';

    zoomed: boolean = false;

    floor: number = 0;

    constructor(public navCtrl: NavController, public http: Http, public modalCtrl: ModalController, private cd: ChangeDetectorRef, public toastCtrl: ToastController, public popoverCtrl: PopoverController) {
        this.http.get('assets/data/rooms_data.json').map((res: Response) => res.json()).subscribe(data => {
            this.rooms = data.stanze;

            this.locRooms = _.cloneDeep<IRoom[]>(this.rooms);

        });
    }

    ngAfterViewInit() {
        this.updateMapSize();
    }

    ionViewWillLeave() {
        this.resetZoom();
    }


    range(val: number, min: number, max: number, oldMin: number = 0.5, oldMax: number = 2): number {
        return (((val - oldMin) * (max - min)) / (oldMax - oldMin)) + min;
    }

    doubleTap() {
        if (this.zoomed) {
            this.zoomOut(90);
        } else if (!this.zoomed) {
            this.zoomIn(90);
        }

        this.zoomed = !this.zoomed;
    }

    onPinch(e) {
        
        /*this.transforms = [];

        // Adjusting the current pinch/pan event properties using the previous ones set when they finished touching
        this.currentScale = this.adjustScale * this.range(e.scale, 0.2, 1.5, 0.9, 3);
        console.log(e.scale);
        console.log(this.currentScale);
        // Concatinating and applying parameters.
        if (this.currentScale < 1) {
            this.currentScale = 1;
        }

        this.setHeight(this.clamp(this.range(this.currentScale, this.heightMin, this.heightMax, 1, 4), this.heightMin, this.heightMax));
        */
        }

    clamp(val, min, max): number {
        if (val >= max) {
            return max;
        } else if (val <= min) {
            return min;
        } else { return val; }
    };

    onTouchEnd() {
        this.adjustScale = this.currentScale;
    }

 
    getIdxByName(list, name: string) {
        return list.findIndex(roomI => roomI.nome == name);
    }

    presentPopover(myEvent) {
        let popover = this.popoverCtrl.create(PopoverPage);
        popover.present({
            ev: myEvent
        });
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


    zoomIn(hStep: number = this.heightStep) {

      let height: number = this.getHeight();  
      let tempHeight: number;

      tempHeight = height + hStep;

      if (tempHeight <= this.heightMax)
          this.setHeight(height + hStep);
      else
          this.setHeight(this.heightMax);

      this.updateMapSize();

  }

    zoomOut(hStep: number = this.heightStep) {

      let height: number = this.getHeight();
      let tempHeight: number;

      tempHeight = height - hStep;

      if (tempHeight >= this.heightMin)
          this.setHeight(height - hStep);
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


  changeFloor(floor: number, fab: FabContainer) {
      this.floor = floor;

      this.resetZoom();

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


      fab.close(); 

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

  resetZoom() {
      this.heightT = 100;
      this.height1 = 100;
      this.height2 = 100;
  }


}
