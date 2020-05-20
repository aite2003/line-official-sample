import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, NavPush } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';

/**
 * Generated class for the ReviewerFoodPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reviewer-food',
  templateUrl: 'reviewer-food.html',
})
export class ReviewerFoodPage {
  resposeData:any;
  get_data:any;
  hide_loading=false;
  page:any= [];
page_count = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams,public authService:ApiServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewerFoodPage');
    this.reviewList();
  }

  gotoAdd()
  {
    this.navCtrl.push("ReviewerFoodAddPage")
  }


  reviewList()
   {

      let postDat={};
      console.log(postDat);
      this.authService.postData(postDat,'getAllResReview').then((result) => {
         this.resposeData=result;
         this.get_data=this.resposeData.reviewerFoodDat;
         console.log(this.get_data);


        for (let i = 1; i < 10; i++) {
          if(this.page_count<this.get_data.length){
          this.page.push(this.get_data[this.page_count])
         // this.wpDataSet.push( this.wpDataSet.length );
          }
         this.page_count++;
         
        }


       }, (err) => {
 


 
      }).catch((error) => {
        console.log('Error getting location', error);
      });
   }

   doInfinite(infiniteScroll) {
    console.log('Begin async operation');
  
    setTimeout(() => {
  
      console.log("infinite data set");
  
      for (let i = 1; i < 10; i++) {
        if(this.page_count<this.get_data.length){
  
        this.page.push(this.get_data[this.page_count])
       // this.wpDataSet.push( this.wpDataSet.length );
        }
        else
        {
           this.hide_loading=true;
        }
       this.page_count++;
       
      }
     
  
  
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

  gotoRead(id)
  {

    this.navCtrl.push("ReviewerFoodReadPage",{id:id});

  }


}
