import { Component, Output } from 'angular2/core';
import {Http, Headers, Response, RequestOptions} from 'angular2/http';
import { CustomHttp } from '../providers/custom-http.http';

@Component({
    selector: 'fcc-login',
    templateUrl : 'app/login/login.component.html' 
})
export class LoginComponent {
    username: string;
    password: string;
    @Output() loggedIn: boolean = false;
    _token: string;

    constructor(private _http: Http) {}

    submit() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        
        this._http.post('http://ec2-52-23-221-11.compute-1.amazonaws.com/account/entry/', 
                JSON.stringify({'email': this.username, 'password': this.password, 'device_id': this._createGuid()}), options)
            .map((response: Response) => response.json())
            .subscribe(token_info => (
                this._token = token_info.access_token, 
                this._postLogin()
            )
        )
    }

    private _postLogin(): void {
        // Force the type of the Http object to <any> so that we can 
        // call the setToken() function of the custom Http provider 
        // used by the FlyCommand app (see providers/custom-http.http)
        // that provides for the API token/email identity 
        (<any>this._http).setToken(this._token, this.username);
        this.loggedIn = true;
    }

    public logout(): void {
    }

    private _createGuid(): string {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }
}