import {Component} from '@angular/core';

@Component({
    template: require('./app.component.pug')(),
    styles: [require('./app.component.styl').toString()],
    selector: 'app',
})
export class AppComponent {

    constructor () {}

}