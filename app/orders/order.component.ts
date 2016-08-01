import { Component, Input } from 'angular2/core';
import { RouteParams } from 'angular2/router';
import { IOrder } from './order';
import { OrderServicesComponent } from './parts/order-services.component';
import { OrderEventsComponent } from './parts/order-events.component';
import { OrderPreferencesComponent } from './parts/order-preferences.component';
import { OrderFeedbackComponent } from './parts/order-feedback.component';

@Component({
    selector: 'fcc-customer-order',
    templateUrl : 'app/orders/order.component.html',
    styleUrls: ['app/orders/order.component.css'], 
    directives: [OrderServicesComponent, OrderEventsComponent, OrderPreferencesComponent, OrderFeedbackComponent]
})
export class OrderComponent {
    @Input() customerId: number;
    @Input() order: IOrder = <IOrder>{};
    @Input() orderPart: string;

    constructor(private _routeParams: RouteParams) {}
}