export interface IAddress {
    id: number;
    street1: string;
    street2: string;
    city: string;
    state: string;
    zip: string;
    latitude: number;
    longitude: number;
    isPrimary: boolean;
    isActive: boolean;
}