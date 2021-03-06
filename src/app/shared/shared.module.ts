import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Pipes module
import { PipesModule } from '../pipes/pipes.module';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { ModaluploadComponent } from '../components/modalupload/modalupload.component';


@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        PipesModule
    ],
    declarations: [
        BreadcrumbsComponent,
        HeaderComponent,
        SidebarComponent,
        NopagefoundComponent,
        ModaluploadComponent
    ],
    exports: [
        BreadcrumbsComponent,
        HeaderComponent,
        SidebarComponent,
        NopagefoundComponent,
        ModaluploadComponent
    ]
})
export class SharedModule { }
