import {Component, Inject, OnInit, Input, OnChanges} from '@angular/core';
import {
    ModalService
} from '../../services';
import {StateService} from '@uirouter/angular';

@Component({
    selector: 'shc-modal',
    template: require('./template.pug')(),
    styles: [require('./styles.styl').toString()]
})
export class ModalComponent implements OnInit, OnChanges {

    // Attributes
    @Input() id: string;
    @Input() title: string;
    modalService: ModalService;
    isOpen: boolean;
    
    // Methods
    constructor (
        modalService: ModalService
    ) {
        this.modalService = modalService;
    }

    show () {
        this.isOpen = true;
    }
    
    hide () {
        this.isOpen = false;
    }
    
    ngOnInit () {
        this.modalService._setupCallbacks(
            this.id, 
            () => {
                this.show();
            }, () => {
                this.hide();
            }
        )
    }

    ngOnChanges () {}

}