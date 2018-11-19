import {Component, Inject, OnInit, Input} from '@angular/core';
import {StateService} from '@uirouter/angular';

@Component({
    selector: 'shc-base',
    template: require('./template.pug')(),
    styles: [require('./styles.styl').toString()]
})
export class BaseComponent implements OnInit {

    // Attributes
    
    // Methods
        constructor () {
            
        }

        ngOnInit () {

        }

}