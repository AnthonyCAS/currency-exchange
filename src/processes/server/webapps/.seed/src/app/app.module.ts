import { NgModule } from '@angular/core'
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { UIRouterModule } from "@uirouter/angular";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { states, uiRouterConfigFn, RedirectHomeComponent } from './app.routes';
import { componentsList } from './components';
import { AppComponent } from './app.component';
import { componentsList as SharedComponentsList } from './shared/components';
import { servicesList as SharedServicesList } from './shared/services';

@NgModule({
  declarations: [
    AppComponent,
    RedirectHomeComponent,
  ] .concat(componentsList)
    .concat(SharedComponentsList),
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    UIRouterModule.forRoot({ states: states, useHash: true, config: uiRouterConfigFn }),
  ],
  providers: [

  ].concat(SharedServicesList),
  bootstrap: [AppComponent]
})
export class AppModule {}