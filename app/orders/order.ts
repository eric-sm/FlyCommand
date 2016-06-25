import { ISubOrder } from './suborder';


export interface IOrder {
    id: number;
    services: ISubOrder[];
    pickup_date: string;
    price: number;
    overallRating: number;
}