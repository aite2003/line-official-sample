import { Component } from '@angular/core';
import {  NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the StartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class StartPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public alerCtrl:AlertController) {

  }

  ionViewDidLoad() {
    //this.styleCard();
    console.log(window.innerWidth);
    console.log('ionViewDidLoad StartPage');


  }

  gotoSearchPage()
  {
    this.navCtrl.push("SearchLocationPage");

  }
  styleCard()
  {
    if(window.innerWidth>500)
    {
      return {"margin-top":"-10px",height:"300px"}
    }
    else
    {
      return {"margin-top":"-10px",height:"200px"}
    }

  }

  gotoDeliver()
  {
    let alert = this.alerCtrl.create({
      title: 'ยังไม่เปิดให้บริการ',
      message: '',
      buttons: ['Ok']
    });
    alert.present()
  }

}
