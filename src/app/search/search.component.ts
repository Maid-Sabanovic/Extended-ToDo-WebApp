import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
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
  loadingSpinner = true;

  dtOptions: any;

  constructor(private router: Router, private itemService: ItemService, public itemSearchService: ItemSearchService, private myAuthService: MyAuthService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5,15,25],
      processing: true,
      dom: 'Bfrtip',
	 buttons: {
      buttons: [
            { extend: 'excel', className: 'btn btn-outline-success mb-3'},
            { extend: 'csv', className: 'btn btn-outline-success mb-3' }
               ],
       dom: {
		  button: {
		  className: 'btn'
	         }
       }
     }
    }
  }

  onSubmit(f: NgForm) {
    
    setTimeout(() => {
      this.loadingSpinner = false;
    }, 3000);
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
