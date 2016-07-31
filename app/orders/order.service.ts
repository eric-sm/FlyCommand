import { Injectable } from 'angular2/core';
import { GlobalService } from '../app.service';
import { IOrder } from './order';
import { ISubOrder } from './suborder'
import { IOrderService } from './parts/order-service';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';


@Injectable()
export class OrderService {
    private _ordersUrl: string;
    private _orderListCache = [];

    constructor(private _http: Http, private _globalService: GlobalService) {};

    public getOrders(customerId: number, skipCache: boolean = false): Observable<IOrder[]> {
        var ordersUrl: string = this._globalService.flyCommandUrl + 'orders';
        ordersUrl += '?json={"consumer_id":' + customerId + '}';

        if (!skipCache 
                && this._orderListCache[customerId]
                && (new Date().getTime() - this._orderListCache[customerId].cacheTime) < this._globalService.cacheTimeCustomerOrderList) {
            console.debug('Using cache for order list for customer ' + customerId);
            console.debug('Cache expires in ' + (this._globalService.cacheTimeCustomerOrderList - (new Date().getTime() - this._orderListCache[customerId].cacheTime)) + 'ms');
            return Observable.of(this._orderListCache[customerId].orders);
        }
        else return this._http.get(ordersUrl)
            .map(this._extractOrderList)
            .do(orders => this._orderListCache[customerId] = {'orders': orders, 'cacheTime': new Date().getTime()});
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
                    if (service.delivery_date && service.delivery_date.length > 0) 
                            suborder.delivery_date = new Date(service.delivery_date);

                    order.services.push(suborder);
                }
            }
            orders.push(order);
        }
        
        return orders;
    }    

    public getOrderServices(orderId: number): Observable<IOrderService[]> {
        var orderUrl: string = this._globalService.flyCommandUrl + 'order_services';
        orderUrl += '?json={"order_id":' + orderId + '}';

        return this._http.get(orderUrl)
            .map(this._extractOrderServices);
    }

    private _extractOrderServices(response: Response): IOrderService[] {
        let body = response.json();
        var services: IOrderService[] = [];

        return services;
    }
}