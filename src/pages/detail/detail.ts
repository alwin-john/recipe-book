import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  selectedItem: any;
  items: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fireBaseService: FirebaseServiceProvider ) {
    
    this.items = [];
    
        // If we navigated to this page, we will have an item available as a nav param
    
        this.selectedItem = navParams.get('param1');
        fireBaseService.getResource(this.selectedItem).subscribe(res => {
          this.items = res;
          console.log(this.items);
        });
    
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad DetailPage');
  // }

}
