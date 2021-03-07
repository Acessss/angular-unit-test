import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardItemComponent } from './dashboard-item/dashboard-item.component';
import { DashboardComponent } from './dashboard.component';


const routes: Routes =  [
  { path: '',    component: DashboardComponent },
  { path: 'dashboard-item/:id', component: DashboardItemComponent }
];

export const routedComponents = [DashboardComponent, DashboardItemComponent];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
