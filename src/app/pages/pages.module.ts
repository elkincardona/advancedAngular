
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Modules
import { SharedModule } from '../shared/shared.module';

import { PagesComponent } from './pages.component';

import { Graphics1Component } from './graphics1/graphics1.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PAGES_ROUTER } from './pages.routes';

// ng2 - charts
import { ChartsModule } from 'ng2-charts';

// Components
import { IncrementComponent } from '../components/increment/increment.component';
import { GraphicComponent } from './../components/graphic/graphic.component';




@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graphics1Component,
        IncrementComponent,
        GraphicComponent
    ],
    exports: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graphics1Component
    ],
    imports: [
        SharedModule,
        PAGES_ROUTER,
        FormsModule,
        ChartsModule
    ]
})
export class PagesModule {}
