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
    events: any[];

    constructor(private _orderService: OrderService) {}

    ngOnInit():void {
        this._orderService.getOrderEvents(this.order.id)
            .subscribe(events => this.events = events);
    }
}