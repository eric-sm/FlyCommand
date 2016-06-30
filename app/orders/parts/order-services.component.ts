import { Component, Input, OnInit } from 'angular2/core';
import { IOrder } from '../order';
import { IOrderService } from './order-service';
import { OrderService } from '../order.service';


@Component({
    selector: 'fcc-order-services',
    templateUrl: 'app/orders/parts/order-services.component.html'
})
export class OrderServicesComponent implements OnInit {
    @Input() order: IOrder;
    services: IOrderService[];

    constructor(private _orderService: OrderService) {}

    ngOnInit():void {
        this._orderService.getOrderServices(this.order.id)
            .subscribe(services => this.services);
    }
}