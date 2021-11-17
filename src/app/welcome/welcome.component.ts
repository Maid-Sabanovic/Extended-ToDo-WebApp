import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyAuthService } from '../my-auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private router: Router, private myAuthService: MyAuthService) { }

  ngOnInit(): void {
  }

  login() {
    this.myAuthService.login();
  }

  getClaims() {
    return this.myAuthService.getClaims();
  }

  todolist(){
    this.router.navigate(['/todolist']);
  }
}
