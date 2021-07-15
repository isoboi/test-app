import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { LOGIN_ROUTES } from './login.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [LoginComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(LOGIN_ROUTES),
        ReactiveFormsModule,
        TranslateModule
    ]
})
export class LoginModule { }
