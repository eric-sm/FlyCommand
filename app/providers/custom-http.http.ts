import {Http, Request, Headers, Response, RequestOptionsArgs, RequestOptions} from 'angular2/http';
import { Injectable, Inject, forwardRef} from 'angular2/core';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class CustomHttp {
    token: string = '0c514dd7b7e8fa4d62283491574d359ea730cdaf';
    tokenOwner: string = 'eric@flycleaners.com';


    constructor(private http: Http) {}

    public setToken(token: string, tokenOwner: string): void {
        this.token = token;
        this.tokenOwner = tokenOwner;
    }

    public unsetToken(): void {
        this.token = '';
        this.tokenOwner = '';
    }

    private _addAuthorizationHeader(options?: RequestOptionsArgs): RequestOptionsArgs {
        if (options && options.headers) {
             options.headers.append('Authorization', 'Token ' + this.token);
             options.headers.append('Identity', 'Email ' + this.tokenOwner);
             return options;
        }
        else if (options) {
            let headers = new Headers();
            headers.append('Authorization', 'Token ' + this.token);
            headers.append('Identity', 'Email ' + this.tokenOwner);
            options.headers = headers;
            return options;
        }
        else {
            let headers = new Headers();
            headers.append('Authorization', 'Token ' + this.token);
            headers.append('Identity', 'Email ' + this.tokenOwner);
            return {headers: headers};
        }
    }

    // Wrappings for each of the methods in the base Http class definition
    // with the authorization headers added
    public request(url: string | Request, options?: RequestOptionsArgs) {
        return this.http.request(url, options);
    }

    public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.http.get(url, this._addAuthorizationHeader(options))
    }

    public post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {  
        return this.http.post(url, body, this._addAuthorizationHeader(options));
    }

    public put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.http.put(url, body, this._addAuthorizationHeader(options));
    }

    public patch(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {  
        return this.http.patch(url, body, this._addAuthorizationHeader(options));
    }

    public delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.http.delete(url, this._addAuthorizationHeader(options));
    }
    
    public head(url: string, options?: RequestOptionsArgs): Observable<Response>{
        return this.http.head(url, this._addAuthorizationHeader(options));
    }
}