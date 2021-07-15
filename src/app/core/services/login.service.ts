import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from '../urlapi/url-api';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(data) {
    return this.http.post(apiUrl.login(), data);
  }

  setUser(user) {
    localStorage.setItem(apiUrl.token(), user.token);
  }
}
