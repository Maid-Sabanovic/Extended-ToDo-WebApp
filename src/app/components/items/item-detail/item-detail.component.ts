import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Params, Router } from '@angular/router';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';
import { Subscription } from 'rxjs';
import { ItemService } from 'src/app/_services/item.service';
import { Item } from '../item.model';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  item: Item;
  id: number;
  subscription: Subscription = new Subscription;

  constructor(private itemService: ItemService, private route: ActivatedRoute, 
    private router: Router, private ngxBootstrapConfirmService: NgxBootstrapConfirmService) {
  }

  ngOnInit(): void {
    this.subscribing();
  }

  // Method to navigate to the edit route
  onEditItem(): void {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  //Method to ensure that user wants to delete item
  onDeleteItem() {
    let options = {
      title: 'Are you sure you want to delete this Item?',
      confirmLabel: 'Yes',
      declineLabel: 'No'
    }
    this.ngxBootstrapConfirmService.confirm(options).then((res: boolean) => {
      if (res) {
        this.itemService.deleteItem(this.id);
      } else {
      }
    });
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

}
