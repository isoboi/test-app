import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http: HttpClient,
              private _baseService: BaseService) { }

  login(data) {
    return this._http.post('/login', data)
      .pipe(catchError(err => this._baseService.handleError(err)));
  }

  setUser(user) {
    localStorage.setItem('token', user.token);
  }
}
