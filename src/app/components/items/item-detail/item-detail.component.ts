import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';
import { Subscription } from 'rxjs';
import { ItemService } from 'src/app/_services/item.service';
import { Item } from '../item.model';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  body:string = 'Are you sure you want to delete this item?'
  testModal: Modal | undefined;

  item: Item;
  id: number;
  subscription: Subscription = new Subscription;

  constructor(private itemService: ItemService, private route: ActivatedRoute, 
    private router: Router) {
  }

  ngOnInit(): void {
    this.subscribing();
  }

  // Method to navigate to the edit route
  onEditItem(): void {
    this.itemService.navigateTo('edit', this.route);
  }

  //Method to ensure that user wants to delete item
  onDeleteItem() {
    this.itemService.deleteItem(this.id);
    this.itemService.navigateTo('edit', this.route);
  }

  //Method to get the id of route params and get the item of itemservice
  subscribing() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params.id;
        this.subscription = this.itemService.currentItems.subscribe((items) => {
          this.item = items.find(specificItem => specificItem.id === this.id);
        });
      }
    );
  }

  
  openModal(){
    this.testModal = new bootstrap.Modal(document.getElementById('testModal'), {
      keyboard: false
    })
    this.testModal?.show();
  }

  save() {
    this.itemService.deleteItem(this.id);
    this.testModal?.toggle();
  }

}
