import { Component, OnInit, Input } from 'angular2/core';
import { RouteParams } from 'angular2/router';
import { CustomerService } from '../customer.service';
import { ICustomer } from '../customer';
import { IAddress } from '../address';

@Component({
    selector: 'fcc-customer-profile',
    templateUrl : 'app/customers/shared/customer-profile.component.html',
    styleUrls: ['app/customers/customer.component.css']
})
export class CustomerProfileComponent {
    @Input() customerId: number;
    nameFirst: string;
    nameLast: string;
    phone: string;
    addresses: IAddress[];
    appVersion: string;
    deviceType: string;
    accountCreated: Date;
    creditBalance: number;
    isFacebookConnected: boolean;


    constructor(private _customerService: CustomerService) {}

    ngOnInit(): void {
        this._customerService.getProfile(this.customerId)
            .subscribe(customer => (
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