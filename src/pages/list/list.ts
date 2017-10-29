import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { DetailPage } from '../detail/detail';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  items: Array<any>;
  //items:any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private fireBaseService: FirebaseServiceProvider) {

    this.items = [];

    // If we navigated to this page, we will have an item available as a nav param

    this.selectedItem = navParams.get('param1');
    fireBaseService.getResource(this.selectedItem).subscribe(res => {
      this.items = res;
      console.log(this.items);
    });

    // // Let's populate this page with some filler content for funzies
    // this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    // 'american-football', 'boat', 'bluetooth', 'build'];

    // this.items = [];
    // for (let i = 1; i < 11; i++) {
    //   this.items.push({
    //     title: 'Item ' + i,
    //     note: 'This is item #' + i,
    //     icon: this.icons[Math.floor(Math.random() * this.icons.length)]
    //   });
    // }
  }

  public itemTapped(name: string) {

    if (name != null || name != '') {
      this.navCtrl.push(DetailPage, {
        param1: name
      });
    }

  }

  // itemTapped(event, item) {
  //   // That's right, we're pushing to ourselves!
  //   this.navCtrl.push(ListPage, {
  //     item: item
  //   });
  // }
}
