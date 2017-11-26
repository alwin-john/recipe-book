import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { InAppBrowser,InAppBrowserOptions } from '@ionic-native/in-app-browser';
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  selectedItem: any;
  items: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fireBaseService: FirebaseServiceProvider, private platform: Platform,private inAppBrowser:InAppBrowser) {

    this.items = '';

    this.selectedItem = navParams.get('param1');
    fireBaseService.getRecipies(this.selectedItem, 'rId').subscribe(res => {
      this.items = res.recipe;
      console.log(this.items);
    });

  }

  launch(url) {
    this.platform.ready().then(() => {

      const options:InAppBrowserOptions={
        zoom:'no'
      }
      const browser = this.inAppBrowser.create(url,'_self');
    });
  }

}
