import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the FoodmapsOptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-foodmaps-option',
  templateUrl: 'foodmaps-option.html',
})
export class FoodmapsOptionPage {
  latlong:any;
  tel:any;
  mapsDirection:any;
  constructor(public navCtrl: NavController, public navParams: NavParams
    ,public sanitizer:DomSanitizer) {

  }

  call()
  {
   // console.log(tel[1]);
    window.open('tel:'+this.tel);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad FoodmapsOptionPage');
    this.tel=this.navParams.get('tel');
    this.latlong=this.navParams.get('latlong');
    let mapsDirection="https://www.google.com/maps/dir//"+this.latlong+"/@"+this.latlong+",13z?hl=th";
    this.mapsDirection = this.sanitizer.bypassSecurityTrustResourceUrl(mapsDirection);
console.log(mapsDirection);
  }

}
