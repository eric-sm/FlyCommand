import { Component } from 'angular2/core';
import { RouteParams } from 'angular2/router';
import { OrderListComponent } from '../orders/list/order-list.component';
import { CustomerProfileComponent } from './shared/customer-profile.component';

@Component({
    selector: 'fcc-customer',
    templateUrl : 'app/customers/customer.component.html',
    styleUrls: ['app/customers/customer.component.css'],
    directives: [CustomerProfileComponent, OrderListComponent]
})
export class CustomerComponent {
    customerId: number;

    constructor(private _routeParams: RouteParams) {

        let customerId = +this._routeParams.get('customerId');
        this.customerId = customerId;
    }
}