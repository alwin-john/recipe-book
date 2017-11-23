import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Platform } from 'ionic-angular';

import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { ListPage } from '../list/list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  category: any[];

  constructor(public navCtrl: NavController, private fireBaseService: FirebaseServiceProvider,private platform:Platform) {
    // fireBaseService.getResource('category').subscribe(res => {
    //   this.category = res;
    //   console.log(res);
    // });
    if (this.platform.is('cordova')) {
      fireBaseService.getRecipe('veg').then(res=>{
        console.log(res);
      });
    } else {

    }
  }

  ionViewDidLoad(){
    this.fireBaseService.showAdBanner();
  }

  public itemTapped(name: string) {

    if (name != null || name != '') {
      this.navCtrl.push(ListPage, {
        param1: name
      });
    }
    
  }

}
