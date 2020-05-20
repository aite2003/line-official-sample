import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';

/**
 * Generated class for the ResUserReviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-res-user-review',
  templateUrl: 'res-user-review.html',
})
export class ResUserReviewPage {
res_id:any;
res_name:any;
resposeData:any;
get_data:any;
nodata:any=false;
image:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public authService:ApiServiceProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResUserReviewPage');
    this.res_id=this.navParams.get('res_id');
    this.res_name=this.navParams.get('res_name');
    this.image= this.navParams.get('img');
    console.log(this.res_id);
    this.reviewList();
  }
  ionViewDidEnter()
  {
    console.log("ionViewDidEnter");
    let p = document.getElementsByTagName('page-food-maps')[0];
console.log(p);



let intervalTime = setInterval(() => { 

    p.removeAttribute("hidden"); 
    console.log("hidden true");

  

  

}, 0.1);
setTimeout(() => {
  clearInterval(intervalTime);
}, 1000);



  }


  reviewList()
   {
  
      let postDat={res_id:this.res_id};

      this.authService.postData(postDat,'getResReview').then((result) => {
         this.resposeData=result;
         this.get_data=this.resposeData.resReviewDat;
         console.log(this.get_data);

if(this.get_data.length==0)
{
  this.nodata=true;
}

       }, (err) => {
 


 
      }).catch((error) => {
        console.log('Error getting location', error);
      });
   }

   close()
   {
     this.navCtrl.pop({ animate: true, animation: 'md-transition',direction:'back' ,duration: 300 });
   }

   ionViewWillLeave()
   {
     //this.close();
   }

   ionViewCanLeave(){

   }

}
