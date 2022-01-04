import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { MyAuthService } from '../_services/my-auth.service';

@Injectable({
  providedIn: 'root'
})
export class GroupGuardService implements CanActivateChild, CanActivate {

  subscription: Subscription;

  //Holds the groups of the user, for example 'GWS-MA'
  userGroups: string[] = [];

  //checks if the group declared in data{} in app.routing.module is present and valid
  isPresent: boolean;

  constructor(private myAuthService: MyAuthService, private router: Router) {

    //getting user groups from myAuthService and assigning to local userGroups[]
    this.subscription = this.myAuthService.currentUserGroups.subscribe((userGroups) => {
      this.userGroups = userGroups;
    })
  }

  /*
  * Method for allowing access to specific component to user IF user is in specific group
  * Used in app.routing.module with the canActivate property in routes[]
  * along with the data property the data{} property for the specific group
  */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    this.isPresent = this.userGroups.some(x => x === route.data.group);
    if (this.isPresent) {
      return true;
    } else {
      this.router.navigate(['todolist']);
      return false;
    }
  }

  /*
  * Method for allowing access to specific component to user IF user is in specific group
  * Can be used in app.routing.module with the canActivateChild property in routes[]
  */
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
    boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      
    return this.canActivate(childRoute, state);
  }
}
