import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-cerca',
  templateUrl: 'cerca.html'
})
export class CercaPage {

  constructor(public navCtrl: NavController) {

  }

  getItems(ev) {
      //this.initializeItems();

      // set val to the value of the ev target
      /*var val = ev.target.value;

      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
          this.items = this.items.filter((item) => {
              return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
          })
      }*/
  }

}
