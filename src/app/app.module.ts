import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LightswitchComponent } from './component/1-lightswitch/lightswitch.component';
import { DashboardHeroComponent } from './component/2-dashboard-hero/dashboard-hero.component';
import { WelcomeComponent } from './component/4-welcome/welcome.component';
import { BannerComponent } from './component/3-banner/banner.component';
import { ValueService } from './service/value.service';
import { BannerNewComponent } from './component/5-banner-new/banner-new.component';
import { InputComponent } from './component/6-input/input.component';
import { CommonModule } from '@angular/common';
import { TwainComponent } from './component/7-twain/twain.component';
import { HttpClientModule } from '@angular/common/http';
import { CanvasComponent } from './component/8-canvas/canvas.component';
import { HighlightDirective } from './directive/highlight.directive';
import { TitleCasePipe } from './pipe/title-case.pipe';
import { TestPipeComponent } from './pipe/test-pipe/test-pipe.component';
import { TestDirectiveComponent } from './directive/test-directive/test-directive.component';
import { DashboardModule } from './component/9-dashboard/dashboard.module';
import { PluginModule } from './component/10-plugin/plugin.module';


@NgModule({
  declarations: [
    AppComponent,
    LightswitchComponent,
    DashboardHeroComponent,
    WelcomeComponent,
    BannerComponent,
    BannerNewComponent,
    InputComponent,
    TwainComponent,
    CanvasComponent,
    HighlightDirective,
    TestDirectiveComponent,
    TitleCasePipe,
    TestPipeComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    DashboardModule,
    PluginModule
  ],
  providers: [ValueService],
  bootstrap: [AppComponent]
})
export class AppModule { }
