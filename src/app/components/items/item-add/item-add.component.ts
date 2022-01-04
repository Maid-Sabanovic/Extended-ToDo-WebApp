import { Component, OnInit, } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { ItemService } from 'src/app/_services/item.service';
import { Item } from '../item.model';

@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.css']
})
export class ItemAddComponent implements OnInit {

  id: number = 0;
  subscription: Subscription = new Subscription;

  /*
  * variable used to switch between 'item-add' and 'item-edit' component
  */
  editMode = false;

  itemForm: FormGroup;
  index: number;
  item: Item;


  constructor(private itemService: ItemService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.subscribing();
  }

  // Method to get the item-id out of the url
  subscribing() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  //Method to either add or update item depending on the editmode 
  onSubmit() {
    if (this.editMode) {
      this.updateItem(this.itemForm.value);
    } else {
      this.addItem(this.itemForm.value);
    }
    this.onCancel();
  }

  // Method to navigate to the todolist
  onCancel() {
    this.router.navigate(['/todolist'], { relativeTo: this.route });
  }

  // Method to send new item data to itemservice
  addItem(item: Item) {
    this.itemService.addItem(item.description, item.isComplete);
  }

  // Method to send the updated data to itemservice
  updateItem(item: Item) {
    this.itemService.updateItem(this.id, item);
  }

  //Method to reset the form depending on the edit mode
  private initForm() {
    let itemId;
    let itemDescription;
    let itemIsComplete;

    /*
    * If editmode is true then retrieve item from currentItems[] in itemservice
    * with same id in the route params
    */
    if (this.editMode) {
      this.subscription = this.itemService.currentItems.subscribe((items) => {
        this.item = items.find(specificItem => specificItem.id === this.id);
      });

      // Fill the input fields of the form with the fetched data
      itemId = this.item.id;
      itemDescription = this.item.description;
      itemIsComplete = this.item.isComplete;

      //If editmode is false then set input fields empty
    } else {
      itemId = itemId;
      itemDescription = '';
      itemIsComplete = false;
    }

    /*
    * Binding the input fields from html form to local variables using formcontrolname property
    */
    this.itemForm = new FormGroup({
      id: new FormControl(itemId, Validators.required),
      description: new FormControl(itemDescription, Validators.required),
      isComplete: new FormControl(itemIsComplete, Validators.required)
    });
  }
}
