import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Item } from './item.model';
import { ItemService } from './item.service';

const APIURL = 'https://localhost:44316/api/TodoItems/search?desc=';

@Injectable({
  providedIn: 'root'
})
export class ItemSearchService {

  private _itemsSearchSource = new BehaviorSubject<Item[]>([]); 
  currentSearchedItems = this._itemsSearchSource.asObservable();

  constructor(private http: HttpClient, private itemService: ItemService) { }

  search(q: string) {
    this.http.get<Item[]>(APIURL + q).subscribe(Response => {
      this._itemsSearchSource.next(Response);
    })
  }

  updateSelectedOptions(options: Item[]) {
    this._itemsSearchSource.next(options);
  }
}
