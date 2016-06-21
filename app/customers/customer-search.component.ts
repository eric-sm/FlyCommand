import { Component } from 'angular2/core';

@Component({
    templateUrl: 'app/customers/customer-search.component.html',
    styleUrls: ['app/customers/customer-search.component.css']
})
export class CustomerSearchComponent {
    searchTerm: string;
}