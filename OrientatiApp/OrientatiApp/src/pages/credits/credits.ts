import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

interface IType{
    'nome': string;
    'team': IPeople[];
}

interface IPeople {
    'nome': string;
    'ruolo': string;
}

@Component({
  selector: 'page-credits',
  templateUrl: 'credits.html',
})
export class Credits {

    types: IType[] = []; 

    constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public viewCtrl: ViewController) {
        this.http.get('assets/data/credits_data.json').map((res: Response) => res.json()).subscribe(data => {
            this.types = data.types;
        });
    }

  ionViewDidLoad() {
    
  }

}
