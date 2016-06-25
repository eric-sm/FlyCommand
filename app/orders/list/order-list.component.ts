import { Component, OnInit, Input } from 'angular2/core';
import { IOrder } from '../order';
import { ROUTER_DIRECTIVES } from 'angular2/router';
import { OrderNumberFilterPipe } from './order-number-filter.pipe';
import { CancelledOrdersFilterPipe } from './cancelled-orders-filter.pipe';
import { StarComponent } from '../../shared/star.component';
import { OrderService } from '../order.service';

@Component({
    selector: 'fcc-order-list',
    templateUrl : 'app/orders/list/order-list.component.html',
    styleUrls: ['app/orders/list/order-list.component.css'],
    pipes: [OrderNumberFilterPipe, CancelledOrdersFilterPipe],
    directives: [StarComponent, ROUTER_DIRECTIVES]
})
export class OrderListComponent implements OnInit {
    @Input() customerId: number;
    showCancelled: boolean = true;
    exposedCancelled: boolean = false;
    orderNumberFilter: string;
    orders: IOrder[];
    errorMessage: string;

    constructor(private _orderService: OrderService) {
    }

    toggleCancelled(): void {
        this.showCancelled = !this.showCancelled;
    };

    ngOnInit(): void {
        this._orderService.getOrders(this.customerId)
            .subscribe(orders => this.orders = orders, error => this.errorMessage = <any>error);
    };
}