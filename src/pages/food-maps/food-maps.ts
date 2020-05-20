import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, ActionSheetController, PopoverController, ViewController, LoadingController, App } from 'ionic-angular';
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
  selector: 'page-food-maps',
  templateUrl: 'food-maps.html',
})
export class FoodMapsPage {
  @ViewChild('map') map:ElementRef;
  lat:any;
  long:any;
  latLng:any="";
  test:any;
  maps:any="";
  store_id:any;
  get_data:any;
  get_store_data:any;
  role:any;
  store_group:any;
  mode:any="maps";
  username:any;
  cus_location:any;
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
    ,private loadingCtrl:LoadingController
    ,public appCtrl: App
    ,public viewCtrl: ViewController) {



  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad LongdoMapsPage');
    this.page= [];
    this.page_count = 0;

    setTimeout(()=>{
      this.initMaps();
      this.getCurrentLocation();
       },500);
  }

  ionViewWillEnter()
  {

  }

  reInitMaps()
  {
    setTimeout(()=>{
      this.initMaps();
      this.getCurrentLocation();
       },500);

  }
  reInitLocation()
  {
    setTimeout(()=>{
      this.initMaps();
      this.getCurrentLocation();
       },500);

       let alert = this.alerCtrl.create({
        title: 'กดอนุญาติให้อ่านค่า GPS',
        message: 'เพื่อค้นหาพิกัดของท่าน',
        buttons: ['Ok']
      });
      alert.present()

  }
  initMaps()
  {
    let mapEle = this.map.nativeElement;
   // localStorage.removeItem('map');

    this.maps = new longdo.Map({
      placeholder: mapEle,
      ui: longdo.UiComponent.Full
    });


  //console.log(this.maps);



    //this.maps.Ui.DPad.visible(false);
     //this.maps.Ui.Zoombar.visible(false);
     this.maps.Ui.Geolocation.visible(false);
     this.maps.Ui.Toolbar.visible(false);
      this.maps.zoom( 15, true);
 
      this.maps.Ui.LayerSelector.visible(false);
      this.maps.Ui.Fullscreen.visible(false);
      this.maps.Ui.Crosshair.visible(false);
      this.maps
     // map.Ui.Scale.visible(false);

     var popup1 = new longdo.Popup(
      {
        title: 'Popup',
        detail: 'Simple popup'
      });
      this.maps.Overlays.add(popup1);
    
      /* For test only */
      this.cus_location= "13.817522, 100.495783";
      let latlon={lat:this.cus_location.split(",")[0],lon:this.cus_location.split(",")[1]}
      let marker=new longdo.Marker(latlon,        
        {title: 'คุณอยู่นี่',
      icon: {
        url: './assets/icon/google-maps.svg',
       offset: { x: 18, y: 45 }
      }
    });
    this.maps.Overlays.add(marker);
    this.maps.location(latlon, true);
        /* End For test only */
      this.resList();

  }

  resList()
   {
     let lat=this.cus_location.split(",")[0];
     let long=this.cus_location.split(",")[1];
      let postDat={lat:lat,long:long,radius:"0.1"};
      //console.log(postDat);
      let loading = this.loadingCtrl.create({
        spinner: 'circles',
        content: 'กำลังค้นหา...',
       // cssClass: 'my-loading-class'
      });
      
      loading.present();
      this.authService.postData(postDat,'getResNearMe').then((result) => {
         this.resposeData=result;
         this.get_data=this.resposeData.resDat;
       //  console.log(this.get_data);
         this.get_data.forEach((item)=>{

          if(item.cover_photo1)
          {
            item.photo=this.url+item.cover_photo1;
            this.resPos.push({lat:parseFloat(item.res_lat), lon:parseFloat(item.res_long),  
               info:'<ion-grid><ion-row><ion-col> <img style="width:80px" src="'+item.photo+'"></ion-col><ion-col><b>'+item.res_name+'</b> </ion-col></ion-row><ion-row>'+item.google_address+'<button style="background-color:rgb(189, 3, 80);color:white;padding:10px;border-radius:10px">'+item.res_tel+'</button></ion-row></ion-grid>',
            title:item.res_name, 
           detail:item.res_tel,
           status:item.google_address})
  
          }
          else
          {
            item.photo="./assets/imgs/nophoto.png";
            this.resPos.push({lat:parseFloat(item.res_lat), lon:parseFloat(item.res_long), 
            info:'<ion-grid><ion-row><ion-col> <img style="width:80px" src="'+item.photo+'"></ion-col><ion-col><b>'+item.res_name+'</b> </ion-col></ion-row><ion-row>'+item.google_address+'<button style="background-color:rgb(189, 3, 80);color:white;padding:10px;border-radius:10px">'+item.res_tel+'</button></ion-row></ion-grid>',
  
          title:item.res_name, 
            detail:item.res_tel,
            status:item.google_address}) 
          }
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

       item.distance=this.calculateDistance(this.cus_location.split(",")[0],this.cus_location.split(",")[1],item.res_lat,item.res_long);
        
         });

     //   console.log(this.get_data);
         this.get_data=this.get_data.sort((a,b)=>{
          return a.distance-b.distance;
        });

        for (let i = 1; i < 10; i++) {
          if(this.page_count<this.get_data.length){
          this.page.push(this.get_data[this.page_count])
         // this.wpDataSet.push( this.wpDataSet.length );
          }
         this.page_count++;
         
        }

         let marker=[];
         this.resPos.forEach(element => {
           

          marker.push(new longdo.Marker({  lat:element.lat,lon:element.lon},
            {
              title: element.title,
              detail:element.detail,
              icon: {
 
               url: './assets/icon/foodmee-pingreen.svg'
              },
              popup: {
                size: { width: 200},
              detail:element.info
              },
              weight: longdo.OverlayWeight.Top,
              draggable: false,
            }));

         });

    marker.forEach(item=>{
      this.maps.Overlays.add(item);
    })
       

     //    console.log(this.resPos);
         loading.dismiss();

       }, (err) => {
 
        loading.dismiss();

 
      }).catch((error) => {
      //  console.log('Error getting location', error);
      });
   }

   calculateDistance(lat1, long1, lat2, long2) {
    let p = 0.017453292519943295;
    let c = Math.cos;
    let a = 0.5 - c((lat1 - lat2) * p) / 2
      + c(lat2 * p) * c((lat1) * p) * (1 - c(((long1 - long2) * p))) / 2;
    let dis = (12742 * Math.asin(Math.sqrt(a)));
    return dis;
  }


