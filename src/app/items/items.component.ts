import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MyAuthService } from '../my-auth.service';
import { ItemService } from './item.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})

export class ItemsComponent implements OnInit {
  fullName: string = '';
  subscription: Subscription;

  constructor(private router: Router, private myAuthService: MyAuthService) { }

  ngOnInit(): void {
    this.myAuthService.getUser();
    this.subscribing();
  }

  subscribing(){
    this.subscription = this.myAuthService.currentUser.subscribe((user) => {
      this.fullName = user;
    });
  }

  logout() {
    this.myAuthService.logout();
    this.router.navigate(['welcome']);
  }

}
