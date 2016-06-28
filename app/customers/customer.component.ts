import { Component } from 'angular2/core';
import { RouteParams } from 'angular2/router';
import { IOrder } from '../orders/order';
import { CustomerOrderListComponent } from '../orders/list/order-list.component';
import { CustomerMenuComponent } from './shared/customer-menu.component';
import { CustomerProfileComponent } from './shared/customer-profile.component';
import { OrderComponent } from '../orders/order.component';


@Component({
    selector: 'fcc-customer',
    templateUrl : 'app/customers/customer.component.html',
    styleUrls: ['app/customers/customer.component.css'],
    directives: [CustomerMenuComponent, CustomerProfileComponent, CustomerOrderListComponent, 
        OrderComponent]
})
export class CustomerComponent {
    customerId: number;
    order: IOrder; // Used for back-forth communication with sub-components
    activeSection: string = 'Orders';
    activeSubsection: string = 'OrderList';
    showCancelledOrders: boolean = false;
    showOrderList: boolean = true;
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

    menuButtonPressed(buttonPressed: string): void {
        switch (buttonPressed) {
            case "OrderList":
                this.setActiveSection('Orders', 'OrderList');
                this.showOrderList = true;
                break;
        
            default:
                break;
        }
    }

    showSelectedOrder(order: IOrder): void {
        this.setActiveSection('Orders', 'Services');
        this.showOrderList = false;
        this.order = order;
    }

    setActiveSection(section: string, subsection: string) {
        this.activeSection = section;
        this.activeSubsection = subsection;
    }
}