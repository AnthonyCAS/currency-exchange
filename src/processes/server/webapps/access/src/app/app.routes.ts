import { Injector } from "@angular/core";
import { Routes } from '@angular/router';
import { UIRouter } from "@uirouter/angular";
import { LoginComponent, RegisterComponent } from './components';

export var states = [
  { name: 'login', url: '/login', component: LoginComponent },
  { name: 'register', url: '/register', component: RegisterComponent },
];


export function uiRouterConfigFn(router: UIRouter, injector: Injector) {
  router.urlService.rules.otherwise({ state: 'login' });
}