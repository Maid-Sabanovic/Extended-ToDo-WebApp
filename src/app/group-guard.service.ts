import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild,  Router,  RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { MyAuthService } from './my-auth.service';

@Injectable({
  providedIn: 'root'
})
export class GroupGuardService implements CanActivateChild, CanActivate{

  subscription: Subscription;
  userGroups: string[] = [];
  isPresent: boolean;

  constructor(private myAuthService: MyAuthService, private router: Router) { 
    this.subscription = this.myAuthService.currentUserGroups.subscribe((userGroups) => {
      this.userGroups = userGroups;
    })
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    this.isPresent = this.userGroups.some(x => x === 'GWS-MA');
    if (this.isPresent){
      return true;
    } else {
      return this.router.navigate(['todolist']);
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.canActivate(childRoute, state);
  }
}
