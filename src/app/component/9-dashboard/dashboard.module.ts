import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardItemComponent } from './dashboard-item/dashboard-item.component';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './dashboard.service';
import { TestHostComponent } from './test-host.component';



@NgModule({
  declarations: [
    DashboardComponent,
    DashboardItemComponent,
    TestHostComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
  providers: [DashboardService]
})
export class DashboardModule { }
