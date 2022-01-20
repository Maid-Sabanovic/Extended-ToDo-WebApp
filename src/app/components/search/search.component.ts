import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';
import { ItemService } from 'src/app/_services/item.service';
import { ItemSearchService } from '../../_services/item-search.service';
import { Item } from '../items/item.model';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  //variables used for the searching
  searchedItems: Item[] = [];
  searchString = '';
  searchCompleted: number;

  // used for configuring the datatable
  dtOptions: any;

  //variables used for the bootstrap5 modals
  notifyModalBody: string;
  notifyModal: Modal | undefined;

  editModal: Modal | undefined;

  deleteModalBody: string;
  deleteModal: Modal | undefined;
  deleteItem: Item;

  //variable used to check if error occured
  isError = false;
  loadingSpinner = true;

  //variables used for the search html form
  itemDescription = '';
  itemIsComplete = 0;
  itemForm = new FormGroup({
    search: new FormControl(this.itemDescription, Validators.required),
    isComplete: new FormControl(this.itemIsComplete, Validators.required)
  });

  //variables used for the edit item html form inside edit modal
  editItemForm: FormGroup;

  constructor(public itemSearchService: ItemSearchService, private itemService: ItemService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    //configuring the settings for the datatable

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

    this.editItemForm = this.fb.group({
      id: [Number],
      description: [''],
      isComplete: [Boolean],
    });
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
      this.notifyModalBody = 'Bitte ein Dropdown-Feld auswählen';
      this.openNotificationModal();
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
      this.fetchTableData();
    }

    //Resets the search field completely, and the dropdown resets to previous value[0]
    //this.itemForm.reset({ isComplete: 0 });
  }

  //fetch TableData
  fetchTableData() {
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
        this.notifyModalBody = 'Suche für \'' + this.searchString + '\' ergab keine Treffer! :(';
        this.openNotificationModal();
      }
    );
  }

  //Method to open the notification modal
  openNotificationModal() {
    this.notifyModal = new bootstrap.Modal(document.getElementById('notificationModal'), {
      keyboard: false
    })
    this.notifyModal?.show();
  }

  // Method to open the edit modal
  openEditModal(targetModal, item: Item) {
    //fill the fields of itemform with the data of item
    this.editItemForm.patchValue({
      id: item.id,
      description: item.description,
      isComplete: item.isComplete,
    });
    this.editModal = new bootstrap.Modal(document.getElementById('editItemModal'), {
      keyboard: false
    });
    this.editModal.show(targetModal);
  }

  // Method to open the delete modal
  openDeleteModal(item){
    this.deleteModalBody = 'Are you sure you want to delete this item?';
    this.deleteItem = item;
    this.deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'), {
      keyboard: false
    });
    this.deleteModal.show();
  }

  onUpdateItem() {
    //send PUT request
    this.itemService.updateItem(this.editItemForm.value.id, this.editItemForm.value);
    //update the local array so that the datatable updates
    //change in local array affects the datatable output
    this.searchedItems.forEach((item) => {
      if(item.id == this.editItemForm.value.id){
      item.description = this.editItemForm.value.description;
      item.isComplete = this.editItemForm.value.isComplete;
      }
    })
    this.editModal.hide();
  }

  onDeleteItem(){
    //send DELETE request
    this.itemService.deleteItem(this.deleteItem.id);
    //update the local array so that the datatable updates
    //change in local array affects the datatable output
    this.searchedItems = this.searchedItems.filter(Response => Response.id != this.deleteItem.id);
    this.deleteModal.hide();
  }

}
