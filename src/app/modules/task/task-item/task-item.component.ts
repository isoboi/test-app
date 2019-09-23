import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { TaskService } from '../task.service';
import { Observable, Subject } from 'rxjs';
import { ITask } from '../task.models';

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

  constructor(private _fb: FormBuilder,
              private _activatedRoute: ActivatedRoute,
              private _taskService: TaskService,
              private _router: Router) { }

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
      subscription = this._taskService.createTask(this.form.value);
    } else {
      subscription = this._taskService.updateTask(this.form.value);
    }

    subscription
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this._router.navigate(['/tasks']));
  }

  private _getRouteParam() {
    this.urlParam = this._activatedRoute.snapshot.params.id;

    if (this.urlParam === 'new') {
      this._initForm();
    } else {
      this._getTask(this.urlParam);
    }
  }

  private _initForm() {
    this.showLoader = false;
    const task = this.task;
    this.form = this._fb.group({
      id: (task && task.id) || this._getRandomId(),
      name: [(task && task.name) || '', Validators.required],
      description: (task && task.description) || '',
      date: [(task && task.date) || '', Validators.required]
    });
  }

  private _getTask(id) {
    this._taskService.getTask(id)
      .subscribe((res: ITask) => {
        this.task = res;
        this._initForm();
      });
  }

  private _getRandomId() {
    return Math.round(Math.random() * 10000);
  }
}
