import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { BaseService } from './base.service';
import { apiUrl } from '../urlapi/url-api';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,
              private baseService: BaseService) { }

  login(data) {
    return this.http.post(apiUrl.login(), data)
      .pipe(catchError(err => this.baseService.handleError(err)));
  }

  setUser(user) {
    localStorage.setItem(apiUrl.token(), user.token);
  }
}
