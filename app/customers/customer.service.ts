import { Injectable } from 'angular2/core';
import { ICustomer } from './customer';
import { IAddress } from './address';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class CustomerService {
    private _customerUrl = 'http://ec2-52-23-221-11.compute-1.amazonaws.com/FlyCommand/customer';
    private _customerSearchUrl = 'http://ec2-52-23-221-11.compute-1.amazonaws.com/FlyCommand/customers';

    constructor(private _http: Http) {};

    public getProfile(customerId: number): Observable<ICustomer> {
        var customerUrl: string = this._customerUrl + '?json={"id":' + customerId + '}';

        return this._http.get(customerUrl)
            .map(this._extractProfileData)
            //.do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this._handleError);
    };

    public getCustomersBySearch(searchTerm: string): Observable<ICustomer[]> {
        var customerSearchUrl: string = this._customerSearchUrl + '?json={"searchTerm":"' + searchTerm + '"}';
        
        return this._http.get(customerSearchUrl)
            .map(this._extractSearchData)
            //.do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this._handleError);
    }

    private _handleError(error:Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server Error');
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

        for (var id in customer_list) {
            var item = customer_list[id];

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