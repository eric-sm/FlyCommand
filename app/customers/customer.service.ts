import { Injectable } from 'angular2/core';
import { ICustomer } from './customer';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class CustomerService {
    private _customerUrl = 'http://ec2-52-23-221-11.compute-1.amazonaws.com/FlyCommand/customer';

    constructor(private _http: Http) {};

    getProfile(customerId: number): Observable<ICustomer> {
        var customerUrl: string = this._customerUrl + '?json={"id":' + customerId + '}';

        return this._http.get(customerUrl)
            .map(this._extractData)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this._handleError);
    };

    private _handleError(error:Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server Error');
    }

    private _extractData(response: Response): ICustomer {
        let body = response.json();

        var customer: ICustomer = <ICustomer>{};
        customer.id = body.id;
        customer.nameFirst = body.name_first;
        customer.nameLast = body.name_last;
        
        return customer;
    }
}