//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//import ไฟล์ดังนี้
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

//ที่อยู่ API
//let apiUrl = "http://localhost:8080/api/api-test/";
//let apiUrl = "http://mnt-cs.drayddns.com:1025/mtapp/api/smartdriver/";
//let apiUrl = "http://mnt-cs.drayddns.com:1025/api-taxideliver/";
let apiUrl="https://www.taxi-delivery.com/api-foodmee/";
let apiUrlMaps="https://www.taxi-delivery.com/api-maps/";
let apiUrlZcom = "http://scanme.in.th/api-gpstest/";
let gateWay1 = "https://scanme.in.th/smartdriver/api/Gateway1";
let gateWay2 = "https://scanme.in.th/smartdriver/api/Gateway2";
let apiUrlNode = "http://mnt-cs.drayddns.com:3000/myApi/";


/*
  Generated class for the ApiServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiServiceProvider {

 // constructor(public http: HttpClient) {
  constructor(public http: Http) {
    console.log('Hello ApiServiceProvider Provider');
  }

   //สำหรับส่งข้อมูล

   postDataMaps(credentials, type){

    return new Promise((resolve, reject) =>{
      let headers = new Headers();
      this.http.post(apiUrlMaps+type, JSON.stringify(credentials), {headers: headers}).
      subscribe(res =>{
        resolve(res.json());
      }, (err) =>{
        reject(err);
      });

    });

  }

  postData(credentials, type){

    return new Promise((resolve, reject) =>{
      let headers = new Headers();
      this.http.post(apiUrl+type, JSON.stringify(credentials), {headers: headers}).
      subscribe(res =>{
        resolve(res.json());
      }, (err) =>{
        reject(err);
      });

    });

  }


  getAddress(lat, long){

    return new Promise((resolve, reject) =>{
      let headers = new Headers();
      //"https://api.longdo.com/map/services/address?key=2e25868432c29c7d0faac08b3fa95934&lon=100.53726&lat=13.72427"
      this.http.get("https://api.longdo.com/map/services/address?key=2e25868432c29c7d0faac08b3fa95934&lon="+long+"&lat="+lat,"").
      subscribe(res =>{
        resolve(res.json());
      }, (err) =>{
        reject(err);
      });

    });

  }
  postDataZcom(credentials, type){

    return new Promise((resolve, reject) =>{
      let headers = new Headers();
      this.http.post(apiUrlZcom+type, JSON.stringify(credentials), {headers: headers}).
      subscribe(res =>{
        resolve(res.json());
      }, (err) =>{
        reject(err);
      });

    });

  }
    postDataNode(credentials, type){

    return new Promise((resolve, reject) =>{
      let headers = new Headers();

      
      this.http.post(apiUrlNode+type,credentials, {headers: headers}).
      subscribe(res =>{
        resolve(res.json());
      }, (err) =>{
        reject(err);
      });

    });



  }
  

  // สิ้นสุด

  /*
  postData(credentials, type){

    return new Promise((resolve, reject) =>{
      let headers = new Headers();
      let postDat=JSON.stringify({"type":type,"body":credentials});
      this.http.post(gateWay1, postDat, {headers: headers}).
      subscribe(res =>{
        resolve(res.json());
      }, (err) =>{
        reject(err);
      });

    });

  }

  postDataNode(credentials, type){

    return new Promise((resolve, reject) =>{
      let headers = new Headers();

      let postDat=JSON.stringify({"type":type,"body":credentials});
      this.http.post(gateWay2,postDat, {headers: headers}).
      subscribe(res =>{
        resolve(res.json());
      }, (err) =>{
        reject(err);
      });

    });



  }
*/
}
