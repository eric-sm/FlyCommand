import { Component } from 'angular2/core';
import { HTTP_PROVIDERS } from 'angular2/http';
import { ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig, Router } from 'angular2/router';
import './rxjs-operators';

import { CustomerProfileComponent } from './customers/shared/customer-profile.component';
import { CustomerSearchComponent } from './customers/customer-search.component';
import { OrderService } from './orders/order.service';
import { OrderListComponent } from './orders/list/order-list.component';
import { OrderComponent } from './orders/order.component';


@Component({
    selector: 'fcc-app',
    templateUrl : 'app/app.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [OrderService, HTTP_PROVIDERS, ROUTER_PROVIDERS]
})
@RouteConfig([
    {path: '/customers/', name: 'Customers', component: CustomerSearchComponent}, 
    {path: '/customer/:customerId/', name: 'Customer', component: CustomerProfileComponent}, 
    {path: '/order/:orderId/', name: 'Order', component: OrderComponent}
])
export class AppComponent {
    showMenu: boolean = true;

    constructor(private _router: Router) {}

    home(): void {
        this._router.navigate(['Start']);
    }

    toggleMenu(): void {
        this.showMenu = !this.showMenu;
    }

    closeMenu(): void {
        this.showMenu = false;
    }
}


