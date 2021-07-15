import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class BaseService {

  constructor(private authService: AuthService) { }

  handleError(error) {
    if (error.status === 401) {
      this.authService.logOut();
    }
    return throwError(error.message);
  }
}
