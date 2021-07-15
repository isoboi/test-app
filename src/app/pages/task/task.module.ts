import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TASK_ROUTES } from './task.routing';

import { TaskComponent } from './task.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskItemComponent } from './task-item/task-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
    declarations: [
        TaskComponent,
        TaskListComponent,
        TaskItemComponent
    ],
    exports: [
        TaskComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(TASK_ROUTES),
        ReactiveFormsModule,
        TranslateModule
    ]
})
export class TaskModule {
}
