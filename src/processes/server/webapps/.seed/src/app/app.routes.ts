import { Component, Injector } from "@angular/core";
import { UIRouter } from "@uirouter/angular";

import { AppComponent } from './app.component';

@Component({
  template: 'Redirecting...',
})
export class RedirectHomeComponent {
  constructor () {
    window.location.replace('/');
  }
}

export var states = [
  { name: 'redirectHome', url: '/home', component: RedirectHomeComponent },
];

export function uiRouterConfigFn(router: UIRouter, injector: Injector) {
  
  // If no URL matches, go to the `hello` state by default
  router.urlService.rules.otherwise({ state: 'redirectHome' });
  
}