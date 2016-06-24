import { Component, OnInit } from 'angular2/core';
import { Subscription } from 'rxjs/Subscription';
import { ROUTER_DIRECTIVES } from 'angular2/router';
import { CustomerService } from './customer.service';
import { ICustomer } from './customer';
import { PhoneNumberFormatPipe } from '../shared/phone-number-format.pipe';


@Component({
    templateUrl: 'app/customers/customer-search.component.html',
    styleUrls: ['app/customers/customer-search.component.css'],
    pipes: [PhoneNumberFormatPipe],
    directives: [ROUTER_DIRECTIVES]
})
export class CustomerSearchComponent {
    searchTerm: string;
    searchSubscription: Subscription;
    results: ICustomer[];

    constructor(private _customerService: CustomerService) {}

    runSearch(): void {
        // Cancel any prior search
        if (this.searchSubscription) this.searchSubscription.unsubscribe();

        this.searchSubscription = this._customerService.getCustomersBySearch(this.searchTerm)
            .subscribe(results => (this.results = results)   
        );

        return;
    }

    ngOnInit(): void {
        this.searchTerm = this._customerService.getLastCustomerSearch();
        if (this.searchTerm && this.searchTerm.length > 1) this.runSearch();
    }
}