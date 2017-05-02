import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';

import { CercaPage } from '../pages/cerca/cerca';
import { UtilityPage } from '../pages/utility/utility';
import { MappaPage } from '../pages/mappa/mappa';
import { TabsPage } from '../pages/tabs/tabs';
import { Viewer } from '../pages/viewer/viewer';
import { Viewer360Component } from '../components/viewer360/viewer360';
import { DettagliPage } from '../pages/dettagli/dettagli';
import { Cart } from '../pages/cart/cart';
import { HomePage } from '../pages/home/home';
import { Thanks } from '../pages/thanks/thanks';
import { Credits } from '../pages/credits/credits'

import { PopoverPage } from '../components/popoverMenu/popoverPage';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    CercaPage,
    UtilityPage,
    MappaPage,
    TabsPage,
    Viewer,
    Viewer360Component,
    DettagliPage,
    Cart,
    HomePage,
    Thanks,
    PopoverPage,
    Credits
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CercaPage,
    UtilityPage,
    MappaPage,
    TabsPage,
    Viewer,
    Viewer360Component,
    DettagliPage,
    Cart,
    HomePage,
    Thanks,
    PopoverPage,
    Credits
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
