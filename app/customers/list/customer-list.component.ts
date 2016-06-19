import { Component } from 'angular2/core';
import { ICustomer } from '../customer';
import { ROUTER_DIRECTIVES } from 'angular2/router';
import { StarComponent } from '../../shared/star.component';

@Component({
    selector: 'fcc-customer-list',
    templateUrl : 'app/customers/list/customer-list.component.html',
    styleUrls: ['app/orders/list/order-list.component.css'],
    directives: [StarComponent, ROUTER_DIRECTIVES]
})
export class CustomerListComponent {
    showPrice: boolean = true;
    listFilter: string;
    customers: ICustomer[] = [{id:357}, {id:356}];
    errorMessage: string;

    constructor() {
    }
}