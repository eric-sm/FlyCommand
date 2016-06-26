import { Component, Input, Output, EventEmitter } from 'angular2/core';

@Component({
    selector: 'fcc-customer-menu',
    templateUrl : 'app/customers/shared/customer-menu.component.html',
    styleUrls: ['app/customers/shared/customer-menu.component.css']
})
export class CustomerMenuComponent {
    @Input() customerId: number;
    @Input() orderId: number;
    @Output() notifyShowCancelled: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() notifyOrderFilter: EventEmitter<string> = new EventEmitter<string>();
    showCancelled: boolean = false;
    showOrderFilter: boolean = false;
    orderNumberFilter: string;

    constructor() {}

    toggleCancelled(): void {
        this.showCancelled = !this.showCancelled;
        this.notifyShowCancelled.emit(this.showCancelled);
    }

    toggleOrderFilter() {
        this.showOrderFilter = !this.showOrderFilter;
    }

    sendOrderFilter() {
        this.notifyOrderFilter.emit(this.orderNumberFilter);
    }
}