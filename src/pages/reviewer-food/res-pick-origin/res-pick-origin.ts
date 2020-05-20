import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ApiServiceProvider } from '../../../providers/api-service/api-service';
/**
 * Generated class for the LongdoMapsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var longdo:any;
@IonicPage()
@Component({
  selector: 'page-res-pick-origin',
  templateUrl: 'res-pick-origin.html',
})
export class ResPickOriginPage {
  maps:any;
  @ViewChild('map') map:ElementRef;
  resposeData:any;
locationName:any="";
  username:any;
 latlong:any="";
 zoomLevel=17;
 searchText:any="";
 locationDetail:any="";
state:any="pick-location";
mode:any="";
  constructor(public navCtrl: NavController, public navParams: NavParams
    ,public authService: ApiServiceProvider
    ,public alerCtrl:AlertController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LongdoMapsPage');
  }

  ionViewWillEnter()
  {
    this.mode=this.navParams.get('mode');
    console.log("Enter LongdoMapsPage");
    setTimeout(()=>{
      this.initMap();
      this.getCurrentLocation();
       },500);
  
   
    if(localStorage.getItem("pin-origin"))
    {
  
    this.latlong=localStorage.getItem("pin-origin");
   let lat=this.latlong.split(",")[0];
   let long=this.latlong.split(",")[1];
   let latlon={lat:lat,lon:long}

   console.log("test loopss");
   console.log(lat);
   console.log(long);
  this.maps.location(latlon, true);
  let marker=new longdo.Marker(latlon,        
    {title: 'จุดรับ',
  icon: {
    url: './assets/icon/google-maps.svg',
   offset: { x: 18, y: 45 }
  }
});
this.maps.Overlays.add(marker);
this.geoCoding(latlon);
localStorage.removeItem("pin-origin");
 }
 else if(localStorage.getItem(this.mode+'-latlong'))
 {

   this.latlong=localStorage.getItem(this.mode+'-latlong');
   console.log(this.latlong);
   let lat=this.latlong.split(",")[0];
   let long=this.latlong.split(",")[1];
   let latlon={lat:lat,lon:long}

   console.log("test loop");
   console.log(lat);
   console.log(long);
  this.maps.location(latlon, true);
  let marker=new longdo.Marker(latlon,        
    {title: 'จุดรับ',
  icon: {
    url: './assets/icon/google-maps.svg',
   offset: { x: 18, y: 45 }
  }
});
this.maps.Overlays.add(marker);
 }
else{
      console.log(" this.getCurrentLocation();");
  this.getCurrentLocation();
    }


  
}

initMap()
{

  let mapEle = this.map.nativeElement;
  // localStorage.removeItem('map');
  this.maps = new longdo.Map({
   placeholder: mapEle,
   ui: longdo.UiComponent.Mobile,
   
 });


 

 this.maps.zoom( this.zoomLevel, true);
 this.maps.Layers.setBase(longdo.Layers.GRAY);
 this.maps.Layers.add(longdo.Layers.TRAFFIC);

 



 //map.Overlays.add(marker);
 //map.Overlays.add(marker2);


     
    // map.Ui.DPad.visible(false);
     this.maps.Ui.Zoombar.visible(false);
     this.maps.Ui.Geolocation.visible(false);
     //map.Ui.Toolbar.visible(false);
     this.maps.Ui.LayerSelector.visible(false);
     this.maps.Ui.Fullscreen.visible(false);
     this.maps.Ui.Crosshair.visible(false);
    // map.Ui.Scale.visible(false);
}

pinMap()
{
  let map =this.maps;
  map.Overlays.clear();
    var mouseLocation = map.location(longdo.LocationMode.Pointer);

    map.Overlays.add(new longdo.Marker(mouseLocation,
      {
        title: 'Taxi',
        icon: {
 
   //    html: '<b><img src="./assets/icon/taxi-green.svg" style="width:100px"/></b>',
         // url: './assets/icon/taxi-green.svg',
         url: './assets/icon/google-maps.svg',
         offset: { x: 18, y: 45 }
        },
        popup: {
          //html: element.info
        },
        weight: longdo.OverlayWeight.Top,
       // detail: 'Drag me',
        draggable: false,
      }));
 console.log(mouseLocation);
 this.latlong=mouseLocation.lat+','+mouseLocation.lon;
 console.log(this.latlong);
 this.geoCoding(mouseLocation);
}

geoCoding(latlong)
{

  let lat=latlong.lat;
  let long=latlong.lon;
 // console.log(lat);
  //console.log(long);
  this.authService.getAddress(lat,long).then((result) =>{
    this.resposeData = result; // กำหนดข้อมูลล็อกอินให้กับ resposeData

  /*  country: "ประเทศไทย"

    district: "เขตจตุจักร"
    
    elevation: 2
    
    geocode: "103001"
    
    postcode: "10900"
    
    province: "กรุงเทพมหานคร"
    
    road: "พหลโยธิน 37"
    
    subdistrict: "แขวงลาดยาว"*/
    if(!this.resposeData.aoi)
    {
      this.resposeData.aoi="";
    }
    if(!this.resposeData.road)
    {
      this.resposeData.road="";
    }
   this.locationName=this.resposeData.aoi+this.resposeData.subdistrict+this.resposeData.road;
    console.log(result);
    }, (err) => {

    });
}

zoomIn()
{
this.zoomLevel+=1;
this.maps.zoom( this.zoomLevel, true);
}

zoomOut()
{
  this.zoomLevel-=1;
this.maps.zoom( this.zoomLevel, true);
}

searchLocation()
{
  if(this.searchText.length>3)
  {
    this.navCtrl.push("SearchLocationPage",{search_text:this.searchText});
  }
  else
  {
    let alert = this.alerCtrl.create({
      title: 'พิมพ์ 3 ตัวอักษรขึ้นไปเพื่อค้นหา',
      message: '',
      buttons: ['Ok']
    });
    alert.present()
  }

}

saveLatLong()
{
  if(this.latlong)
  {
    localStorage.setItem('res-latlong',this.latlong);
    localStorage.setItem('res-address',this.locationName);
        this.navCtrl.pop();
  }
  else
  {
    let alert = this.alerCtrl.create({
      title: 'กรุณาเลือกจุดบนแผนที่',
      message: '',
      buttons: ['Ok']
    });
    alert.present();
  }
}


getCurrentLocation()
  {


    this.getGpsCurrentLocation().then((resolve)=>{
      let map =this.maps;
      map.Overlays.clear();
      this.latlong=resolve;
      console.log("test loop latlong");
      console.log(this.latlong);
    let lat=this.latlong.split(",")[0];
    let long=this.latlong.split(",")[1];
    let latlon={lat:lat,lon:long}
 

   this.maps.location(latlon, true);
   let marker=new longdo.Marker(latlon,        
     {title: 'จุดรับ',
   icon: {
     url: './assets/icon/google-maps.svg',
    offset: { x: 18, y: 45 }
   }
 });
 this.maps.Overlays.add(marker);
 this.geoCoding(latlon);
  console.log(resolve);
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
    
  
  }