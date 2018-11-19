import {Component} from '@angular/core';

declare var require: any;

@Component({
  template: require('./app.component.pug')(),
  selector: 'app',
})
export class AppComponent {
}