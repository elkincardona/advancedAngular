import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from '../shared/shared.module';

import { PagesComponent } from './pages.component';

import { Graphics1Component } from './graphics1/graphics1.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PAGES_ROUTER } from './pages.routes';



@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graphics1Component
    ],
    exports: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graphics1Component
    ],
    imports: [
        SharedModule,
        PAGES_ROUTER
    ]
})
export class PagesModule {}
