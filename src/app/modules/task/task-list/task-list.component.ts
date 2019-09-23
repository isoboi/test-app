import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Observable } from 'rxjs';
import { ITask } from '../task.models';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  tasks: Observable<ITask[]>;

  constructor(private _taskService: TaskService) { }

  ngOnInit() {
    this._getTasks();
  }

  private _getTasks() {
    this.tasks = this._taskService.getTasks();
  }

}
