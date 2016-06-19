import { Component } from 'angular2/core';
import { HTTP_PROVIDERS } from 'angular2/http';
import { ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig, Router } from 'angular2/router';
import 'rxjs/Rx'; // Load all features

import { CustomerComponent } from './customers/customer.component';
import { CustomerListComponent } from './customers/list/customer-list.component';
import { OrderService } from './orders/order.service';
import { OrderListComponent } from './orders/list/order-list.component';
import { OrderComponent } from './orders/order.component';


@Component({
    selector: 'fcc-app',
    templateUrl : 'app/app.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [OrderService, HTTP_PROVIDERS,ROUTER_PROVIDERS]
})
@RouteConfig([
    {path: '/customers/', name: 'Customers', component: CustomerListComponent}, 
    {path: '/customer/:customerId/', name: 'Customer', component: CustomerComponent}, 
    {path: '/order/:orderId/', name: 'Order', component: OrderComponent}
])
export class AppComponent {
    constructor(private _router: Router) {}

    home(): void {
        this._router.navigate(['Start']);
    }
}


