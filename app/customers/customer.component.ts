import { Component } from 'angular2/core';
import { RouteParams } from 'angular2/router';
import { CustomerOrderListComponent } from '../orders/list/order-list.component';
import { CustomerMenuComponent } from './shared/customer-menu.component';
import { CustomerProfileComponent } from './shared/customer-profile.component';


@Component({
    selector: 'fcc-customer',
    templateUrl : 'app/customers/customer.component.html',
    styleUrls: ['app/customers/customer.component.css'],
    directives: [CustomerMenuComponent, CustomerProfileComponent, CustomerOrderListComponent]
})
export class CustomerComponent {
    customerId: number;
    orderId: number; // Used for back-forth communication with the menu component
    activeSection: string = 'Orders';
    activeSubsection: string = 'OrderList';
    showCancelledOrders: boolean = false;
    filterOrderNumber: number;

    constructor(private _routeParams: RouteParams) {
        this.customerId = +this._routeParams.get('customerId');
    }

    toggleCancelledOrders(showOrNot: boolean): void {
        this.showCancelledOrders = showOrNot;
    }

    filterOrders(orderNumber: string): void {
        this.filterOrderNumber = parseInt(orderNumber);
    }

    setActiveSection(section: string, subsection: string) {
        this.activeSection = section;
        this.activeSubsection = subsection;
    }
}