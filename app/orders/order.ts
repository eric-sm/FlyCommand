import { ISubOrder } from './suborder';


export interface IOrder {
    id: number;
    services: ISubOrder[];
    pickup_date: Date;
    price: number;
    overallRating: number;
}