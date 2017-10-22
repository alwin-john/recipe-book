import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class FirebaseServiceProvider {
  items: Observable<any[]>=null;
  constructor(public http: Http,public db: AngularFireDatabase) {
   
  }
  public getResource(resourceName: string):Observable<any>{
    this.items= this.db.list(resourceName).valueChanges();
    return this.items;
    // return Observable.create(function (observer){

    //   this.items.subscribe(res => {
    //     console.log(res);
    //    });

    // });
  }


}
