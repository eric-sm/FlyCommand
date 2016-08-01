import { Component, Input, OnInit } from 'angular2/core';
import { IOrder } from '../order';
import { IOrderService } from './order-service';
import { OrderService } from '../order.service';
import { OrderTypeFilterPipe } from './order-services-filter.pipe';


@Component({
    selector: 'fcc-order-events',
    templateUrl: 'app/orders/parts/order-events.component.html',
    styleUrls: ['app/orders/parts/order-parts.component.css'],
    pipes: [OrderTypeFilterPipe]
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