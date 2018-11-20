import { NgModule } from '@angular/core'
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NouisliderModule } from 'ng2-nouislider';
import { UIRouterModule } from "@uirouter/angular";
import { Platform } from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { states, uiRouterConfigFn, RedirectHomeComponent } from './app.routes';
import { MyDatePickerModule } from 'mydatepicker';
import { componentsList } from './components';
import { AppComponent } from './app.component';
import { componentsList as SharedComponentsList } from './shared/components';
import { directivesList as SharedDirectivesList} from './shared/directives';
import { servicesList as SharedServicesList } from './shared/services';
import { MyCurrencyPipe } from "./shared/pipes/CurrencyPipe";

@NgModule({
  declarations: [
    AppComponent,
    RedirectHomeComponent,
  ] .concat(componentsList)
    .concat(SharedDirectivesList)
    .concat(SharedComponentsList),
  imports: [
    HttpModule,
    FormsModule,
    BrowserModule,
    NouisliderModule,
    ReactiveFormsModule,
    MyDatePickerModule,
    UIRouterModule.forRoot({ states: states, useHash: true, config: uiRouterConfigFn }),
  ],
  providers: [
    Platform, MyCurrencyPipe
  ].concat(SharedServicesList),
  bootstrap: [AppComponent]
})
export class AppModule {}