import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITask } from '../interface/task.interface';
import { catchError } from 'rxjs/operators';
import { BaseService } from './base.service';
import { apiUrl } from '../urlapi/url-api';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient,
              private baseService: BaseService) {
  }

  getTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(apiUrl.tasks())
      .pipe(catchError(err => this.baseService.handleError(err)));
  }

  getTask(id: number): Observable<ITask> {
    return this.http.get<ITask>(apiUrl.task() + id)
      .pipe(catchError(err => this.baseService.handleError(err)));
  }

  createTask(data: ITask) {
    return this.http.post(apiUrl.task(), data)
      .pipe(catchError(err => this.baseService.handleError(err)));
  }

  updateTask(data: ITask) {
    return this.http.put(apiUrl.task() + data.id, data)
      .pipe(catchError(err => this.baseService.handleError(err)));
  }
}
