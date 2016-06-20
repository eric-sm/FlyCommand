import { Component, OnInit } from 'angular2/core';
import { RouteParams } from 'angular2/router';
import { CustomerService } from '../customer.service';
import { OrderListComponent } from '../../orders/list/order-list.component';
import { ICustomer } from '../customer';
import { IAddress } from '../address';

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
    phone: string;
    addresses: IAddress[];
    appVersion: string;
    deviceType: string;
    accountCreated: Date;
    creditBalance: number;
    isFacebookConnected: boolean;


    constructor(private _customerService: CustomerService, 
            private _routeParams: RouteParams) {

        let id = +this._routeParams.get('customerId');
        this.id = id;
    }

    ngOnInit(): void {
        this._customerService.getProfile(this.id)
            .subscribe(customer => (
                this.id = customer.id, 
                this.nameFirst = customer.nameFirst,
                this.nameLast = customer.nameLast,
                this.phone = customer.phone,
                this.addresses = customer.addresses,
                this.appVersion = customer.appVersion,
                this.deviceType = customer.deviceType,
                this.accountCreated = customer.accountCreated,
                this.creditBalance = customer.creditBalance,
                this.isFacebookConnected = customer.isFacebookConnected
            )   
        );
    }
}