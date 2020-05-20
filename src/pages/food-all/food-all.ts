import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, ActionSheetController, PopoverController, ViewController, LoadingController } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { GalleryModal } from 'ionic-gallery-modal';
/**
 * Generated class for the LongdoMapsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var longdo:any;
@IonicPage()
@Component({
  selector: 'page-food-all',
  templateUrl: 'food-all.html',
})
export class FoodAllPage {

  lat:any;
  long:any;
  latLng:any="";
  test:any;
  maps:any="";
  store_id:any;
  get_data:any;
  get_data_dummie:any;
  get_store_data:any;
  role:any;
  store_group:any;
  mode:any="maps";
  username:any;
  cus_location:any;
  searchInput:any;
  url="https://taxi-delivery.com/api-foodmee/";


  input:any={lat:"",lng:"",tel:""};
  myMarker:any;
  storePos:any;
  storePosInfo:any=[];
  storePosMarker:any=[];
  storePosCenter:any;
  resMartker:any=[];
  resInfo:any=[];
  resPos:any=[];
  resposeData:any;
  hide_loading=false;
  page:any= [];
page_count = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,public alerCtrl:AlertController
    ,public authService: ApiServiceProvider
    ,private modalCtrl: ModalController
    ,private actionSheetCtrl:ActionSheetController
    ,private popOverCtrl:PopoverController
    ,private loadingCtrl:LoadingController) {



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LongdoMapsPage');
    this.page= [];
    this.page_count = 0;
    setTimeout(()=>{
      this.resList();
      this.getCurrentLocation();
       },500);
  }

  ionViewWillEnter()
  {

  }



  resList()
   {

    let loading = this.loadingCtrl.create({
      spinner: 'circles',
      content: 'กำลังค้นหา...',
     // cssClass: 'my-loading-class'
    });

    loading.present();

      let postDat={};
      console.log(postDat);
      this.authService.postData(postDat,'getResAll').then((result) => {
         this.resposeData=result;
         this.get_data=this.resposeData.resDat;
         console.log();
    
        
         this.get_data.forEach((item)=>{

          if(item.cover_photo1)
          item.cover_photo1=this.url+item.cover_photo1;
          if(item.cover_photo2)
          item.cover_photo2=this.url+item.cover_photo2;
          if(item.cover_photo3)
          item.cover_photo3=this.url+item.cover_photo3;
          if(item.cover_photo4)
          item.cover_photo4=this.url+item.cover_photo4;
          if(item.cover_photo5)
          item.cover_photo5=this.url+item.cover_photo5;
          if(!item.review_amount)
          item.review_amount=0;
        
         });
         this.get_data=this.shuffle(this.get_data);
     //  this.shuffle(this.get_data);


        for (let i = 1; i < 10; i++) {
          if(this.page_count<this.get_data.length){
          this.page.push(this.get_data[this.page_count])
         // this.wpDataSet.push( this.wpDataSet.length );
          }
         this.page_count++;
         
        }
        console.log(this.page);
        loading.dismiss();

       }, (err) => {
 

        loading.dismiss();
 
      }).catch((error) => {
        console.log('Error getting location', error);
        loading.dismiss();
      });
   }



getCurrentLocation()
{


  this.getGpsCurrentLocation().then((resolve)=>{


this.resList();
console.log(resolve);
  }).catch(()=>{

    let map =this.maps;
  //  map.Overlays.clear();
    console.log("test loop latlong");
    console.log(this.cus_location);
  let latlon={lat:this.cus_location.split(",")[0],lon:this.cus_location.split(",")[1]}
  let marker=new longdo.Marker(latlon,        
    {title: 'จุดรับ',
  icon: {
    url: './assets/icon/google-maps.svg',
   offset: { x: 18, y: 45 }
  }
});
this.maps.Overlays.add(marker);
this.maps.location(latlon, true);

this.resList();
  });

}

getGpsCurrentLocation()
{
  return new Promise((resolve)=>{

    getLocation();

    function getLocation() {

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
  
        resolve("0"+","+"0");
      }
    }
    
    function showPosition(position) {
      
      console.log(position.coords.latitude+","+position.coords.longitude);
      resolve(position.coords.latitude+","+position.coords.longitude);

    }

  });

}

call(number)
{
  let tel=number;
 // console.log(tel[1]);
  window.open('tel:'+tel);

  this.get_data.forEach(element => {

    if(element.tel==number)
    {
      element.is_tel=true;
    }


    
  });

}

 openModal(dat,index) {
   console.log(dat);
   console.log(index);
   let photos=[];

   for (let i = 0; i < 5; i++) {
     photos=[{url:dat.cover_photo1},
      {url:dat.cover_photo2},
      {url:dat.cover_photo3},
      {url:dat.cover_photo4},
      {url:dat.cover_photo5},
      ]
   }

   console.log(photos);




  let modal = this.modalCtrl.create(GalleryModal, {
    photos: photos,
    initialSlide: index, // The second image
  });
  modal.present();

}


like(index,id)
{
if(this.get_data[index].isLiked)
{
  this.get_data[index].isLiked=false;
}
else
{
  this.get_data[index].isLiked=true;
}

}

presentPostActionSheet() {
  let actionSheet = this.actionSheetCtrl.create({
    buttons: [
      {
        text: 'Save post',
        handler: () => { }
      },
      {
        text: 'Hide post',
        handler: () => { }
      },
      {
        text: 'Give feedback on this post',
        handler: () => { }
      },
      {
        text: 'Unfollow',
        handler: () => { }
      },
      {
        text: 'Turn on notifications for this post',
        handler: () => { }
      },
      {
        text: 'Copy link',
        handler: () => { }
      },
    ]
  });




 actionSheet.present();
}

presentPopover(myEvent,tel,latlong) {
  let popover = this.popOverCtrl.create("FoodmapsOptionPage",{latlong:latlong,tel:tel});
  popover.present({
    ev: myEvent
  });
}

gotoUserReview(res_id) {
  this.navCtrl.push("ResUserReviewPage",{res_id:res_id});
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

doRefresh(event) {

 // this.resList();
 this.get_data=this.shuffle(this.get_data);
 this.page=[];
 this.page_count=0;
 for (let i = 1; i < 10; i++) {
  if(this.page_count<this.get_data.length){
  this.page.push(this.get_data[this.page_count])
 // this.wpDataSet.push( this.wpDataSet.length );
  }
 this.page_count++;

  setTimeout(() => {
    console.log('Async operation has ended');
    event.complete();
  }, 200);
}
}

shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  console.log(currentIndex);
console.log(array);
  return array;
}

search()
{
  console.log(this.searchInput);
  let loading = this.loadingCtrl.create({
    spinner: 'circles',
    content: 'กำลังค้นหา...',
   // cssClass: 'my-loading-class'
  });

  loading.present();

    let postDat={res_name:this.searchInput};
    console.log(postDat);
    this.authService.postData(postDat,'getResByName').then((result) => {
       this.resposeData=result;
       this.get_data=this.resposeData.resDetail;
       console.log();
  
      
       this.get_data.forEach((item)=>{

        if(item.cover_photo1)
        item.cover_photo1=this.url+item.cover_photo1;
        if(item.cover_photo2)
        item.cover_photo2=this.url+item.cover_photo2;
        if(item.cover_photo3)
        item.cover_photo3=this.url+item.cover_photo3;
        if(item.cover_photo4)
        item.cover_photo4=this.url+item.cover_photo4;
        if(item.cover_photo5)
        item.cover_photo5=this.url+item.cover_photo5;
        if(!item.review_amount)
        item.review_amount=0;
      
       });
       this.get_data=this.shuffle(this.get_data);
   //  this.shuffle(this.get_data);
   this.page_count=0;
   this.page=[];
      for (let i = 1; i < 10; i++) {
        if(this.page_count<this.get_data.length){
        this.page.push(this.get_data[this.page_count])
       // this.wpDataSet.push( this.wpDataSet.length );
        }
       this.page_count++;
       
      }
      console.log(this.page);
      loading.dismiss();

     }, (err) => {


      loading.dismiss();

    }).catch((error) => {
      console.log('Error getting location', error);
      loading.dismiss();
    });
}

  

}

