import { Component, Input, OnInit } from 'angular2/core';
import { IOrder } from '../order';
import { IOrderService } from './order-service';
import { OrderService } from '../order.service';
import { OrderTypeFilterPipe } from './order-services-filter.pipe';


@Component({
    selector: 'fcc-order-services',
    templateUrl: 'app/orders/parts/order-services.component.html',
    styleUrls: ['app/orders/parts/order-parts.component.css'],
    pipes: [OrderTypeFilterPipe]
})
export class OrderServicesComponent implements OnInit {
    @Input() order: IOrder;
    contents: any;
    adjustments: any;

    constructor(private _orderService: OrderService) {}

    ngOnInit():void {
        this._orderService.getOrderContents(this.order.id)
            .subscribe(contents => this.contents = contents);
        this._orderService.getOrderAdjustments(this.order.id)
            .subscribe(adjustments => this.adjustments = adjustments);
    }
}