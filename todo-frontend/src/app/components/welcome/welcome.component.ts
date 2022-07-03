import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyAuthService } from '../../_services/my-auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private router: Router, private myAuthService: MyAuthService) { }

  ngOnInit(): void {
  }

  // Method for userlogin
  login() {
    this.myAuthService.login();
  }

  // Method to check if user is logged in
  getClaims() {
    return this.myAuthService.getClaims();
  }

  todolist(){
    this.router.navigate(['/todolist']);
  }

  search(){
    this.router.navigate(['/search']);
  }
}
