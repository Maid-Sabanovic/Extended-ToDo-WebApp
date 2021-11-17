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
    this.identityClaim = this.oauthService.getIdentityClaims();
    return this.identityClaim ? this.identityClaim : null;
  }

  getUser() {
    this.http.get('https://localhost:44316/api/ADInfo/maid.sabanovic@gws.ms', {responseType: 'text'}).subscribe(user => {
      this.user = user;
      this.userSource.next(this.user);
    });
  }

}
