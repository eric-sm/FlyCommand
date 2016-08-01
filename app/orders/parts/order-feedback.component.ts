import { Component, Input, OnInit } from 'angular2/core';
import { IOrder } from '../order';
import { IOrderService } from './order-service';
import { OrderService } from '../order.service';
import { StarComponent } from '../../shared/star.component';


@Component({
    selector: 'fcc-order-feedback',
    templateUrl: 'app/orders/parts/order-feedback.component.html',
    directives: [StarComponent]
})
export class OrderFeedbackComponent implements OnInit {
    @Input() order: IOrder;
    feedbacks: any;

    constructor(private _orderService: OrderService) {}

    ngOnInit():void {
        this._orderService.getOrderFeedback(this.order.id)
            .subscribe(feedbacks => this.feedbacks = feedbacks);
    }
}