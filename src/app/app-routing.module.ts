import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: 'dashboard', loadChildren: () => import('./component/9-dashboard/dashboard.module').then(m => m.DashboardModule)},
  { path: 'plugin', loadChildren: () => import('./component/10-plugin/plugin.module').then(m => m.PluginModule)},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [ RouterModule ] // re-export the module declarations
})
export class AppRoutingModule { }

