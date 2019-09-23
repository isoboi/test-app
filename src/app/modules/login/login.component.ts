import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { finalize, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup;
  showPassword = false;
  spinnerShow = false;
  error = false;

  private destroy$ = new Subject();

  constructor(private _fb: FormBuilder,
              private _loginService: LoginService,
              private _router: Router) { }

  ngOnInit() {
    this._initForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSubmit() {
    if (this.form.valid) {
      this.spinnerShow = true;
      this._loginService.login(this.form.value)
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => this.spinnerShow = false)
        )
        .subscribe((res) => {
          this._loginService.setUser(res);
          this._router.navigate(['/tasks']);
        }, () => this.error = true);
    }
  }

  private _initForm() {
    this.form = this._fb.group({
      login: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }
}
