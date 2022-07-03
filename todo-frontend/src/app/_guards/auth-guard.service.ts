import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MyAuthService } from '../_services/my-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(private myAuthService: MyAuthService, private router: Router) { }

  /*
  * Method for allowing access to specific component to user
  * Used in app.routing.module with the canActivate property in routes[]
  */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      if(this.myAuthService.getClaims()) {
        return true;
      } else {
        this.router.navigate(['/welcome']);
        return false;
      }
  }

  /*
  * Method for allowing access to specific child-component to user
  * Can be used in app.routing.module with the canActivateChild property in routes[]
  */
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.canActivate(childRoute, state);
  }
}
