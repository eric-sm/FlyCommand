import { Injectable } from 'angular2/core';
import { IOrder } from './order';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class OrderService {
    private _ordersUrl = 'http://ec2-52-23-221-11.compute-1.amazonaws.com/FlyCommand/order';

    constructor(private _http: Http) {};

    getOrders(customerId: number): Observable<IOrder[]> {
        return this._http.get(this._ordersUrl)
            .map((response:Response) => <IOrder[]>response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this._handleError);
    };

    private _handleError(error:Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server Error');
    }

}