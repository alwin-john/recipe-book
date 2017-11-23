import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';

@Injectable()
export class FirebaseServiceProvider {
  items: Observable<any[]> = null;
  private url:string='http://food2fork.com/api/search';
  private urlE:string='http://food2fork.com/api/search?key=e3aaf0241aa5808aa93f16d859be6415&q=shredded%20chicken';
  private apiKey:string='e3aaf0241aa5808aa93f16d859be6415';
  constructor(public http: HTTP, public db: AngularFireDatabase, private admobFree: AdMobFree) {

  }
  public getResource(resourceName: string): Observable<any> {
    this.items = this.db.list(resourceName).valueChanges();
    return this.items;
  }

  public getRecipe(searchParam:string):Promise<any>{
    console.log("error");
    let body = new URLSearchParams();
    body.set('key', this.apiKey);
    body.set('q', searchParam);
    
    let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    
    return this.http.post('',body,options);
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
