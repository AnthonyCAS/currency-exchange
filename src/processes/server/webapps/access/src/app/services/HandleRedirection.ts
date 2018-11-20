import { Injectable } from '@angular/core';

@Injectable()
export class HandleRedirectionService {

    // Attributes

    // Methods
    constructor () {}

    resolveRedirection () {
        // Extract search params
        var searchParams: any = {};
        window.location.search.substring(
            1, window.location.search.length
        ).split('&').forEach(function (p) {
            searchParams[p.split('=')[0]] = p.split('=')[1];
        });

        // Setup previews state
        searchParams.prevUrl = searchParams.prevUrl || '';
        var previewsState = {
            route: decodeURIComponent(searchParams.prevUrl) || '/',
            hash: window.location.hash
        }

        // Redirect
        window.location.replace(previewsState.route);
    }

}