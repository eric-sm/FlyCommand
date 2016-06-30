import { Component, Input } from 'angular2/core';
import { RouteParams } from 'angular2/router';
import { IOrder } from './order';
import { OrderServicesComponent } from './parts/order-services.component';

@Component({
    selector: 'fcc-customer-order',
    templateUrl : 'app/orders/order.component.html',
    styleUrls: ['app/orders/order.component.css'], 
    directives: [OrderServicesComponent]
})
export class OrderComponent {
    @Input() customerId: number;
    @Input() order: IOrder = <IOrder>{};
    @Input() orderPart: string;
}