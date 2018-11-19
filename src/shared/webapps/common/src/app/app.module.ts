import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import { states } from './app.routes';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { UIRouterModule } from "@uirouter/angular";

import { componentsList } from './components';
import { componentsList as sharedComponentsList } from './shared/components';
import { servicesList as sharedServicesList } from './shared/services';
import { pipesList as sharedPipesList } from './shared/pipes';
import { directivesList as sharedDirectivesList, directivesList } from './shared/directives';

@NgModule({
  declarations: [
    AppComponent
  ].concat(componentsList)
    .concat(sharedComponentsList)
    .concat(sharedServicesList)
    .concat(sharedPipesList)
    .concat(directivesList),
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    UIRouterModule.forRoot({ states: states, useHash: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}