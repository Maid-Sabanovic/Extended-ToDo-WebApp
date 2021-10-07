import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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

  //Eventuell unnötig da kein unsubscibe() nötig ist, der observer macht es automatisch
  subscription: Subscription = new Subscription;


  constructor(private itemService: ItemService, private route: ActivatedRoute, private router: Router, private ngxBootstrapConfirmService: NgxBootstrapConfirmService) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params.id;
        this.subscription = this.itemService.currentItems.subscribe((items) => {
          this.item = items.find(specificItem => specificItem.id === this.id);
        });
      }
    );
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

}
