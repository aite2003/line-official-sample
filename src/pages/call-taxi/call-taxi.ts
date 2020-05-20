import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';

/**
 * Generated class for the ViewTaxiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-call-taxi',
  templateUrl: 'call-taxi.html',
})
export class CallTaxiPage {
  resposeData:any;
  input={pass_name:"",pass_tel:"",job_type:"",pick_time:"",pick_lat:"",pick_long:"",send_lat:"",send_long:"",pick_detail:"",send_detail:""}
url="http://mnt-cs.drayddns.com:1025/api-taxideliver";

pickLocation:any;
sendLocation:any;
constructor(public navCtrl: NavController, public navParams: NavParams
  ,public authService:ApiServiceProvider,public alerCtrl:AlertController) {
  //  this.taxiDat=navParams.get('taxiDat');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewTaxiPage');
  }
  ionViewWillEnter()
  {
    if(localStorage.getItem('pick-detail'))
    {
   this.pickLocation=localStorage.getItem('pick-detail');
   this.input.pick_detail=this.pickLocation;
   this.input.pick_lat=localStorage.getItem('pick-latlong').split(",")[0];
   this.input.pick_long=localStorage.getItem('pick-latlong').split(",")[1];
      console.log(this.pickLocation);
    }
    if(localStorage.getItem('send-detail'))
    {
      this.sendLocation=localStorage.getItem('send-detail');
      this.input.send_detail=this.sendLocation;
      this.input.send_lat=localStorage.getItem('send-latlong').split(",")[0];
      this.input.send_long=localStorage.getItem('send-latlong').split(",")[1];
    }
  }

  saveNewJob()
  {
    console.log(this.input);
    let alert = this.alerCtrl.create({
      title: 'บันทึกเรียบร้อย',
      message: 'รอคนขับติดต่อกลับ',
      buttons: ['Ok']
    });
    alert.present()
    this.navCtrl.popToRoot();
    localStorage.clear();

  /*  this.authService.postData(this.input,"addNewJob").then((result) =>{
      this.resposeData = result; // กำหนดข้อมูลล็อกอินให้กับ resposeData
         console.log(result);
         if(this.resposeData.result=='success')
         {
          let alert = this.alerCtrl.create({
            title: 'บันทึกเรียบร้อย',
            message: '',
            buttons: ['Ok']
          });
          alert.present()
          this.navCtrl.popToRoot();
         }
         else
         {
          let alert = this.alerCtrl.create({
            title: 'ไม่สามารถบันทึกได้',
            message: 'รหัสสัญญาอาจซ้ำกัน',
            buttons: ['Ok']
          });
          alert.present()
         }
       
  

  
      }, (err) => {
  
      });*/
  }

  pinLocation(mode)
  {
    this.navCtrl.push("PickOriginPage",{mode:mode})

  }


}
