import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http: HttpClient) { }

  login(data) {
    return this._http.post('/login', data);
  }

  setUser(user) {
    localStorage.setItem('token', user.token);
  }
}
