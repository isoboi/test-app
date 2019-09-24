import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class BaseService {

  constructor(private _authervice: AuthService) { }

  handleError(error) {
    if (error.status === 401) {
      this._authervice.logOut();
    }
    return throwError(error.message);
  }
}
