import { Component, Input, OnInit } from 'angular2/core';
import { IOrder } from '../order';
import { IOrderService } from './order-service';
import { OrderService } from '../order.service';


@Component({
    selector: 'fcc-order-preferences',
    templateUrl: 'app/orders/parts/order-preferences.component.html'
})
export class OrderPreferencesComponent implements OnInit {
    @Input() order: IOrder;
    services: IOrderService[];

    constructor(private _orderService: OrderService) {}

    ngOnInit():void {
    }
}