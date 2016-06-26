import { bootstrap } from 'angular2/platform/browser';
import { provide } from "angular2/core";
import { HTTP_PROVIDERS, Http, XHRBackend, RequestOptions } from 'angular2/http';
import { ROUTER_PROVIDERS } from 'angular2/router';

import { CustomHttp } from './providers/custom-http.http';
import { AppComponent } from './app.component';


export const FC_HTTP_PROVIDERS = [
    HTTP_PROVIDERS,
    provide(Http, {
        useFactory: (xhrBackend: XHRBackend, requestOptions: RequestOptions) => {
            let originalHttp = new Http(xhrBackend, requestOptions);
            return new CustomHttp(originalHttp);
        },
        deps: [XHRBackend, RequestOptions]
    })
];


bootstrap(AppComponent, [FC_HTTP_PROVIDERS, ROUTER_PROVIDERS] );