getCurrentLocation()
{


  this.getGpsCurrentLocation().then((resolve)=>{
    let map =this.maps;
    map.Overlays.clear();
    this.cus_location=resolve;
    //console.log("test loop latlong");
   // console.log(this.cus_location);
  let latlon={lat:this.cus_location.split(",")[0],lon:this.cus_location.split(",")[1]}
  let marker=new longdo.Marker(latlon,        
    {title: 'คุณอยู่นี่',
  icon: {
    url: './assets/icon/google-maps.svg',
   offset: { x: 18, y: 45 }
  }
});
this.maps.Overlays.add(marker);
this.maps.location(latlon, true);

this.resList();
//console.log(resolve);
  }).catch(()=>{

    let map =this.maps;
  //  map.Overlays.clear();
   // console.log("test loop latlong");
   // console.log(this.cus_location);
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
      
     // console.log(position.coords.latitude+","+position.coords.longitude);
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
  // console.log(dat);
  // console.log(index);
   let photos=[];

   for (let i = 0; i < 5; i++) {
     photos=[{url:dat.cover_photo1},
      {url:dat.cover_photo2},
      {url:dat.cover_photo3},
      {url:dat.cover_photo4},
      {url:dat.cover_photo5},
      ]
   }

 //  console.log(photos);




  let modal = this.modalCtrl.create(GalleryModal, {
    photos: photos,
    initialSlide: index, // The second image
  });
  modal.present();

}


like(index,id)
{
 // console.log(this.page[index].isLiked);
if(this.page[index].isLiked)
{
  this.page[index].isLiked=false;
  
}
else
{
  this.page[index].isLiked=true;
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


gotoUserReview(res_id,res_name,img) {

  this.navCtrl.push("ResUserReviewPage",{res_id:res_id,res_name:res_name,img:img},{ animate: true, animation: 'md-transition',direction:'forward' ,duration: 300 });

}
/*s
gotoUserReview(res_id,res_name) {
  let userReview = this.modalCtrl.create("ResUserReviewPage",{res_id:res_id,res_name:res_name},{showBackdrop:false,enableBackdropDismiss:false,cssClass:'modalCss'});
  userReview.present();
}
*/

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

ionViewWillLeave()
{
  console.log("viewWillLeave")
}

  
  

}

