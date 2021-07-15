import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITask } from '../interface/task.interface';
import { apiUrl } from '../urlapi/url-api';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {
  }

  getTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(apiUrl.tasks());
  }

  getTask(id: number): Observable<ITask> {
    return this.http.get<ITask>(apiUrl.task () + id);
  }

  createTask(data: ITask) {
    return this.http.post(apiUrl.task(), data);
  }

  updateTask(data: ITask) {
    return this.http.put(apiUrl.task() + data.id, data);
  }
}
