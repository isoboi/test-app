import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { APP_ROUTES } from './app-routing';
import { FakeBackendProvider } from './core/interceptor/fake-backend-interceptor';

import { AppComponent } from './app.component';
import { BaseService } from './core/services/base.service';
import { AuthService } from './core/services/auth.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(APP_ROUTES),
    HttpClientModule
  ],
  providers: [
    FakeBackendProvider,
    AuthService,
    BaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
