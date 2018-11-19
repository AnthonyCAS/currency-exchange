import { Injectable, Inject } from '@angular/core';
import { Http, Response, Request } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Data } from './Data';

@Injectable()
export class ResourcesService {

    // Attributes
    $http: Http;
    data: Data;
    domain: string;
    sessionId: string;

    // Methods
    constructor ($http: Http, data: Data) {
        this.$http = $http;
        this.data = data;
        this.domain = window.location.origin;
        this.sessionId = this.data.get('sessionId') || '';
    }

    private processUrl (url: string, params: any) {
        if (!params) params = {};
            var urlParams = (url.match(/\:([a-zA-Z])+/g) || []);
            urlParams.forEach(function(param) {
            param = param.substring(1,param.length);
            if (!params[param]) {
                url = url.replace(':'+param+'/', '');
                url = url.replace(':'+param, '');
                return;
            }
            url = url.replace(':'+param, params[param]);
        });
        return url;
    }

    private resolveRequest (data: { url: string, method: string, body?: any, query?: any, urlParams?: any }) {
        data.query = data.query || {};
        if (this.sessionId) {
            data.query['_sid_'] = this.sessionId;
        }
        var fUrl = this.processUrl(data.url, data.urlParams || {});
        fUrl = this.domain + fUrl;
        if (data.query && Object.keys(data.query).length) {
            fUrl += '?' + Object.keys(data.query).map((k) => {
                return k+'='+data.query[k];
            }).join('&');
        }
        return this.$http.request(fUrl, {
            method: data.method,
            body: (data.body || {}),
        });
    }

    private setResponseInCache (reqData: {url: string, method: string}, data) {
        var key = 'resp-' + this.sessionId + '-' + reqData.method + '-' + reqData.url;
        this.data.setObject(key, data);
    }
    
    private getResponseFromCache (reqData: {url: string, method: string}) {
        var key = 'resp-' + this.sessionId + '-' + reqData.method + '-' + reqData.url;
        var resp = (this.data.getObject(key) || {
            status: -1,
            body: {}
        });
        if (resp._body) {
            resp.body = JSON.parse(resp._body);
        }
        return resp;
    }

    private setRequestToPendingList (reqData) {
        var key = 'req-' + this.sessionId + '-' + reqData.method + '-' + reqData.url;
        var currentList = this.data.getObject(key) || [];
        currentList.push(reqData);
        this.data.setObject(key, currentList);
    }

    private getRequestsPendingList (reqData) {
        var key = 'req-' + this.sessionId + '-' + reqData.method + '-' + reqData.url;
        return this.data.getObject(key) || [];
    }

    private ensureRequestIsSolved (data: { url: string, method: string, body?: any, query?: any, urlParams?: any }) {
        return new Observable((observer) => {
            // App is online
            if (navigator.onLine) {
                this.resolveRequest(data).subscribe((resp) => {
                    if (data.method.toLowerCase() == 'get') {
                        this.setResponseInCache({
                            method: data.method,
                            url: data.url,
                        }, resp);
                    }
                    observer.next(resp);
                    observer.complete();
                }, (resp) => {
                    observer.error(resp);
                    observer.complete();
                });
                return;
            }
            // App is offline
            if (data.method.toLowerCase() == 'get') {
                var resp = this.getResponseFromCache({
                    method: data.method,
                    url: data.url,
                });
                resp.json = () => {
                    return resp.body
                }
                if (Math.floor(resp.status / 100) == 2) {
                    observer.next(resp);
                    observer.complete();
                    return;
                }
                observer.error(resp);
                observer.complete();
                return;
            }
            this.setRequestToPendingList(data);
            observer.next({
                status: 100,
                body: {},
                json: () => { return {}; }
            });
            observer.complete();
        });
    }

    public registerPersonWithEmailPassword (userData, password) {
        return new Observable((observer) => {
            this.resolveRequest({
                url: '/auth/register-person-with-email-password',
                method: 'POST',
                body: {
                    email: userData.email,
                    password: password,
                }
            }).subscribe((resp) => {
                var data = resp.json();
                this.sessionId = data.session._id;
                this.data.set('sessionId', this.sessionId);
                observer.next(data);
                observer.complete();
            }, (resp) => {
                observer.error(resp);
                observer.complete();
            });
        });
    }

    public loginUsingEmailPassword (email, password) {
        return new Observable((observer) => {
            this.resolveRequest({
                url: '/auth/login-with-email-password',
                method: 'POST',
                body: {
                    email: email,
                    password: password,
                }
            }).subscribe((resp) => {
                var data = resp.json();
                this.sessionId = data.session._id;
                this.data.set('sessionId', this.sessionId);
                observer.next(data);
                observer.complete();
            }, (resp) => {
                observer.error(resp);
                observer.complete();
            });
        });
    }

    public logout () {
        this.sessionId = undefined;
    }

    public getCurrencyRate (base: string, symbols: string) {
        return this.ensureRequestIsSolved({
            method: 'GET',
            url: '/api/latest/:base/:symbols',
            urlParams: {
                base: base,
                symbols: symbols
            }
        }).map((resp: any) => { return resp.json(); });
    }

}