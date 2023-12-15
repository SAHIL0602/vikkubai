import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Gurdeep';

  constructor(private cookieService: CookieService, private router: Router) {
    if (this.cookieService.get('userData')) {
      var data = JSON.parse(this.cookieService.get('userData'));

      let status = false;
      if (data.email && data.phone && data.password) {
        status = true;

        this.router.navigate(['/dashboard']);
      }
    } else {
      this.router.navigate(['/']);
    }

       
  }
}
