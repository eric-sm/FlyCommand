import { Component, OnInit } from 'angular2/core';
import { RouteParams } from 'angular2/router';
import { CustomerService } from '../customer.service';
import { OrderListComponent } from '../../orders/list/order-list.component';
import { ICustomer } from '../customer';

@Component({
    selector: 'fcc-customer-profile',
    templateUrl : 'app/customers/shared/customer-profile.component.html',
    directives: [OrderListComponent],
    bindings: [CustomerService]
})
export class CustomerProfileComponent {
    id: number;
    nameFirst: string;
    nameLast: string;


    constructor(private _customerService: CustomerService, 
            private _routeParams: RouteParams) {

        let id = +this._routeParams.get('customerId');
        this.id = id;
    }

    ngOnInit(): void {
        this._customerService.getProfile(this.id)
            .subscribe(customer => (this.id = customer.id, this.nameFirst = customer.nameFirst));
    }
}