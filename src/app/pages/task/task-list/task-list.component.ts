import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../core/services/task.service';
import { ITask } from '../../../core/interface/task.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  tasks: Observable<ITask[]>;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this._getTasks();
  }

  private _getTasks() {
    this.tasks = this.taskService.getTasks();
  }

}
