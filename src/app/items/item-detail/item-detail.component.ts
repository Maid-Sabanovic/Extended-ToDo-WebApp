import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Params, Router } from '@angular/router';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';
import { Subscription } from 'rxjs';
import { Item } from '../item.model';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  //Zum Anzeigen der Details im HTML File
  item: Item;

  //Zum Speichern der params[id]
  id: number;
  subscription: Subscription = new Subscription;
  routeSubscription: Subscription = new Subscription;


  constructor(private itemService: ItemService, private route: ActivatedRoute, private router: Router, private ngxBootstrapConfirmService: NgxBootstrapConfirmService) {

  }

  ngOnInit(): void {
    this.subscribing();
    this.detectRouteChange();
  }

  onEditItem(): void {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

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

  detectRouteChange(): void {
    this.routeSubscription = this.router.events.subscribe(event => {

      if (event instanceof NavigationStart) {
        console.log("Navigation Start: " + event);
        this.subscription.unsubscribe();
        console.log('ItemDetailRouteChange ' + this.subscription.closed);
        

        if (event.url == '/todolist/' + this.id) {
          this.subscribing();
          console.log('ItemList Subscribed again')
        }
      }
    });
  }

}
