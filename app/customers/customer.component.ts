import { Component } from 'angular2/core';
import { RouteParams } from 'angular2/router';
import { IOrder } from '../orders/order';
import { CustomerMenuComponent } from './sidebars/customer-menu.component';
import { CustomerProfileSidebarComponent } from './sidebars/customer-profile-sidebar.component';
import { CustomerOrderListComponent } from '../orders/list/order-list.component';
import { OrderComponent } from '../orders/order.component';
import { CustomerProfileComponent } from './customer-profile.component';
import { ISection } from './sidebars/customer-menu.component';


@Component({
    selector: 'fcc-customer',
    templateUrl : 'app/customers/customer.component.html',
    styleUrls: ['app/customers/customer.component.css'],
    directives: [CustomerMenuComponent, CustomerProfileSidebarComponent, CustomerOrderListComponent, 
        OrderComponent, CustomerProfileComponent]
})
export class CustomerComponent {
    customerId: number;
    order: IOrder; // Used for back-forth communication with sub-components
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
        this.filterOrderNumber = +orderNumber;
    }

    menuButtonPressed(buttonPressed: ISection): void {
        this.setActiveSection(buttonPressed.section, buttonPressed.subsection);
    }

    showSelectedOrder(order: IOrder): void {
        this.setActiveSection('Orders', 'Services');
        this.order = order;
    }

    setActiveSection(section: string, subsection: string) {
        this.activeSection = section;
        this.activeSubsection = subsection;
    }
}