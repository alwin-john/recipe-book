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
    this.selectedItem = navParams.get('param1');
    fireBaseService.getRecipies(this.selectedItem,'q').subscribe(res => {
      this.items = res.recipes;
      console.log(this.items);
    });

  }

  public itemTapped(name: string) {
    console.log(name);
    if (name != null || name != '') {
      this.navCtrl.push(DetailPage, {
        param1: name
      });
    }

  }
}
