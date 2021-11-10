import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { ItemService } from './item.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})

export class ItemsComponent implements OnInit {

  identityClaim;
  accesstoken: string;
  token: string;
  errorMessage: string;
  email: string;
  firstName: string;
  lastName: string;
  constructor(private oauthService: OAuthService, private itemService: ItemService) { }

  ngOnInit(): void {
  }

  login() {
    this.oauthService.initImplicitFlow();
    this.getClaims();
  }

  logout() {
    this.oauthService.logOut();
    this.itemService.navigateHome();
  }

  getClaims() {
    this.accesstoken = JSON.stringify(this.oauthService.getAccessToken());
    this.token = JSON.stringify(this.oauthService.getIdToken());

    this.identityClaim = this.oauthService.getIdentityClaims();
    this.email = this.identityClaim.upn;

    var namePart = this.email.substring(0, this.email.indexOf("@")); // get "firstName.lastName"
    this.firstName = namePart.substring(0, namePart.indexOf(".")); // get first name from name part
    this.firstName = this.firstName.charAt(0).toUpperCase() + this.firstName.slice(1); // set first letter uppercase for first name
  	this.lastName = namePart.substring(namePart.lastIndexOf('.') + 1); // get last name from name part
    this.lastName = this.lastName.charAt(0).toUpperCase() + this.lastName.slice(1); // set first letter uppercase for last name

    return this.itemService.getClaims();
  }

}
