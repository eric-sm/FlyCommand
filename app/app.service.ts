import { Injectable } from 'angular2/core';


@Injectable()
export class GlobalService {
    public baseUrl: string = 'http://ec2-52-23-221-11.compute-1.amazonaws.com/FlyCommand/';
    public cacheTimeCustomerOrderList: number = 18000;
}