import {Http, Request, Headers, Response, RequestOptionsArgs, RequestOptions} from 'angular2/http';
import { Injectable, Inject, forwardRef} from 'angular2/core';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class CustomHttp {
    private _token: string;
    private _tokenOwner: string;


    constructor(private _http: Http) {}
   

    public setToken(token: string, tokenOwner: string): void {
        this._token = token;
        this._tokenOwner = tokenOwner;
    }

    private _handleError(error: any) {
        // Handle a 401 Unauthorized by heading over to the login page.
        var baseHref = document.getElementsByTagName('base')[0].href
        if (error.status == 401) window.location.href = baseHref + 'login';

        return error;
    }

    private _addAuthorizationHeader(options?: RequestOptionsArgs): RequestOptionsArgs {
        if (options && options.headers) {
             options.headers.append('Authorization', 'Token ' + this._token);
             options.headers.append('Identity', 'Email ' + this._tokenOwner);
             return options;
        }
        else if (options) {
            let headers = new Headers();
            headers.append('Authorization', 'Token ' + this._token);
            headers.append('Identity', 'Email ' + this._tokenOwner);
            options.headers = headers;
            return options;
        }
        else {
            let headers = new Headers();
            headers.append('Authorization', 'Token ' + this._token);
            headers.append('Identity', 'Email ' + this._tokenOwner);
            return {headers: headers};
        }
    }

    // Wrappings for each of the methods in the base Http class definition
    // with the authorization headers added
    public request(url: string | Request, options?: RequestOptionsArgs) {
        return this._http.request(url, options);
    }

    public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this._http.get(url, this._addAuthorizationHeader(options))       
                // TODO: remove: .do((response: Response) => { this._checkAuth(url, response) }) // Redirect on 401 (Unauthorized)
                .catch(this._handleError);
        
    }

    public post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {  
        return this._http.post(url, body, this._addAuthorizationHeader(options));
    }

    public put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this._http.put(url, body, this._addAuthorizationHeader(options));
    }

    public patch(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {  
        return this._http.patch(url, body, this._addAuthorizationHeader(options));
    }

    public delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this._http.delete(url, this._addAuthorizationHeader(options));
    }
    
    public head(url: string, options?: RequestOptionsArgs): Observable<Response>{
        return this._http.head(url, this._addAuthorizationHeader(options));
    }
}