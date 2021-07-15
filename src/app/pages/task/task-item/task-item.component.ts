import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { TaskService } from '../../../core/services/task.service';
import { Observable, Subject } from 'rxjs';
import { ITask } from '../../../core/interface/task.interface';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit, OnDestroy {

  form: FormGroup;
  task: ITask;
  showLoader = true;
  private urlParam: string;
  private destroy$ = new Subject();

  constructor(private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private taskService: TaskService,
              private router: Router) { }

  ngOnInit() {
    this._getRouteParam();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSubmit() {
    if (this.form.invalid) { return; }

    let subscription: Observable<any>;
    if (this.urlParam === 'new') {
      subscription = this.taskService.createTask(this.form.value);
    } else {
      subscription = this.taskService.updateTask(this.form.value);
    }

    subscription
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.router.navigate(['/tasks']));
  }

  private _getRouteParam() {
    this.urlParam = this.activatedRoute.snapshot.params.id;

    if (this.urlParam === 'new') {
      this._initForm();
    } else {
      this._getTask(this.urlParam);
    }
  }

  private _initForm() {
    this.showLoader = false;
    const task = this.task;
    this.form = this.fb.group({
      id: (task && task.id) || this._getRandomId(),
      name: [(task && task.name) || '', Validators.required],
      description: (task && task.description) || '',
      date: [(task && task.date) || '', Validators.required]
    });
  }

  private _getTask(id) {
    this.taskService.getTask(id)
      .subscribe((res: ITask) => {
        this.task = res;
        this._initForm();
      });
  }

  private _getRandomId() {
    return Math.round(Math.random() * 10000);
  }
}
