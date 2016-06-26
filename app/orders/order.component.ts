import { Component, OnInit } from 'angular2/core';
import { RouteParams } from 'angular2/router';
import { IOrder } from './order';
import { OrderService } from './order.service';
import { CustomerProfileComponent } from '../customers/shared/customer-profile.component';

@Component({
    templateUrl : 'app/orders/order.component.html',
    directives: [CustomerProfileComponent]
})
export class OrderComponent implements OnInit {
    customerId: number;
    orderId: number;
    order: IOrder = <IOrder>{};

    constructor(private _orderService: OrderService, private _routeParams: RouteParams) {
        this.customerId = +this._routeParams.get('customerId');
        this.orderId = +this._routeParams.get('orderId');
    }

    ngOnInit(): void {
        this._orderService.getOrder(this.customerId, this.orderId)
            .subscribe(order => this.order = order);
    };
}