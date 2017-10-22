import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController , private fireBaseService: FirebaseServiceProvider) {
    fireBaseService.getResource('category').subscribe(res=> {
      console.log(res);
    });
  }
}
