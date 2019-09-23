import { Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, dematerialize, materialize, mergeMap } from 'rxjs/operators';

// array in local storage for registered tasks
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ` + token
        }
      });
    }

    const {url, method, headers, body} = request;
    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith('/login') && method === 'POST':
          return authenticate();

        case url.endsWith('/tasks') && method === 'GET':
          return getTasks();

        case url.match(/\/task\/\d+$/) && method === 'GET':
          return getTaskById();

        case url.endsWith('/task') && method === 'POST':
          return createTask();

        case url.match(/\/task\/\d+$/) && method === 'PUT':
          return updateTaskById();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions
    function authenticate() {
      const {login, password} = body;
      const user = (login === 'test' && password === 'test') ? body : null;
      if (!user) {
        return error('Username or password is incorrect');
      }
      return ok({
        login: user.login,
        token: '123456qwerty'
      });
    }

    function getTasks() {
      if (!isLoggedIn()) { return unauthorized(); }
      return ok(tasks);
    }

    function getTaskById() {
      if (!isLoggedIn()) { return unauthorized(); }

      const task = tasks.find(x => x.id === idFromUrl());
      return ok(task);
    }

    function createTask() {
      if (!isLoggedIn()) { return unauthorized(); }

      tasks.unshift(body);
      localStorage.setItem('tasks', JSON.stringify(tasks));

      return ok(body);
    }

    function updateTaskById() {
      if (!isLoggedIn()) { return unauthorized(); }

      const findTask = tasks.findIndex(item => item.id === body.id);
      tasks[findTask] = body;
      localStorage.setItem('tasks', JSON.stringify(tasks));

      return ok(tasks);
    }

    // helper functions

    function ok(body?) {
      return of(new HttpResponse({status: 200, body}));
    }

    function unauthorized() {
      return throwError({status: 401, error: {message: 'Unauthorised'}});
    }

    function error(message) {
      return throwError({error: {message}});
    }

    function isLoggedIn() {
      return headers.get('Authorization') === 'Bearer 123456qwerty';
    }

    function idFromUrl() {
      const urlParts = url.split('/');
      return parseInt(urlParts[urlParts.length - 1]);
    }
  }
}

export const FakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
