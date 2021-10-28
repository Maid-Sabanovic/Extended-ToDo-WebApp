import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { Item } from '../item.model';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  items: Item[] = [];
  subscription: Subscription = new Subscription;
  routeSubscription: Subscription = new Subscription;
  error: string;

  constructor(private router: Router, private itemService: ItemService) { 
  }

  ngOnInit(): void {
    this.subscribing();
    //this.detectRouteChange();
  }

  onNewItem() {
    this.router.navigate(['/todolist/new']);
  }

  subscribing() {
    this.subscription = this.itemService.currentItems.subscribe((items) => {
      this.items = items;
    });
  }

  /*detectRouteChange(): void {
    this.routeSubscription = this.router.events.subscribe(event => {

      if (event instanceof NavigationStart) {
        this.subscription.unsubscribe();
        console.log('ItemListRouteChange ' + this.subscription.closed);
        

        if (event.url == '/todolist') {
          this.subscribing();
        }
      }
    });
  }*/

}
