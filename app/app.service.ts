import { Injectable } from 'angular2/core';


@Injectable()
export class GlobalService {
    public baseUrl: string = 'http://ec2-54-174-5-54.compute-1.amazonaws.com/';
    public flyCommandUrl: string = this.baseUrl + 'FlyCommand/';
    public legacyUrl: string = 'http://services.flycleaner.com/';
    public cacheTimeCustomerOrderList: number = 18000;
}