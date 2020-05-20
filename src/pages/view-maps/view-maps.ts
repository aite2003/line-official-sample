import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage,NavController, AlertController ,LoadingController,ViewController,ToastController,NavParams} from 'ionic-angular';
import { Platform } from 'ionic-angular';
// นำเข้า api-service
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { DomSanitizer } from '@angular/platform-browser';


@IonicPage()
@Component({
  selector: 'page-view-maps',
  templateUrl: 'view-maps.html'
})
export class ViewMapsPage {


  public resposeData: any;
  public dataSet: any;
  mapsUrl:any;
  mapsDirection:any;
  latlong:any;
  mapsShow:any;
  name:any;
  constructor(public navCtrl: NavController,public authService: ApiServiceProvider
    ,private alertCtrl: AlertController,public loadingCtrl: LoadingController,public alerCtrl: AlertController
    ,public viewCtrl: ViewController
    ,public platform: Platform
    ,private toastCtrl:ToastController
    ,private sanitizer: DomSanitizer
    ,public navParams:NavParams) {

      this.latlong=navParams.get('latlong');
      this.name=navParams.get('name');
      
  }

  ionViewWillEnter()
  {
    
    let lat1=this.latlong.split(',')[0];
    let long1=this.latlong.split(',')[1];;
    let lat2;
    let long2;
    let mapsUrl="https://maps.google.com/maps?q="+lat1+","+long1+"&t=&z=18&ie=UTF8&iwloc=&output=embed";
    this.mapsShow=this.sanitizer.bypassSecurityTrustResourceUrl(mapsUrl);
    let mapsDirection="https://www.google.com/maps/dir//"+lat1+","+long1+"/@"+lat1+","+long1+",13z?hl=en-US";
    //"https://www.google.com/maps/dir//"+lat2+","+long2+"/@"+lat1+","+long1+",13z?hl=en-US";
    this.mapsDirection = this.sanitizer.bypassSecurityTrustResourceUrl(mapsDirection);
  }


ionViewDidLoad() {
  console.log('ionViewDidLoad UserPage');

}




}
