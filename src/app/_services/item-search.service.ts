import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Item } from '../components/items/item.model';
import { ItemService } from './item.service';

// URL to the 'get search' endpoint of API
const APIURL = 'https://localhost:44316/api/TodoItems/search?desc=';

@Injectable({
  providedIn: 'root'
})
export class ItemSearchService {

  /*
    * Holds the data for the searcheditems
    * Components can subscribe to the observable to get the data
    */
  private _itemsSearchSource = new BehaviorSubject<Item[]>([]);
  currentSearchedItems = this._itemsSearchSource.asObservable();

  constructor(private http: HttpClient, private itemService: ItemService) { }

  // Method to call the endpoint and assign response data to the observable
  search(q: string) {
    let promise = new Promise<void>((resolve, reject) => {
      this.http.get<Item[]>(APIURL + q)
        .toPromise()
        .then(
          Response => {
            this._itemsSearchSource.next(Response);
            resolve();
          },
          msg => {
            reject(msg);
          }
        );
      });
    return promise;
  }
  
}
