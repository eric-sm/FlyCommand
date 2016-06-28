import { Component, OnInit } from 'angular2/core';
import { Subscription } from 'rxjs/Subscription';
import { ROUTER_DIRECTIVES, RouteParams } from 'angular2/router';
import { CustomerService } from './customer.service';
import { ICustomer } from './customer';
import { PhoneNumberFormatPipe } from '../shared/phone-number-format.pipe';


@Component({
    templateUrl: 'app/customers/customer-search.component.html',
    styleUrls: ['app/customers/customer.component.css'],
    pipes: [PhoneNumberFormatPipe],
    directives: [ROUTER_DIRECTIVES]
})
export class CustomerSearchComponent {
    searchTerm: string;
    searchSubscription: Subscription;
    results: ICustomer[];
    recentlyViewed: ICustomer[];
    recentSearches: string[];


    constructor(private _customerService: CustomerService, 
            private _routeParams: RouteParams) {
    }

    runSearch(): void {
        // Cancel any prior search
        if (this.searchSubscription) this.searchSubscription.unsubscribe();

        this.searchSubscription = this._customerService.getCustomersBySearch(this.searchTerm)
            .subscribe(results => (this.results = results)   
        );

        return;
    }


    // Run search on screen load either from the URL parameters or the last search, if any
    ngOnInit(): void {
        if (this._routeParams.get('searchTerm')) {
            this.searchTerm = this._routeParams.get('searchTerm');
            this.runSearch();
        } else {
            this.searchTerm = this._customerService.getLastCustomerSearch();
            if (this.searchTerm && this.searchTerm.length > 1) this.runSearch();
        }

        this.recentlyViewed = this._customerService.getRecentChoices();
        this.recentSearches = this._customerService.getRecentSearches();
    }
}