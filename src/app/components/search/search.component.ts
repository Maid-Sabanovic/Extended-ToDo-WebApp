import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ItemSearchService } from '../../_services/item-search.service';
import { ItemService } from '../../_services/item.service';
import { MyAuthService } from '../../_services/my-auth.service';
import { Item } from '../items/item.model';


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
      lengthMenu: [5, 15, 25],
      processing: true,
      dom: 'Bfrtip',
      buttons: {
        buttons: [
          { extend: 'excel', className: 'btn btn-outline-success mb-3' },
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
    
    if(this.searchString == null || this.searchString == undefined){
      this.searchString = '';
    }

    if (this.searchString.length == 0) {
      this.itemService.currentItems.subscribe(Response => {
        this.searchedItems = Response;
      });
    } else if (this.searchString.length > 0) {
      this.itemSearchService.search(this.searchString);
      f.resetForm();
      this.itemSearchService.currentSearchedItems.subscribe(Response => {
        this.searchedItems = Response;
      });
    }
  }

}
