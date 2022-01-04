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
  editMode = false;
  itemForm: FormGroup;
  index: number;
  item: Item;


  constructor(private itemService: ItemService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.subscribing();
  }

  subscribing() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  onSubmit() {
    if (this.editMode) {
      this.updateItem(this.itemForm.value);
    } else {
      this.addItem(this.itemForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['/todolist'], { relativeTo: this.route });
  }

  addItem(item: Item) {
    this.itemService.addItem(item.description, item.isComplete);
  }

  updateItem(item: Item) {
    this.itemService.updateItem(this.id, item);
  }

  private initForm() {
    let itemId;
    let itemDescription;
    let itemIsComplete;

    if (this.editMode) {
      this.subscription = this.itemService.currentItems.subscribe((items) => {
        this.item = items.find(specificItem => specificItem.id === this.id);
      });

      itemId = this.item.id;
      itemDescription = this.item.description;
      itemIsComplete = this.item.isComplete;

    } else {
      itemId = itemId;
      itemDescription = '';
      itemIsComplete = false;
    }

    this.itemForm = new FormGroup({
      id: new FormControl(itemId, Validators.required),
      description: new FormControl(itemDescription, Validators.required),
      isComplete: new FormControl(itemIsComplete, Validators.required)
    });
  }
}
