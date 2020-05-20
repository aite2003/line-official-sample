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
  selector: 'page-reviewer-food-add',
  templateUrl: 'reviewer-food-add.html',
})
export class ReviewerFoodAddPage {
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
userData:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl:AlertController
    ,public sanitizer:DomSanitizer
    ,public authService:ApiServiceProvider) {

      this.userData=JSON.parse(localStorage.getItem('line-param'));
console.log(this.userData);
     // {"id":"U35fe444ee63b68ababa8591a1fa961f1","name":"Aith Kunapongkiti","picture":"https://profile.line-scdn.net/0hjKt87xJuNWRJQR0KuD9KM3UEOwk-bzMsMXQuAW1HPANnd3BhfC5_UT5IagNkcHc3fCJ_VmoUOQNk"}
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewerFoodAddPage');
  }
  ionViewWillEnter()
  {
    if( localStorage.getItem('draft-res-review'))
    {
      let logDat=JSON.parse(localStorage.getItem('draft-res-review'));
      this.res_name=logDat.res_name;
      this.res_location=logDat.res_location;
      this.review_body=logDat.data;
      let mapsUrl="https://maps.google.com/maps?q="+this.res_location.latlong+"&t=&z=15&ie=UTF8&iwloc=&output=embed";
      this.res_location.googlemaps=this.sanitizer.bypassSecurityTrustResourceUrl(mapsUrl);

      this.review_body.forEach(element => {
        if(element.type=='youtube')
        {
          let link_convert="https://www.youtube.com/embed/"+element.link.split('/')[3]
          link_convert= link_convert.replace("watch?v=", "");
         element.full_link= this.sanitizer.bypassSecurityTrustResourceUrl(link_convert);
        }
      });
      
    }
    // Get photo from crop page
    if(localStorage.getItem('review-food-photo-index'))
    {
      let base64Img=localStorage.getItem('review-food-photo-crop');
      let imgIndex=localStorage.getItem('review-food-photo-index');

      this.review_body[imgIndex].src=base64Img;
      this.review_body[imgIndex].status="ok";
      localStorage.removeItem('review-food-photo-crop');
      localStorage.removeItem('review-food-photo-index');
    }
       // Get latlong from pick-origin page
       if(localStorage.getItem('res-latlong'))
       {
         this.res_location.latlong=localStorage.getItem('res-latlong');
         this.res_location.address=localStorage.getItem('res-address');
         setTimeout(()=>{
          let mapsUrl="https://maps.google.com/maps?q="+this.res_location.latlong+"&t=&z=15&ie=UTF8&iwloc=&output=embed";
          console.log(mapsUrl);
          this.res_location.googlemaps=this.sanitizer.bypassSecurityTrustResourceUrl(mapsUrl);
           },500);

         this.res_location.status="ok";
      localStorage.removeItem('res-latlong');
       localStorage.removeItem('res-address');
       }

  }

  editResname(mode)
  {
    if(mode=='save')
    {
      this.res_name.status="ok";
    }
    else if(mode=='edit')
    {
      this.res_name.status="";
    }
   

  }

  addText()
  {
    this.scrollToBottom();
    console.log("addText");
    this.review_body.push({type:"text",text:"",text_with_format:""});
  }
  editText(mode,index)
  {
    if(mode=='save')
    {
      this.review_body[index].text_with_format=this.review_body[index].text.replace(/\n/g,"<br>",0);
    //  this.review_body[index].text_with_format=this.review_body[index].text.replace("\r","<br>");
      console.log(this.review_body[index].text_with_format);
      this.review_body[index].status="ok";
    }
    else if(mode=='edit')
    {
      this.review_body[index].status="";
    }
    else if(mode=='delete')
    {
      let alert = this.alertCtrl.create({
        title: 'ยืนยันลบข้อมูล',
        message: "",
        buttons: [
          {
            text: 'ยกเลิก',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
     
      
            }
          },
          {
            text: 'ตกลง',
            handler: () => {
              console.log('Yes clicked');
              let front=this.review_body.slice(0, index);
              let back=this.review_body.slice(index+1, this.review_body.length);
              this.review_body=front.concat(back);
  
            }
          }
        ]
      });
      alert.present();


    }

  }


  addYoutube()
  {
    this.scrollToBottom();
    console.log("addText");
    this.review_body.push({type:"youtube",link:""});
  }

  editYoutube(mode,index)
  {
    if(mode=='save')
    {
      //for test1 // https://youtu.be/iTcks7ubU44
      //for test2 // https://www.youtube.com/watch?v=iU1U9tpOzQ8
      let link_convert="https://www.youtube.com/embed/"+this.review_body[index].link.split('/')[3]
      link_convert= link_convert.replace("watch?v=", "");
     this.review_body[index].full_link= this.sanitizer.bypassSecurityTrustResourceUrl(link_convert);
      this.review_body[index].status="ok";

  console.log(link_convert);
    }
    else if(mode=='edit')
    {
      this.review_body[index].status="";
    }
    else if(mode=='delete')
    {
      let alert = this.alertCtrl.create({
        title: 'ยืนยันลบข้อมูล',
        message: "",
        buttons: [
          {
            text: 'ยกเลิก',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
     
      
            }
          },
          {
            text: 'ตกลง',
            handler: () => {
              console.log('Yes clicked');
              let front=this.review_body.slice(0, index);
              let back=this.review_body.slice(index+1, this.review_body.length);
              this.review_body=front.concat(back);
  
            }
          }
        ]
      });
      alert.present();


    }

  }




  addImage()
  {
    this.scrollToBottom();
    console.log("addText");
    this.review_body.push({type:"image",link:""});
  }

  editImage(mode,index)
  {
    if(mode=='save')
    {
     this.review_body[index].imgBase64= "";
      this.review_body[index].status="ok";
    }
    else if(mode=='edit')
    {
      this.review_body[index].status="";
      this.review_body[index].src="";
    }
    else if(mode=='delete')
    {
      let alert = this.alertCtrl.create({
        title: 'ยืนยันลบข้อมูล',
        message: "",
        buttons: [
          {
            text: 'ยกเลิก',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
     
      
            }
          },
          {
            text: 'ตกลง',
            handler: () => {
              console.log('Yes clicked');
              let front=this.review_body.slice(0, index);
              let back=this.review_body.slice(index+1, this.review_body.length);
              this.review_body=front.concat(back);
  
            }
          }
        ]
      });
      alert.present();


    }

  }


