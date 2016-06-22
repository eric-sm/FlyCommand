import { Component } from 'angular2/core';
import { CustomerService } from './customer.service';
import { ICustomer } from './customer';

@Component({
    templateUrl: 'app/customers/customer-search.component.html',
    styleUrls: ['app/customers/customer-search.component.css'],
    bindings: [CustomerService]
})
export class CustomerSearchComponent {
    searchTerm: string;
    results: ICustomer[];

    constructor(private _customerService: CustomerService) {}

    runSearch(): void {
        console.debug(this.searchTerm);

        this._customerService.getCustomersBySearch(this.searchTerm)
            .subscribe(results => (this.results = results)   
        );

        return;
    }
}