import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { apiUrl } from '../urlapi/url-api';

@Injectable()
export class AuthService {

  constructor(private router: Router) {}

  isAuthenticated() {
    return localStorage.getItem(apiUrl.token());
  }

  logOut() {
    localStorage.removeItem(apiUrl.token());
    this.router.navigate([apiUrl.login()]);
  }
}
