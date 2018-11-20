import { Component, Injector } from "@angular/core";
import { UIRouter } from "@uirouter/angular";

import { AppComponent } from './app.component';
import { ExchangeComponent } from './components';

@Component({
  template: 'Redirecting...',
})
export class RedirectHomeComponent {
  constructor () {
    window.location.replace('/');
  }
}

export var states = [
  { name: 'exchange', url: '/', component: ExchangeComponent }
];

export function uiRouterConfigFn(router: UIRouter, injector: Injector) {
  router.urlService.rules.otherwise({ state: 'exchange' });
}
