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
  userGroups: string[] = [];
  subscription: Subscription;
  subscription2: Subscription;

  constructor(private router: Router, private myAuthService: MyAuthService) { }

  ngOnInit(): void {
    this.myAuthService.getUser();
    this.myAuthService.getUserGroups();
    this.subscribing();
  }

  subscribing(){
    this.subscription = this.myAuthService.currentUser.subscribe((user) => {
      this.fullName = user;
    });

    this.subscription2 = this.myAuthService.currentUserGroups.subscribe((userGroups) => {
      this.userGroups = userGroups;
    })
  }

  logout() {
    this.myAuthService.logout();
    this.router.navigate(['welcome']);
  }

}
