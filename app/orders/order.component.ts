import { Component } from 'angular2/core';
import { RouteParams } from 'angular2/router';

@Component({
    templateUrl : 'app/orders/order.component.html',
})
export class OrderComponent {
    id: number = 377590;

    constructor(private _routeParams: RouteParams) {
        let id = +this._routeParams.get('orderId');
        this.id = id;
    }
}