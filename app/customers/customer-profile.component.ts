import { Component, OnInit, Input } from 'angular2/core';
import { RouteParams } from 'angular2/router';

@Component({
    selector: 'fcc-customer-profile',
    templateUrl : 'app/customers/customer-profile.component.html',
    styleUrls: ['app/customers/customer-profile.component.css']
})
export class CustomerProfileComponent {
    @Input() customerId: number;
    @Input() profilePart: string;
}