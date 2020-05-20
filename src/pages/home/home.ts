import { Component ,ViewChild,NgZone} from '@angular/core';
import { NavController ,Slides} from 'ionic-angular';
import { Content } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Content) content: Content;
 @ViewChild('SwipedTabsSlider') SwipedTabsSlider: Slides ;

  SwipedTabsIndicator :any= null;
  tabs:any=[];
  headerShow:any;

 
  constructor(public navCtrl: NavController,public zone: NgZone) {
  	this.tabs=["Devices","Rooms"];
  }
  ionViewDidEnter() {
    this.SwipedTabsIndicator = document.getElementById("indicator-home");

  }


  calculateDistance2(lat1, long1, lat2, long2)
  {    

      //radians
      lat1 = (lat1 * 2.0 * Math.PI) / 60.0 / 360.0;      
      long1 = (long1 * 2.0 * Math.PI) / 60.0 / 360.0;    
      lat2 = (lat2 * 2.0 * Math.PI) / 60.0 / 360.0;   
      long2 = (long2 * 2.0 * Math.PI) / 60.0 / 360.0;       


      // use to different earth axis length    
      var a = 6378137.0;        // Earth Major Axis (WGS84)    
      var b = 6356752.3142;     // Minor Axis    
      var f = (a-b) / a;        // "Flattening"    
      var e = 2.0*f - f*f;      // "Eccentricity"      

      var beta = (a / Math.sqrt( 1.0 - e * Math.sin( lat1 ) * Math.sin( lat1 )));    
      var cos = Math.cos( lat1 );    
      var x = beta * cos * Math.cos( long1 );    
      var y = beta * cos * Math.sin( long1 );    
      var z = beta * ( 1 - e ) * Math.sin( lat1 );      

      beta = ( a / Math.sqrt( 1.0 -  e * Math.sin( lat2 ) * Math.sin( lat2 )));    
      cos = Math.cos( lat2 );   
      x -= (beta * cos * Math.cos( long2 ));    
      y -= (beta * cos * Math.sin( long2 ));    
      z -= (beta * (1 - e) * Math.sin( lat2 ));       

      return (Math.sqrt( (x*x) + (y*y) + (z*z) )/10)/1.7;  
    }

    calculateDistance(lat1, lon1, lat2, lon2)
    {    
      var R = 6391; // Radius of the earth in km
      var dLat = deg2rad(lat2-lat1);  // deg2rad below
      var dLon = deg2rad(lon2-lon1); 
      var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ; 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c; // Distance in km
      return d;
    
    
    function deg2rad(deg) {
      return deg * (Math.PI/180)
    }
      }


  ionViewWillEnter()
  {
    let distance1=this.calculateDistance( 13.745898, 100.520337,13.746336, 100.518213);
    console.log("google cal: 0.240 ,distance1 cal : "+distance1);

    let distance2=this.calculateDistance(13.751054, 100.511056,13.749569, 100.515390);
    console.log("google cal: 0.500 ,distance2 : "+distance2);

    let distance3=this.calculateDistance( 13.771133, 100.505056,13.759087, 100.531706);
    console.log("google cal: 3.400 ,distance3 : "+distance3);

    let distance4=this.calculateDistance( 13.799101, 100.394031,13.715732, 100.395404);
    console.log("google cal: 10.900,distance4 : "+distance4);

    let distance5=this.calculateDistance( 12.373798, 99.886557,12.260426, 99.868705);
    console.log("google cal: 12.800 ,distance5 : "+distance5);
  }

  isScrolling(event)
  {
    //console.log(this.content.scrollTop);
    if(event.scrollTop>100)
    {

      console.log(event.scrollTop);
      console.log(this.content);
      console.log(this.headerShow);
      this.zone.run(()=>{
        this.headerShow=true;
      })
    }
    else
    {
      this.zone.run(()=>{
        this.headerShow=false;
      })
      console.log(this.headerShow);
      console.log(event.scrollTop);
    }


  }


  selectTab(index) {    
    this.SwipedTabsIndicator.style.webkitTransform = 'translate3d('+(100*index)+'%,0,0)';
    this.SwipedTabsSlider.slideTo(index, 500);
  }

  updateIndicatorPosition() {
      // this condition is to avoid passing to incorrect index
      //console.log(this.SwipedTabsSlider);
  	if( this.SwipedTabsSlider.length()> this.SwipedTabsSlider.getActiveIndex())
  	{
  		this.SwipedTabsIndicator.style.webkitTransform = 'translate3d('+(this.SwipedTabsSlider.getActiveIndex() * 100)+'%,0,0)';
  	}
    
    }

  animateIndicator($event) {
    console.log($event)
  	if(this.SwipedTabsIndicator)
   	    this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' + (($event.progress* (this.SwipedTabsSlider.length()-1))*100) + '%,0,0)';
  }

 

}
