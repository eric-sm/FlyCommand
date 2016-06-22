import { IAddress } from './address';

export interface ICustomer {
    id: number;
    nameFirst: string;
    nameLast: string;
    email: string; 
    phone: string;
    addresses: IAddress[];
    appVersion: string;
    deviceType: string;
    accountCreated: Date;
    creditBalance: number;

    isFacebookConnected: boolean;
}