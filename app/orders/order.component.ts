import { Component } from 'angular2/core';
import { RouteParams } from 'angular2/router';
import { CustomerProfileComponent } from '../customers/shared/customer-profile.component';

@Component({
    templateUrl : 'app/orders/order.component.html',
    directives: [CustomerProfileComponent]
})
export class OrderComponent {
    customerId: number;
    orderId: number;

    constructor(private _routeParams: RouteParams) {
        this.customerId = +this._routeParams.get('customerId');
        this.orderId = +this._routeParams.get('orderId');
    }
}