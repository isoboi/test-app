import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  constructor(private _router: Router) {}

  isAuthenticated() {
    return localStorage.getItem('token');
  }

  logOut() {
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }
}
