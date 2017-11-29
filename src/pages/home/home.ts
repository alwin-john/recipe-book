import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Platform } from 'ionic-angular';

import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { ListPage } from '../list/list';
import { DetailPage } from '../detail/detail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items: Array<any>;
  category: any[];
  toggleOn: boolean = true;
  shouldShowCancel: boolean = true;
  cancelButtonText: string = 'clear';
  constructor(public navCtrl: NavController, private fireBaseService: FirebaseServiceProvider, private platform: Platform) {
    fireBaseService.getResource('category').subscribe(res => {
      this.category = res;
      console.log(res);
    });
  }

  ionViewDidLoad() {
    this.fireBaseService.showAdBanner();
  }

  public itemTapped(name: string) {

    if (name != null || name != '') {
      this.navCtrl.push(ListPage, {
        param1: name
      });
    }

  }
  onDismiss() {
    this.toggleOn = false;
  }
  onInput($event) {
    console.log($event.target.value);
    this.items = [];
    this.fireBaseService.getRecipies($event.target.value, 'q').subscribe(res => {
      this.items = res.recipes;
      console.log(this.items);
    });
  }

  onCancel($event) {
    this.toggleOn = true;
  }

  public itemTappedDetails(name: string) {
    console.log(name);
    if (name != null || name != '') {
      this.navCtrl.push(DetailPage, {
        param1: name
      });
    }

  }

}
