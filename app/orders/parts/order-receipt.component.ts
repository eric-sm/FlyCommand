import { Component, Input, OnInit } from 'angular2/core';
import { IOrder } from '../order';
import { IOrderService } from './order-service';
import { OrderService } from '../order.service';


@Component({
    selector: 'fcc-order-receipt',
    templateUrl: 'app/orders/parts/order-receipt.component.html'
})
export class OrderReceiptComponent implements OnInit {
    @Input() order: IOrder;
    services: IOrderService[];

    constructor(private _orderService: OrderService) {}

    ngOnInit():void {
    }
}