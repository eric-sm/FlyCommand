import { Injectable } from 'angular2/core';
import { GlobalService } from '../app.service';
import { ICustomer } from './customer';
import { IAddress } from './address';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class CustomerService {
    private _customerUrl;
    private _customerSearchUrl;
    private lastCustomerSearch: string;
    private recentSearches: string[] = [];
    private recentChoices: ICustomer[] = [];


    constructor(private _http: Http, private _globalService: GlobalService) {
        this._customerUrl = _globalService.getBaseUrl() + 'customer';
        this._customerSearchUrl = _globalService.getBaseUrl() + 'customers';
    };


    public getProfile(customerId: number): Observable<ICustomer> {
        var customerUrl: string = this._customerUrl + '?json={"consumer_id":' + customerId + '}';

        return this._http.get(customerUrl)
            .map(this._extractProfileData)
            .do(customer => this.addRecentChoice(customer));
    };

    public getLastCustomerSearch(): string {
        return this.lastCustomerSearch;
    }

    public getRecentSearches(): string[] {
        return this.recentSearches;
    }

    public getRecentChoices(): ICustomer[] {
        return this.recentChoices;
    }

    public addRecentSearch(recentTerm: string): void {
        if (recentTerm && recentTerm.length > 1) {
            for(var i=0; i < this.recentSearches.length; i++) { 
                if (this.recentSearches[i].startsWith(recentTerm)) return;
            }
            this.recentSearches.push(recentTerm);
            if (this.recentSearches.length > 5) this.recentSearches.shift();
        }
    }

    public addRecentChoice(recentCustomerViewed: ICustomer): void {
        if (recentCustomerViewed) {
            for (var i=0; i < this.recentChoices.length; i++) {
                if (recentCustomerViewed.id == this.recentChoices[i].id) return;
            }
            this.recentChoices.push(recentCustomerViewed);
            if (this.recentChoices.length > 5) this.recentChoices.shift();
        }
        
        // While we're logging that a profile is being viewed, this is a good 
        // time to save the last search
        this.addRecentSearch(this.getLastCustomerSearch());
    }

    public getCustomersBySearch(searchTerm: string): Observable<ICustomer[]> {
        var customerSearchUrl: string = this._customerSearchUrl + '?json={"searchTerm":"' + searchTerm + '"}';

        this.lastCustomerSearch = searchTerm;
        
        return this._http.get(customerSearchUrl)
            .map(this._extractSearchData);
    }

    private _extractProfileData(response: Response): ICustomer {
        let body = response.json();

        var customer: ICustomer = <ICustomer>{};
        customer.id = body.id;
        customer.nameFirst = body.name_first;
        customer.nameLast = body.name_last;
        customer.phone = body.phone;
    	customer.addresses = [];
    	customer.appVersion = body.app_version;
        customer.deviceType = body.device_type;
        customer.accountCreated = body.customer_since;
        customer.creditBalance = body.credit_balance;
        customer.isFacebookConnected = body.facebook_connect ? true : false;

        return customer;
    }

    private _extractSearchData(response: Response): ICustomer[] {
        var customers: ICustomer[] = [];

        let customer_list = response.json();

        for (var item of customer_list) {
            
            var customer: ICustomer = <ICustomer>{};
            customer.id = item.id;
            customer.nameFirst = item.name_first;
            customer.nameLast = item.name_last;
            customer.email = item.email;
            customer.phone = item.phone;

            var address: IAddress = <IAddress>{}
            customer.addresses = <IAddress[]>[];
            address.id = item.address_id;
            address.street1 = item.street_address;
            address.street2 = item.street_address_2;
            address.city = item.city
            address.state = item.state;
            address.zip = item.zip;
            address.latitude = item.latitude;
            address.longitude = item.longitude;
            customer.addresses.push(address);

            customer.appVersion = null;
            customer.deviceType = null;
            customer.accountCreated = null;
            customer.creditBalance = null;
            customer.isFacebookConnected = null;

            customers.push(customer);
        }

        return customers;
    }
}