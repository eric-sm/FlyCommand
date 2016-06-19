import { PipeTransform, Pipe } from 'angular2/core';
import { IOrder } from '../order';

@Pipe({
    name: 'orderFilter'
})
export class OrderFilterPipe implements PipeTransform {

    transform(value: IOrder[], args: string[]): IOrder[] {
        let filter: string = args && args[0] ? args[0] : null;
        return filter ? value.filter((order: IOrder) => order.id.toString().startsWith(filter)) : value;
    }
}