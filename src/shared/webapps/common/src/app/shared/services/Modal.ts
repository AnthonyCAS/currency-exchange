import {Injectable, Inject} from '@angular/core';

@Injectable()
export class ModalService {

    // Attributes
    private _cbks: any;

    // Methods
    constructor () {}
    
    _setupCallbacks (id, show, hide) {
        this._cbks = this._cbks || {};
        this._cbks[id] = {
            show: show,
            hide: hide
        }
    }

    show (id) {
        if (this._cbks && this._cbks[id] && this._cbks[id].show) {
            this._cbks[id].show();
        }
    }
    
    hide (id) {
        if (this._cbks && this._cbks[id] && this._cbks[id].hide) {
            this._cbks[id].hide();
        }
    }

}