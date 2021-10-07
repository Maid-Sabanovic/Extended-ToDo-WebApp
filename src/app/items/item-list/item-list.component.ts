import { InvokeFunctionExpr } from '@angular/compiler';
import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
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

  constructor(private route: ActivatedRoute, private router: Router, private itemService: ItemService) { }

  ngOnInit(): void {
    this.subscription = this.itemService.currentItems.subscribe((items) => {
      this.items = items;
    });
  }

  onNewItem() {
    this.router.navigate(['/todolist/new']);
  }

  ngOnDestroy() {
    //Wird nie erreicht
    console.log("ngOnDestroy");
    this.subscription.unsubscribe();
  }

}
