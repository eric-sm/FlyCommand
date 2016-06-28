import { Component, OnInit, Input, Output, EventEmitter } from 'angular2/core';
import { IOrder } from '../order';
import { ROUTER_DIRECTIVES } from 'angular2/router';
import { OrderNumberFilterPipe } from './order-number-filter.pipe';
import { CancelledOrdersFilterPipe } from './cancelled-orders-filter.pipe';
import { StarComponent } from '../../shared/star.component';
import { OrderService } from '../order.service';

@Component({
    selector: 'fcc-customer-order-list',
    templateUrl : 'app/orders/list/order-list.component.html',
    styleUrls: ['app/orders/list/order-list.component.css'],
    pipes: [OrderNumberFilterPipe, CancelledOrdersFilterPipe],
    directives: [StarComponent, ROUTER_DIRECTIVES]
})
export class CustomerOrderListComponent implements OnInit {
    @Input() customerId: number;
    @Input() showCancelled: boolean;
    @Input() filterOrderNumber: number;
    @Output() notifySelectedOrder: EventEmitter<IOrder> = new EventEmitter<IOrder>();
    orderNumberFilter: string;
    orders: IOrder[];
    errorMessage: string;

    constructor(private _orderService: OrderService) {}

    selectOrder(order: IOrder): void {
        this.notifySelectedOrder.emit(order);
    }

    ngOnInit(): void {
        this._orderService.getOrders(this.customerId)
            .subscribe(orders => this.orders = orders, error => this.errorMessage = <any>error);
    };
}