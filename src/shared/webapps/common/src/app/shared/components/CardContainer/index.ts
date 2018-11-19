import {Component, Inject, OnInit, Input} from '@angular/core';
import {StateService} from '@uirouter/angular';

@Component({
    selector: 'card-container',
    template: require('./template.pug')(),
    styles: [require('./styles.styl').toString()]
})
export class CardContainerComponent implements OnInit {

    // Attributes
    
    // Methods
        constructor () {
            
        }

        ngOnInit () {

        }

}