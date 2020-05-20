import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule,HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ApiServiceProvider } from '../providers/api-service/api-service';
import {HttpModule} from '@angular/http';

import { AboutPage } from '../pages/about/about';

import { HomePage } from '../pages/home/home';

import { StartPage } from '../pages/start/start';
import { TabsPage } from '../pages/tabs/tabs';
import { PhotoCropPage } from '../pages/reviewer-food/photocrop/photocrop';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Import your Photo library  //npm install ionic-gallery-modal --save
import * as ionicGalleryModal from 'ionic-gallery-modal';


import { AngularCropperjsModule } from 'angular-cropperjs';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HomePage,StartPage,PhotoCropPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularCropperjsModule,
    ionicGalleryModal.GalleryModalModule, // Import your Photo library 
    IonicModule.forRoot(MyApp,{tabsHideOnSubPages: true,mode:'ios'})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    HomePage,StartPage,PhotoCropPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ApiServiceProvider,
    
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    // Import your Photo library 
    {
      provide: HAMMER_GESTURE_CONFIG, 
      useClass: ionicGalleryModal.GalleryModalHammerConfig,
    }
  ]
})
export class AppModule {}
