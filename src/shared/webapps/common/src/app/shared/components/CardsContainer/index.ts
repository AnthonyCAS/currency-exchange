import {Component, Inject, OnInit, Input} from '@angular/core';
import {StateService} from '@uirouter/angular';

@Component({
    selector: 'cards-container',
    template: require('./template.pug')(),
    styles: [require('./styles.styl').toString()]
})
export class CardsContainerComponent implements OnInit {

    // Attributes
    
    // Methods
        constructor () {
            
        }

        ngOnInit () {

        }

}