import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
/**
 * Generated class for the LongdoMapsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var longdo:any;
@IonicPage()
@Component({
  selector: 'page-longdo-maps',
  templateUrl: 'longdo-maps.html',
})
export class LongdoMapsPage {
  maps:any;
  @ViewChild('map') map:ElementRef;
  resposeData:any;
locationName:any="";
  username:any;
 latlong:any="";

  constructor(public navCtrl: NavController, public navParams: NavParams
    ,public authService: ApiServiceProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LongdoMapsPage');
  }

  ionViewWillEnter()
  {
    this.initMap();
  
}

initMap()
{
  let mapEle = this.map.nativeElement;
  // localStorage.removeItem('map');
  this.maps = new longdo.Map({
   placeholder: mapEle,
   ui: longdo.UiComponent.Mobile,
   
 });

 this.maps.zoom(17, true);
 this.maps.Layers.setBase(longdo.Layers.GRAY);
 this.maps.Layers.add(longdo.Layers.TRAFFIC);

 



 //map.Overlays.add(marker);
 //map.Overlays.add(marker2);


     
    // map.Ui.DPad.visible(false);
     //map.Ui.Zoombar.visible(false);
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
    var mouseLocation = map.location(longdo.LocationMode.Pointer);
    map.Overlays.clear();
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
 this.geoCoding(mouseLocation);
}

geoCoding(latlong)
{

  let lat=latlong.lat;
  let long=latlong.lon;
  console.log(lat);
  console.log(long);
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
   this.locationName=this.resposeData.aoi+this.resposeData.subdistrict+this.resposeData.road;
    console.log(result);
    }, (err) => {

    });
}
    
  
  }