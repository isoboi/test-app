import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITask } from '../interface/task.interface';
import { catchError } from 'rxjs/operators';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private _http: HttpClient,
              private _baseService: BaseService) {
  }

  getTasks(): Observable<ITask[]> {
    return this._http.get<ITask[]>('/tasks')
      .pipe(catchError(err => this._baseService.handleError(err)));
  }

  getTask(id: number): Observable<ITask> {
    return this._http.get<ITask>('/task/' + id)
      .pipe(catchError(err => this._baseService.handleError(err)));
  }

  createTask(data: ITask) {
    return this._http.post('/task', data)
      .pipe(catchError(err => this._baseService.handleError(err)));
  }

  updateTask(data: ITask) {
    return this._http.put('/task/' + data.id, data)
      .pipe(catchError(err => this._baseService.handleError(err)));
  }
}
