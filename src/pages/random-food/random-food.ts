import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform, AlertController } from 'ionic-angular';

/**
 * Generated class for the RandomFoodPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-random-food',
  templateUrl: 'random-food.html',
})
export class RandomFoodPage {
  state:any="init";
  screenWidth:any;
  selectType=[];
  foodType:any=[{name:"ชาบู",index:0},
                {name:"ร้านตามสั่ง",index:1},
                {name:"ก๋วยเตี๋ยว",index:2},
                {name:"สุกี้",index:3},
                {name:"สเต๊ก",index:4},
                {name:"ไก่ทอด",index:5},
                {name:"อาหารญี่ปุ่น",index:6},
                {name:"อาหารเกาหลี",index:7},
                {name:"อาหารเวียดนาม",index:8},
                {name:"อาหารจีน",index:9},
                {name:"สลัด",index:10},
                {name:"หมูกระทะ",index:11},
                {name:"พิซซ่า",index:12},
                {name:"อาหารใต้",index:13},
                {name:"อาหารเหนือ",index:14},
                {name:"อาหารอีสาน",index:15}

];

selectMenu=[];
foodMenu:any=[{name:"หมูทอด",index:0},
{name:"ต้มยำ",index:1},
{name:"แกงส้ม",index:2},
{name:"ข้าวผัด",index:3},
{name:"ผัดไท",index:4},
{name:"สุกี้",index:5},
{name:"กะเพรา",index:6},
{name:"หมูทอด",index:7},
{name:"มักกะโรนี",index:8},
{name:"สปาเกตตี้",index:9},
{name:"แกงจืด",index:10},
{name:"ขนมจีน",index:11},
{name:"ส้มตำ",index:12},
{name:"ปลาทอด",index:13},
{name:"ไก่ทอด",index:14},
{name:"ผัดเผ็ด",index:15},
{name:"ลาบ",index:16},
{name:"น้ำตก",index:17},
{name:"ไข่เจียว",index:18},
{name:"ไก่ย่าง",index:19},
{name:"พริกแกง",index:20}
];
  constructor(public navCtrl: NavController, public navParams: NavParams,public platform:Platform
   , public alerCtrl:AlertController) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RandomFoodPage');
  }
  ionViewWillEnter()
  {
    this.screenWidth=this.platform.width();
    //console.log(this.screenWidth);
  }

  checkTypeSelect()
  {
    if(this.selectType.length>8)
    {
      let alert = this.alerCtrl.create({
        title: 'ท่านเลือกเกิน 8 ข้อ',
        message: 'วงล้อจะแสดงได้แค่ 8ข้อ',
        buttons: ['ตกลง']
      });
      alert.present()
    }
    else if(this.selectType.length<8)
    {
      let alert = this.alerCtrl.create({
        title: 'กรุณาเลือกให้ครบ 8 ข้อ',
        message: '',
        buttons: ['ตกลง']
      });
      alert.present()
    }
  
  }

  randomType()
  {
    this.selectType=[];
    let number=[];
    this.foodType.forEach(item => {
      number.push(item.index)    ;  
    });
    number.forEach((item,i)=> {
      let j = Math.floor(Math.random() * (i+1));
      this.selectType.push(number[j]);
      number.splice(j,1)
    }
      )
      

    console.log(number);
    console.log(this.selectType);
   // this.selectType=[0,1,2,3,4,5,6,7];
  }



  checkMenuSelect()
  {
    if(this.selectType.length>8)
    {
      let alert = this.alerCtrl.create({
        title: 'ท่านเลือกเกิน 8 ข้อ',
        message: 'วงล้อจะแสดงได้แค่ 8ข้อ',
        buttons: ['ตกลง']
      });
      alert.present()
    }
    else if(this.selectMenu.length<8)
    {
      let alert = this.alerCtrl.create({
        title: 'กรุณาเลือกให้ครบ 8 ข้อ',
        message: '',
        buttons: ['ตกลง']
      });
      alert.present()
    }
  
  }

  randomMenu()
  {
    this.selectMenu=[];
    let number=[];
    this.foodMenu.forEach(item => {
      number.push(item.index)    ;  
    });
    number.forEach((item,i)=> {
      let j = Math.floor(Math.random() * (i+1));
      this.selectMenu.push(number[j]);
      number.splice(j,1)
    }
      )

   // this.selectType=[0,1,2,3,4,5,6,7];
  }

   randomSpin(){


    var x = 1024; //min value
    var y = 9999; // max value
  
    var deg = Math.floor(Math.random() * (x - y)) + y;
  
    document.getElementById('box').style.transform = "rotate("+deg+"deg)";
  
    var element = document.getElementById('mainbox');
    element.classList.remove('animate');
    setTimeout(function(){
      element.classList.add('animate');
    }, 5000); //5000 = 5 second
  }

  wheelWide()
  {
    let scale=this.screenWidth/533;
    let left= (1-scale)*200*(-1);
    if(scale>1)
    {
      scale=1;
      left=0;
    }
 
    return {'transform': 'scale('+scale+')','left':left+'px'};
  }

  selectTypeFunc(state)
  {
    this.state=state;
  }

}
