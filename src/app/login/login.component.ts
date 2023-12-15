import { Component } from '@angular/core';
// import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
// import { CookieService } from 'ngx-cookie-service';
import {  ElementRef, ViewChild, HostListener } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  db: any;
  allUsers: any=[];
  cookieValue: string = '';
   loginError: boolean = false; 
   @ViewChild('loginButton') loginButton!: ElementRef;
   showPassword: boolean = false;

  constructor(
    public authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) {}
  ngAfterViewInit() {
    // Ensure loginButton is initialized
    this.loginButton.nativeElement;
  }

  async getUsers() {
    this.allUsers = await this.authService.getAllUsersByEmail(this.email);

    if (this.allUsers.length) {
      if(this.email != this.allUsers[0].email || this.password != this.allUsers[0].password){
        this.loginError = true;
        return
      }
    
      const usersString = JSON.stringify(this.allUsers[0]);
      this.cookieService.set('userData', usersString);
      this.router.navigate(['/dashboard']);
 
    } else {
      this.loginError = true;
    }
  }
  @HostListener('document:keydown.enter', ['$event'])
  onEnterKey(event: KeyboardEvent) {
    if (event.target instanceof HTMLInputElement) {
      if (event.key === 'Enter') {
        event.preventDefault(); // Prevent the default form submission behavior
        this.loginButton.nativeElement.click(); // Programmatically trigger the button click
      }
    }
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
