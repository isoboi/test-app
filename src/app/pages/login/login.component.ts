import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from '../../core/services/login.service';
import { finalize, takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

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

  constructor(private fb: FormBuilder,
              private loginService: LoginService,
              private router: Router,
              private translate: TranslateService) { }

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
      this.loginService.login(this.form.value)
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => this.spinnerShow = false)
        )
        .subscribe((res) => {
          this.loginService.setUser(res);
          this.router.navigate(['/tasks']);
        }, () => this.error = true);
    }
  }

  private _initForm() {
    this.form = this.fb.group({
      login: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }
}
