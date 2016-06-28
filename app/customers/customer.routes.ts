import { RouteConfig } from 'angular2/router';
import { CustomerComponent } from './customer.component';
import { CustomerSearchComponent } from './customer-search.component';

export const CustomerRoutes: RouteConfig = [
    {path: 'customers', name: 'Customers', component: CustomerSearchComponent}, 
    {path: 'customer-search/:searchTerm', name: 'CustomerSearch', component: CustomerSearchComponent}, 
    {path: 'customer/:customerId', name: 'Customer', component: CustomerComponent}
];