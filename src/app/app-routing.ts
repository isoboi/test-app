import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './core/guards/auth-guard.guard';

export const APP_ROUTES: Routes = [
  {path: '', component: AppComponent, children: [
      {path: '', redirectTo: 'tasks', pathMatch: 'full'},
      {path: 'login', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)},
      {path: 'tasks', canActivate: [AuthGuard], loadChildren: () => import('./modules/task/task.module').then(m => m.TaskModule)}
    ]},
  {path: '**', redirectTo: ''}
];
