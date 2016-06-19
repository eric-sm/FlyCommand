import { Component } from 'angular2/core';
import { OrderListComponent } from '../orders/list/order-list.component';


@Component({
    templateUrl : 'app/customers/customer.component.html',
    directives: [OrderListComponent]
})
export class CustomerComponent {
    nameFirst: string = 'J Eric';
    nameLast: string = 'Small';
}