import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { Item } from '../item.model';
import { MyAuthService } from 'src/app/_services/my-auth.service';
import { ItemService } from 'src/app/_services/item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  items: Item[] = [];
  subscription: Subscription = new Subscription;

  constructor(private router: Router, private itemService: ItemService, private myAuthService: MyAuthService) { 
  }

  ngOnInit(): void {
    this.subscribing();
  }

  onNewItem() {
    this.router.navigate(['/todolist/new']);
  }

  subscribing() {
    this.subscription = this.itemService.currentItems.subscribe((items) => {
      this.items = items;
    });
  }

}
