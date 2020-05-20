import { Component } from '@angular/core';
import { NavController,IonicPage } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { StartPage } from '../start/start';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  lineParam:any;
  id:any;
  picture:any;
  name:any;
  tel:any;
editmode=false
resposeData:any;
  profile:any={line_id:"",name:"",picture:"",tel:""}


  constructor(public navCtrl: NavController,public authService:ApiServiceProvider) {
    this.lineParam=JSON.parse(localStorage.getItem('line-param'));
    this.profile.line_id=this.lineParam.id;
    this.profile.picture=this.lineParam.picture;
    this.profile.name=this.lineParam.name;
    this.profile.tel="0999999";
    
  }
  open_edit()
  {
    this.editmode=true;
  }

  save_edit()
  {
    this.editmode=false;
  }


  uploadData()
  {
    console.log(this.profile);
    this.authService.postData(this.profile,'lineLogin').then((result) => {
      this.resposeData=result;
console.log(this.resposeData);
 this.navCtrl.setRoot("FoodMapsPage");
     

    }, (err) => {




   }).catch((error) => {
     console.log('Error getting location', error);
   });
  }


}
