import { Component } from '@angular/core';

import { CercaPage } from '../cerca/cerca';
import { UtilityPage } from '../utility/utility';
import { MappaPage } from '../mappa/mappa';

@Component({
  selector: "page-tabs",
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MappaPage;
  tab2Root = CercaPage;
  tab3Root = UtilityPage;

  constructor() {

  }
}
