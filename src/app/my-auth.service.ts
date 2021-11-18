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

  login() {
    this.oauthService.initImplicitFlow();
  }

  logout(){
    this.oauthService.logOut();
  }

  getAccesstoken(){
    this.accesstoken = JSON.stringify(this.oauthService.getAccessToken());
  }

  getIdToken(){
    this.idToken = JSON.stringify(this.oauthService.getIdToken());
  }

  getClaims() {
    this.getIdToken();
    this.getAccesstoken();
    this.identityClaim = this.oauthService.getIdentityClaims();
    return this.identityClaim ? this.identityClaim : null;
  }

  getUser() {
    this.identityClaim = this.oauthService.getIdentityClaims();
    this.http.get('https://localhost:44316/api/ADInfo/GetFullName/'+ this.identityClaim.upn, {responseType: 'text'}).subscribe(user => {
      this.user = user;
      this.userSource.next(this.user);
    });
  }

  getUserGroups() {
    this.identityClaim = this.oauthService.getIdentityClaims();
    this.http.get<[]>('https://localhost:44316/api/ADInfo/GetUserGroups/'+ this.identityClaim.upn).subscribe(userGroups => {
      this.userGroups = userGroups;
      this.userGroupsSource.next(this.userGroups);
    });
  }

}
