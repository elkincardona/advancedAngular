import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Paths
import { APP_ROUTES } from './app.routes';

// Modules
import { PagesModule } from './pages/pages.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';


// Services
import { ServiceModule } from './services/service.module';

// Temp
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesComponent } from './pages/pages.component';
import { SharedModule } from './shared/shared.module';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    // PagesModule,
    ServiceModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
