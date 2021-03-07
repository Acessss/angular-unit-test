import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PluginComponent } from './plugin.component';


const routes: Routes =  [
  { path: '',    component: PluginComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PluginRoutingModule {}
