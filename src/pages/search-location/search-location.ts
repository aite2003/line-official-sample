import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ApiServiceProvider} from '../../providers/api-service/api-service'

/**
 * Generated class for the ThumbnailListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-location',
  templateUrl: 'search-location.html',
})
export class SearchLocationPage {
  searchText:any;
  resposeData:any;
  searchDat:any=[];
  finesearch:any=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public authService:ApiServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ThumbnailListPage');
  }
  ionViewWillEnter()
  {
    this.searchText=this.navParams.get("search_text");
    if(this.searchText)
    {
      this.searchList(this.searchText,'no');
    }
  }

  searchList(name,option)
  {
    let splittext=name;
    let combinetext=name.replace(" ", "");
    this.finesearch=true;
    let postDat ={name:name,name_s0:combinetext,name_s1:splittext.split(' ')[0],name_s2:splittext.split(' ')[1],name_s3:splittext.split(' ')[2],google:option};
    console.log(combinetext);
    console.log(splittext.split(' ')[0]);
    console.log(splittext.split(' ')[1]);
    console.log(splittext.split(' ')[2]);
    console.log(postDat);
    this.authService.postDataMaps(postDat,"searchByName").then((result) =>{
      this.resposeData = result; // กำหนดข้อมูลล็อกอินให้กับ resposeData
       
      if(this.resposeData.searchDat!="null"){ // ถ้าข้อมูลถูกต้อง
this.searchDat=this.resposeData.searchDat;

if(this.searchDat.length==0)
{
  //this.searchDat="";
}
console.log(this.searchDat);
      }else{

      }
      }, (err) => {

      });
      
  }

  viewmaps(latlong,name)
  {
    console.log(latlong);
    this.navCtrl.push("ViewMapsPage",{latlong:latlong,name:name});
  }

  goBack()
  {
    this.navCtrl.pop()
  }
  select(latlong)
  {
    console.log(latlong);
    localStorage.setItem("pin-origin",latlong);
    this.navCtrl.pop()
  }

}
