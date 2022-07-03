import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyAuthService {

  identityClaim;
  accesstoken: string;
  idToken: string;

  user: string;
  userSource = new BehaviorSubject<string>("");
  currentUser = this.userSource.asObservable();
  
  userGroups: string[] = [];
  userGroupsSource = new BehaviorSubject<string[]>([]);
  currentUserGroups = this.userGroupsSource.asObservable();

  constructor(private oauthService: OAuthService, private http: HttpClient) { 
  }

  // Method to initiate the oAuth process
  login() {
    this.oauthService.initImplicitFlow();
  }

  //Method to close the oAuth process
  logout(){
    this.oauthService.logOut();
  }

  /*
  * Method to retrieve the access token in JSON format
  * access token allow access to resource like, file, database, api endpoint
  */
  getAccesstoken(){
    this.accesstoken = JSON.stringify(this.oauthService.getAccessToken());
  }

  /*
  * Method to retrieve the id token in JWT format
  * Id token proves that user has been authenticated
  * Holds information about the user 
  */
  getIdToken(){
    this.idToken = JSON.stringify(this.oauthService.getIdToken());
  }

  /*
  * Method to get the identitiy claims
  * Used in welcome component to check if user is authenticated
  */
  getClaims() {
    this.identityClaim = this.oauthService.getIdentityClaims();
    return this.identityClaim ? this.identityClaim : null;
  }

  /* 
  * Method to get the current user and all his details from api endpoint
  * Used in welcome component to display username
  */
  getUser() {
    this.identityClaim = this.oauthService.getIdentityClaims();
    this.http.get('https://localhost:44316/api/ADInfo/GetFullName/'+ this.identityClaim.upn, {responseType: 'text'}).subscribe(user => {
      this.user = user;
      this.userSource.next(this.user);
    });
  }

  /* 
  * Method to get usergroups of current user from API endpoint
  * Used in group-guard.service to control access to routes
  */
  getUserGroups() {
    this.identityClaim = this.oauthService.getIdentityClaims();
    this.http.get<[]>('https://localhost:44316/api/ADInfo/GetUserGroups/'+ this.identityClaim.upn).subscribe(userGroups => {
      this.userGroups = userGroups;
      this.userGroupsSource.next(this.userGroups);
    });
  }

}
