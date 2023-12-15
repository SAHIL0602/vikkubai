import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(
    public authService: AuthService,
    private router: Router,
    public afAuth: AngularFireAuth,
    private cookieService: CookieService,

  ) {}
  onClick(){
    this.router.navigate(['dashboard/chat'])
  }
  SignOut() {
    return this.afAuth.signOut().then(() => {
      this.cookieService.delete('userData');
      this.router.navigate(['/']);
    });
  }
  onPress(){
    this.router.navigate(['dashboard/calender'])

  }
}
