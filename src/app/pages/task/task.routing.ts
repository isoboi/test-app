import { Routes } from '@angular/router';
import { TaskComponent } from './task.component';
import { TaskItemComponent } from './task-item/task-item.component';
import { TaskListComponent } from './task-list/task-list.component';

export const TASK_ROUTES: Routes = [
  {
    path: '', component: TaskComponent, children: [
      {path: '', component: TaskListComponent},
      {path: ':id', component: TaskItemComponent},
    ]
  },
];
