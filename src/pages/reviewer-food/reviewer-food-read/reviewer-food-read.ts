import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,Content } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { PhotoCropPage } from '../photocrop/photocrop';
import { ApiServiceProvider } from '../../../providers/api-service/api-service';

/**
 * Generated class for the ReviewerFoodAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reviewer-food-read',
  templateUrl: 'reviewer-food-read.html',
})
export class ReviewerFoodReadPage {
  @ViewChild(Content) content: Content;
  @ViewChild('file') file:ElementRef;
  review_body:any=[];
  crop_windows="no";
  imgBase64:any;
image_name:any;
image_type:any;
image_size:any;
preview:any;
upload_image_index:any;
res_name:any={name:"",status:""};
res_location:any={latlong:"",address:"",status:"",googlemaps:""};
resposeData:any;
isLiked:any=false;

reviewer_id:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl:AlertController
    ,public sanitizer:DomSanitizer
    ,public authService:ApiServiceProvider) {
      this.reviewer_id=navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewerFoodAddPage');
  }
  ionViewWillEnter()
  {
    this.getReviewerRes();
  }

  getReviewerRes()
  {
    let postDat={id:this.reviewer_id}
    console.log(this.reviewer_id);
    this.authService.postData(postDat,'getResReviewDetail').then((result) => {
      this.resposeData=result;
      this.res_name.name=this.resposeData.reviewerFoodDat.res_name;
      this.res_location.address=this.resposeData.reviewerFoodDat.res_address;
      this.res_location.latlong=this.resposeData.reviewerFoodDat.lat_long;
      this.review_body=JSON.parse(this.resposeData.reviewerFoodDat.review_body);

      let mapsUrl="https://maps.google.com/maps?q="+this.res_location.latlong+"&t=&z=15&ie=UTF8&iwloc=&output=embed";
      this.res_location.googlemaps=this.sanitizer.bypassSecurityTrustResourceUrl(mapsUrl);
      console.log(result);
      console.log(this.res_name);
      console.log(this.res_location);


    }, (err) => {




   }).catch((error) => {
     console.log('Error getting location', error);
   });
  }



}
