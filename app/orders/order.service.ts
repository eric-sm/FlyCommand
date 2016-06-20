import { Injectable } from 'angular2/core';
import { IOrder } from './order';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class OrderService {
    private _ordersUrl = 'http://ec2-52-23-221-11.compute-1.amazonaws.com/FlyCommand/orders';

    constructor(private _http: Http) {};

    public getOrders(customerId: number): Observable<IOrder[]> {
        var ordersUrl: string = this._ordersUrl + '?json={"consumer_id":' + customerId + '}';

        return this._http.get(ordersUrl)
            .map(this._extractData)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this._handleError);
    };
    
    private _extractData(response: Response): IOrder[] {
        let body = response.json();
        var orders: IOrder[] = [];

        // Process the response
        for (var item of body) {
            var order: IOrder = <IOrder>{};
            var services:string[] = [];
            order.id = item.order_id;
            for (var service of item.services) {
                services.push(service.order_type);
            }
            order.services = services;
            orders.push(order);
        }
        
        return orders;
    }

    private _handleError(error:Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server Error');
    }

}