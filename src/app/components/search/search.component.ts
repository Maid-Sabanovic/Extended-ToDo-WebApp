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

  // variable for letting the user know that data is beeing fetched
  loadingSpinner = true;

  // used for configuring the datatable
  dtOptions: any;

  constructor(private router: Router, private itemService: ItemService, 
    public itemSearchService: ItemSearchService, private myAuthService: MyAuthService) { }

  ngOnInit(): void {
    //configuring the settings for datatables with export buttons
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

  /*
  * Method to submit the query to in search bar
  * Before displaying the data a loading spinner is activated for 3 seconds
  */
  onSubmit(f: NgForm) {

    setTimeout(() => {
      this.loadingSpinner = false;
    }, 3000);
    this.searchString = f.value.search;
    
    /*
    * When sending an empty request, AFTER the first search, the searchstring will be 'null' and throws an error
    * searchstring will be replaced with empty string when searchstring is null to prevent error
    */
    if(this.searchString == null || this.searchString == undefined){
      this.searchString = '';
    }

    //If searchstring is empty then get the currentitems from itemservice and display all items
    if (this.searchString.length == 0) {
      this.itemService.currentItems.subscribe(Response => {
        this.searchedItems = Response;
      });
      //Call the search method from itemsearchservice if searchstring is not empty
    } else if (this.searchString.length > 0) {
      this.itemSearchService.search(this.searchString);
      f.resetForm();
      this.itemSearchService.currentSearchedItems.subscribe(Response => {
        this.searchedItems = Response;
      });
    }

    //Seeting loadingSpinner back to true for every query
    this.loadingSpinner = true;
  }

}
