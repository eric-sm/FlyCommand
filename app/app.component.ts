import { Component, OnInit } from 'angular2/core';
import { ROUTER_DIRECTIVES, RouteConfig, Router } from 'angular2/router';
import './rxjs-operators';

import { GlobalService } from './app.service';
import { OrderService } from './orders/order.service';
import { CustomerService } from './customers/customer.service';

import { CustomerComponent } from './customers/customer.component';
import { CustomerSearchComponent } from './customers/customer-search.component';


@Component({
    selector: 'fcc-app',
    templateUrl : 'app/app.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [GlobalService, OrderService, CustomerService]
})
@RouteConfig([
    {path: 'customers', name: 'Customers', component: CustomerSearchComponent}, 
    {path: 'customer-search/:searchTerm', name: 'CustomerSearch', component: CustomerSearchComponent}, 
    {path: 'customer/:customerId', name: 'Customer', component: CustomerComponent}
])
export class AppComponent {
    showMenu: boolean = false;


    toggleMenu(): void {
        if (window.innerWidth < 992)
            this.showMenu = !this.showMenu;
    }
    closeMenu(): void {
        this.showMenu = false;
    }

    softCloseMenu() {
        if (window.innerWidth < 992) this.closeMenu();
    }

    setupMenu(screenWidth: number): void {
        if (screenWidth >= 992) this.showMenu = true;
        else this.showMenu = false;
    }

    onResize(event) {
        this.setupMenu(event.target.innerWidth);
    }

    ngOnInit(): void {
        this.setupMenu(window.innerWidth);
    };
}


