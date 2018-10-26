import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graphics1Component } from './graphics1/graphics1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';



const pagesRouter: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        children: [
            {path: 'dashboard', component: DashboardComponent, data: {tittle: 'Dasboard'} },
            {path: 'progress', component: ProgressComponent, data: {tittle: 'Progress'}},
            {path: 'graphics1', component: Graphics1Component, data: {tittle: 'Graphics'}},
            {path: 'promises', component: PromisesComponent, data: {tittle: 'Promises'}},
            {path: 'account-settings', component: AccountSettingsComponent, data: {tittle: 'Account Settings'}},
            {path: 'profile', component: ProfileComponent, data: {tittle: 'User Profile'}},
            {path: 'rxjs', component: RxjsComponent, data: {tittle: 'Rxjs Observables'}},
            {path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    }
];
export const PAGES_ROUTER = RouterModule.forChild(pagesRouter);
