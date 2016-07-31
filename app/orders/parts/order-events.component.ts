import { Component, Input, OnInit } from 'angular2/core';
import { IOrder } from '../order';
import { IOrderService } from './order-service';
import { OrderService } from '../order.service';


@Component({
    selector: 'fcc-order-events',
    templateUrl: 'app/orders/parts/order-events.component.html'
})
export class OrderEventsComponent implements OnInit {
    @Input() order: IOrder;
    services: IOrderService[];

    constructor(private _orderService: OrderService) {}

    ngOnInit():void {
    }
}