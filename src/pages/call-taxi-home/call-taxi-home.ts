import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CallTaxiHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-call-taxi-home',
  templateUrl: 'call-taxi-home.html',
})
export class CallTaxiHomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if(!localStorage.getItem('line-param'))
    {
      navCtrl.setRoot("RegisterPage");
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CallTaxiHomePage');
  }

  call()
  {
    let tel="0954162495";
   // console.log(tel[1]);
    window.open('tel:'+tel);
  }

}
