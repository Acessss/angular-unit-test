import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PluginItemComponent } from './plugin-item/plugin-item.component';
import { PluginComponent } from './plugin.component';
import { PluginService } from './plugin.service';
import { PluginRoutingModule } from './plugin-routing.module';



@NgModule({
  declarations: [
    PluginComponent,
    PluginItemComponent
  ],
  imports: [
    CommonModule,
    PluginRoutingModule
  ],
  providers: [PluginService]
})
export class PluginModule { }
