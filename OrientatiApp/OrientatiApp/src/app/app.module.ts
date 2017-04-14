import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { CercaPage } from '../pages/cerca/cerca';
import { UtilityPage } from '../pages/utility/utility';
import { MappaPage } from '../pages/mappa/mappa';
import { TabsPage } from '../pages/tabs/tabs';
import { Viewer } from '../pages/viewer/viewer';
import { Viewer360Component } from '../components/viewer360/viewer360';
import { ImgBlurComponent } from '../components/imgBlur/imgBlur';


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
    ImgBlurComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
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
    ImgBlurComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
