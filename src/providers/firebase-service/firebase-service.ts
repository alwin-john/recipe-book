import { Injectable } from '@angular/core';
import { Headers, Http, Request, RequestMethod, RequestOptions, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';

@Injectable()
export class FirebaseServiceProvider {
  items: Observable<any[]> = null;
  private searchUrl: string = 'http://food2fork.com/api/search';
  private getUrl: string = 'http://food2fork.com/api/get';
  private apiKey: string = 'e3aaf0241aa5808aa93f16d859be6415';
  constructor(public http: Http, public db: AngularFireDatabase, private admobFree: AdMobFree) {
  }
  public getResource(resourceName: string): Observable<any> {
    this.items = this.db.list(resourceName).valueChanges();
    return this.items;
  }

  public getRecipies(searchParam:string,searchKey):Observable<any> {
    const body = new URLSearchParams();
    let url:string='';
    if(searchKey==='q'){
      url=this.searchUrl;
    }else{
      url=this.getUrl;
    }

    body.set('key', this.apiKey);
    body.set(searchKey, searchParam);
    const requestOptions = this.getRequestOptions(RequestMethod.Post,url, body);
    return this.http.request(new Request(requestOptions))
      .map(res => res.json());
      
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

  private getRequestOptions(requestMethod, url: string, urlParam?: URLSearchParams, body?: Object): RequestOptions {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    //headers.append('Access-Control-Allow-Methods','GET','POST','PUT','DELETE','OPTIONS');
    let options = new RequestOptions({
      headers: headers,
      method: requestMethod,
      url: url
    });
    if (urlParam) {
      options = options.merge({ params: urlParam });
    }
    if (body) {
      options = options.merge({ body: JSON.stringify(body) });
    }
    return options;
  }


}
