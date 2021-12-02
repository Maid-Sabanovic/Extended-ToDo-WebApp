import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ItemSearchService } from '../items/item-search.service';
import { Item } from '../items/item.model';
import { ItemService } from '../items/item.service';
import { MyAuthService } from '../my-auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchedItems: Item[] = [];
  searchString: string;

  constructor(private router: Router, private itemService: ItemService, public itemSearchService: ItemSearchService, private myAuthService: MyAuthService) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm) {
    this.searchString = f.value.search;

    if(this.searchString.length > 0){
      this.itemSearchService.search(this.searchString);
      f.resetForm();
      this.itemSearchService.currentSearchedItems.subscribe(Response => {
        this.searchedItems = Response;
      });
    } else {
      this.itemService.currentItems.subscribe(Response => {
        this.searchedItems = Response;
      });
    }
  }

}
