import { Component, OnInit, Input } from 'angular2/core';
import { RouteParams } from 'angular2/router';
import { IOrder } from './order';
import { OrderService } from './order.service';
import { CustomerProfileComponent } from '../customers/shared/customer-profile.component';

@Component({
    selector: 'fcc-customer-order',
    templateUrl : 'app/orders/order.component.html',
    styleUrls: ['app/orders/order.component.css'],
    directives: [CustomerProfileComponent]
})
export class OrderComponent implements OnInit {
    @Input() customerId: number;
    @Input() order: IOrder = <IOrder>{};

    constructor(private _orderService: OrderService, private _routeParams: RouteParams) {}

    ngOnInit(): void {
        this._orderService.getOrder(this.customerId, this.order.id)
            .subscribe(order => this.order = order);
    };
}