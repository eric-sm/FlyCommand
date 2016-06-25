import { Injectable } from 'angular2/core';


@Injectable()
export class GlobalService {
    private _baseUrl: string = 'http://ec2-52-23-221-11.compute-1.amazonaws.com/FlyCommand/';

    public getBaseUrl(): string { 
        return this._baseUrl;
    }
}