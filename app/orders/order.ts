
export interface IOrder {
    id: number;
    services: string[];
    status: string;
    pickup: string;
    delivery: string;
    pickupTruck: string;
    price: number;
    overallRating: number;
}