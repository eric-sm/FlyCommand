import { Injectable } from 'angular2/core';
import { GlobalService } from '../app.service';
import { IOrder } from './order';
import { ISubOrder } from './suborder'
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class OrderService {
    private _ordersUrl;

    constructor(private _http: Http, private _globalService: GlobalService) {};

    public getOrders(customerId: number): Observable<IOrder[]> {
        var ordersUrl: string = this._globalService.getBaseUrl() + 'orders';
        ordersUrl += '?json={"consumer_id":' + customerId + '}';

        return this._http.get(ordersUrl)
            .map(this._extractOrderList);
    };

    public getOrder(customerId: number, orderId: number) {
        var orderUrl: string = this._globalService.getBaseUrl() + 'order';
        orderUrl += '?json={"consumer_id":' + customerId + ', "order_id":' + orderId + '}';

        return this._http.get(orderUrl)
            .map(this._extractOrder);
    }


    private _extractOrder(response: Response): IOrder {
        let body = response.json();
        
        var order: IOrder = <IOrder>{};
        order.id = body.id;

        return order;
    }
    
    private _extractOrderList(response: Response): IOrder[] {
        let body = response.json();
        var orders: IOrder[] = [];

        // Process the response
        for (var item of body) {
            var order: IOrder = <IOrder>{};
            order.id = item.id;
            order.pickup_date = new Date(item.pickup_date);
            order.overallRating = item.avg_rating;

            // Process the suborders/services
            order.services = [];
            if (item.services) {
                for (var service of item.services) {
                    var suborder: ISubOrder = <ISubOrder>{};
                    suborder.id = service.id;
                    suborder.type = service.type;
                    suborder.status = service.status;
                    suborder.delivery_date = new Date(service.delivery_date);

                    order.services.push(suborder);
                }
            }
            orders.push(order);
        }
        
        return orders;
    }
}