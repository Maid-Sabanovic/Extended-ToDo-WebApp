import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MyAuthService } from 'src/app/_services/my-auth.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})

export class ItemsComponent implements OnInit {
  // Variable to display the name of user in items.component.html
  fullName: string = '';
  userGroups: string[] = [];
  subscription: Subscription;
  subscription2: Subscription;

  constructor(private router: Router, private myAuthService: MyAuthService) { }

  // Getting user and usergroups 
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
