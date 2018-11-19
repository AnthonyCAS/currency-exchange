import { Observable } from "rxjs";
import { Injectable } from '@angular/core';

import { ResourcesService } from "./Resources";
import { Data } from "./Data";

@Injectable()
export class CurrentUserService {

    // Attributes
    private currentUserData: any;
    private roles: any[];

    // Methods
    constructor (
        private resources: ResourcesService, private dataService: Data,
    ) {

    }

    public logout () {
        return new Observable ((observer) => {
            this.dataService.set('sessionId', null);
            observer.next();
            observer.complete();
        });
    }

}