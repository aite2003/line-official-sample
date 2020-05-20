import { Component,ViewChild } from '@angular/core';
import { Platform ,Nav} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { StartPage } from '../pages/start/start';

declare var liff:any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nv: Nav;
  rootPage:any="FoodMapsPage";
  pages:any=[];
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen
    ) {
    platform.ready().then(() => {

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.pages = [
        { title: 'โปรไฟล์', component: "ProfilePage",icon:"md-person" },
        { title: 'ร้านอาหารใกล้คุณ', component: "FoodMapsPage",icon:"ios-pin-outline" },
        { title: 'ร้านทั้งหมด', component: "FoodAllPage",icon:"md-search" },
        { title: 'ทำอะไรกินดี', component: "FoodAllPage",icon:"ios-restaurant" },
        { title: 'รีวิวร้านอาหาร', component: "ReviewerFoodPage" ,icon:"md-chatbubbles"},
        { title: 'วงล้อสุ่มกินอะไรดี', component: "RandomFoodPage",icon:"ios-create-outline" }
      ];

      

    

      liff.init({ liffId: "1654188626-Q41vldk8" }, () => {
        if (liff.isLoggedIn()) {
      this.runApp();
        } else {
        // liff.login();
        }
      }, err => console.error(err.code,err));
  
  
  
    
  






    });
    
    
  }

  runApp() {
    liff.getProfile().then(profile => {
       console.log(profile.pictureUrl);
       console.log(profile.userId);
       console.log(profile.displayName);
       console.log(profile.statusMessage);
       console.log(profile.email);
 
       (localStorage.setItem('line-param',JSON.stringify({"id":profile.userId,"name":profile.displayName,"picture":profile.pictureUrl})))
   

     }).catch(err => console.error(err));
 
   }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nv.setRoot(page.component);
  }
  


  screenWidth()
  {
    
    //console.log(window.innerWidth);
    if(window.innerWidth>500)
    {
      return {"width":"50%",left:"25%"};

    }
    else
    {
      return {"width":"100%"};
    }

  }
}
