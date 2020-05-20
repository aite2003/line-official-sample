import { Component,ViewChild,ElementRef } from '@angular/core';
import { NavController, AlertController ,LoadingController,ViewController,ToastController,NavParams} from 'ionic-angular';
import { Platform } from 'ionic-angular';
// นำเข้า api-service
import { AngularCropperjsComponent} from 'angular-cropperjs';


@Component({
  selector: 'page-photocrop',
  templateUrl: 'photocrop.html'
})
export class PhotoCropPage {
  @ViewChild('angularCropper') public angularCropper: AngularCropperjsComponent;
  cropperOptions: any;
  croppedImage = null;
  myImage = null;
  scaleValX = 1;
  scaleValY = 1;
  ratioSelect:any=0.66;
  imgIndex:any;

  imageURI:any;
imageFileName:any;
imgBase64:any;
image_name:any;
image_type:any;
image_size:any;
getImageData:any;
brandList:any;
return_image={"base64img":"","phototype":"","photosize":""};

@ViewChild('file') file:ElementRef;
preview:any;

    //กำหนดตัวแปร
  public resposeData: any;
  public dataSet: any;
  public ldtDataSet: any;
  public ldtJson: any;
  public search_query: any;
  pos:any;
  res_id:any;
  old_file:any;


  constructor(public navCtrl: NavController
    ,private alertCtrl: AlertController,public loadingCtrl: LoadingController,public alerCtrl: AlertController
    ,public viewCtrl: ViewController
    ,public navParams: NavParams
    ,public platform: Platform
    ,private toastCtrl:ToastController) {




  }

  ionViewWillEnter(){
    this.imgBase64 = this.navParams.get('photoBase64'); // ตัวแปรให้ค้นหาสมาชิก
    this.ratioSelect=this.navParams.get('ratio'); 
    this.imgIndex=this.navParams.get('imgIndex'); 
    console.log(this.imgBase64);
    this.cropperOptions = {
      dragMode: 'crop',
      aspectRatio: 1.6,
      autoCrop: true,
      movable: true,
      zoomable: true,
      scalable: true,
      responsive: false,
      viewMode: 1,
      autoCropArea: 1,
    };
  }

  refresh(event) {

    setTimeout(() => {
      console.log('Async operation has ended');
      event.complete();
    }, 200);
  }


ionViewDidLoad() {
  console.log('ionViewDidLoad UserPage');
}


onClickBtn(){

  this.file.nativeElement.click();
  console.log(this.file);

}




presentToast(msg) {
  let toast = this.toastCtrl.create({
    message: msg,
    duration: 2000
  });
  toast.present();
}


reset() {
  this.angularCropper.cropper.reset();
}


clear() {
  this.angularCropper.cropper.clear();
}

rotate() {
  this.angularCropper.cropper.rotate(90);
}

zoom(zoomIn: boolean) {
  let factor = zoomIn ? 0.1 : -0.1;
  this.angularCropper.cropper.zoom(factor);
}

scaleX() {
  this.scaleValX = this.scaleValX * -1;
  this.angularCropper.cropper.scaleX(this.scaleValX);
  
}

scaleY() {
  this.scaleValY = this.scaleValY * -1;
  this.angularCropper.cropper.scaleY(this.scaleValY);
}

move(x, y) {
  this.angularCropper.cropper.move(x, y);
}

save() {
  let croppedImgB64String: string = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg', (65 / 100));
  this.croppedImage = croppedImgB64String;
console.log(this.croppedImage.length);

let loading = this.loadingCtrl.create({
  spinner: 'circles',
  content: 'กรุณารอสักครู่...'
});

localStorage.setItem('review-food-photo-crop',this.croppedImage);
localStorage.setItem('review-food-photo-index',this.imgIndex);
this.navCtrl.pop();


}















}
