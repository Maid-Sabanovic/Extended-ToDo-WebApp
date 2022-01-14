import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';
import { filter } from 'jszip';
import { Subject, Subscription } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ItemSearchService } from '../../_services/item-search.service';
import { ItemService } from '../../_services/item.service';
import { MyAuthService } from '../../_services/my-auth.service';
import { Item } from '../items/item.model';
import { take } from 'rxjs/operators';
import { HttpErrorInterceptorService } from 'src/app/_interceptor/http-error-interceptor.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchedItems: Item[] = [];
  searchString = '';
  searchCompleted: number;
  body: string;
  testModal: Modal | undefined;
  isError = false;
  itemDescription = '';
  itemIsComplete = 0;
  itemForm = new FormGroup({
    search: new FormControl(this.itemDescription, Validators.required),
    isComplete: new FormControl(this.itemIsComplete, Validators.required)
  });

  // variable for letting the user know that data is beeing fetched
  loadingSpinner = true;

  // used for configuring the datatable
  dtOptions: any;

  constructor(private router: Router, private itemService: ItemService,
    public itemSearchService: ItemSearchService) {
  }

  ngOnInit(): void {
    //configuring the settings for datatables with export buttons

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 15, 25],
      processing: true,
      columnDefs: [
        { "width": "5%", "targets": 0 },
        { "width": "5%", "targets": 2 },
        { "width": "13%", "targets": 3 }
      ],
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
  onSubmit() {

    //Setting loadingSpinner back to true for every query
    this.loadingSpinner = true;
    this.isError = false;

    setTimeout(() => {
      this.loadingSpinner = false;
    }, 3000);
    this.searchString = this.itemForm.value.search;
    this.searchCompleted = this.itemForm.value.isComplete;

    //Convert completed value of option element for query-database purposes
    if (this.searchCompleted == 0) {
      this.isError = true;
      this.loadingSpinner = false;
      this.body = 'Bitte ein Dropdown-Feld auswählen';
      this.openModal();
    }

    /*
    * When clicking in the search bar, searchstring goes from empty string to null string
    * changing back to empty string to prevent error
    */
    if (this.searchString == null || this.searchString == undefined) {
      this.searchString = '';
    }

    //Start the search if there is no error
    if (this.isError == false) {
      this.itemSearchService.search(this.searchString, this.searchCompleted).then(
        //success
        () => {
          this.itemSearchService.currentSearchedItems.subscribe(Response => {
            this.searchedItems = Response;
          });
        },
        //error
        () => {
          this.isError = true;
          this.loadingSpinner = false;
          this.body = 'Suche für \'' + this.searchString + '\' ergab keine Treffer! :(';
          this.openModal();
        }
      );
    }

    //Resets the search field completely, and the dropdown resets to previous value[0]
    this.itemForm.reset({ isComplete: 0 });

    
  }

  //Method to open the modal, this works
  openModal() {
    this.testModal = new bootstrap.Modal(document.getElementById('testModal'), {
      keyboard: false
    })
    this.testModal?.show();
  }
}