onClickBtn(index){

  this.file.nativeElement.click();
  console.log(this.file);
  this.upload_image_index=index;

}

onFileChange(){
  let reader = new FileReader();
  this.preview='';
  reader.onload=(readerEvent)=>{
  this.imgBase64=(readerEvent.target as any).result; 
  this.upload();
  }
  reader.readAsDataURL(this.file.nativeElement.files[0]);
  this.image_name=this.file.nativeElement.files[0].name;
  this.image_type=this.file.nativeElement.files[0].type;
  this.image_size=this.file.nativeElement.files[0].size;

  this.file.nativeElement.value='';

  }


upload()
{ let quata=15000000;
  let alert = this.alertCtrl.create({
    title: "ไฟล์พบข้อผิดพลาด",
    message: "ไฟล์ไม่รองรับหรือมีขนาดใหญ่กว่า 15MB",
    buttons: ['Ok']}
      );

//this.review_body[this.upload_image_index].src=this.imgBase64;
//this.review_body[this.upload_image_index].status="ok";
console.log(this.image_type);
console.log(this.image_size/100000);

console.log(this.review_body);
this.navCtrl.push(PhotoCropPage,{photoBase64:this.imgBase64,imgIndex:this.upload_image_index});
if(this.image_size>quata)
{

  alert.present();


}

 
}

saveReview()
{
  let postDat={user_name:this.userData.name,user_id:this.userData.id,user_photo:this.userData.picture,res_name:this.res_name.name,res_location:this.res_location.latlong,res_address:this.res_location.address,data:this.review_body};

  

     console.log(postDat);
     this.authService.postData(postDat,'postResReview').then((result) => {
        this.resposeData=result;
        console.log(result);

      
  localStorage.removeItem('draft-res-review');
this.navCtrl.pop();

      }, (err) => {




     }).catch((error) => {
       console.log('Error getting location', error);
     });
  

}


saveDraft()
{

  let postDat={res_name:this.res_name,res_location:this.res_location,data:this.review_body};
  localStorage.setItem('draft-res-review',JSON.stringify(postDat));
}

gotoPickOrigin()
{
  this.navCtrl.push("ResPickOriginPage");
}

scrollToBottom() {
  setTimeout(() => {
    if(this.content.scrollToBottom){
        this.content.scrollToBottom();
    }
  },400)
}

enterKey(text,index)
{



 // text+="<br/> ";
    this.review_body[index].text=text;
    console.log(text);
    //alert("enter");
    console.log("press enter key");

}


}
