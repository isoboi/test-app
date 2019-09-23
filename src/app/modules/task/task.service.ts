import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITask } from './task.models';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private _http: HttpClient) {
  }

  getTasks(): Observable<ITask[]> {
    return this._http.get<ITask[]>('/tasks');
  }

  getTask(id: number): Observable<ITask> {
    return this._http.get<ITask>('/task/' + id);
  }

  createTask(data: ITask) {
    return this._http.post('/task', data);
  }

  updateTask(data: ITask) {
    return this._http.put('/task/' + data.id, data);
  }
}
