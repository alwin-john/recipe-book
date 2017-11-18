import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { AngularFireDatabase } from 'angularfire2/database';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';

@Injectable()
export class FirebaseServiceProvider {
  items: Observable<any[]> = null;
  constructor(public http: Http, public db: AngularFireDatabase, private admobFree: AdMobFree) {

  }
  public getResource(resourceName: string): Observable<any> {
    this.items = this.db.list(resourceName).valueChanges();
    return this.items;
  }

  public showAdBanner() {
    const bannerConfig: AdMobFreeBannerConfig = {
      // add your config here
      // for the sake of this example we will just use the test config
      id: 'ca-app-pub-4994371511986707/7620655485',
      isTesting: true,
      autoShow: true
    };
    this.admobFree.banner.config(bannerConfig);

    this.admobFree.banner.prepare()
      .then(() => {
        // banner Ad is ready
        // if we set autoShow to false, then we will need to call the show method here
      })
      .catch(e => console.log(e));
  }


}
