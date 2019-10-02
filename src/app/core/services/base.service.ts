import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class BaseService {

  constructor(private _authService: AuthService) { }

  handleError(error) {
    if (error.status === 401) {
      this._authService.logOut();
    }
    return throwError(error.message);
  }
}
