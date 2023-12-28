import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router    , private cookieService: CookieService
    ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.isLoggedIn()) {
      return true;
    }
    localStorage.setItem('lastVisitedRoute', state.url);
    this.router.navigate(['/login']);
    return false;
  }

  public isLoggedIn(): boolean {
  
    let data = JSON.parse(this.cookieService.get('userData'));
    console.log(data);
    
    let status = false;
    if (data.email && data.phone && data.password ) {
      status = true;
    } else {
      status = false;
    }
    return status;
  }
}
