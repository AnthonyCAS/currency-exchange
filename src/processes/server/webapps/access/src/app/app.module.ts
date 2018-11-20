import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import { states, uiRouterConfigFn } from './app.routes';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { UIRouterModule } from "@uirouter/angular";
import { componentsList } from './components';
import { servicesList as sharedServicesList } from './shared/services';
import { servicesList } from './services';

@NgModule({
  declarations: [AppComponent].concat(componentsList),
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    UIRouterModule.forRoot({ states: states, useHash: true, config: uiRouterConfigFn })
  ],
  providers: [].concat(servicesList).concat(sharedServicesList),
  bootstrap: [AppComponent]
})
export class AppModule {}