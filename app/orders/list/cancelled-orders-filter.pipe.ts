import { PipeTransform, Pipe } from 'angular2/core';
import { IOrder } from '../order';

@Pipe({
    name: 'cancelledOrdersFilter'
})
export class CancelledOrdersFilterPipe implements PipeTransform {

    transform(value: IOrder[], args: string[]): IOrder[] {
        let filterOn: string = args && args[0] ? args[0] : null;


        // Just skip the filtering and return the original array if 
        // the include Cancelled checkbox is on
        if (filterOn == 'true') return value;


        // Filter out the completely cancelled orders
        var filteredOrders = value.filter(this._checkOrder);

        return filteredOrders;
    }

    private _checkOrder(order: IOrder): boolean {
        var startingValueOfIncludeOrder: boolean = false;

        if (order.services) {
            for (var service of order.services) {
                if (service.status != "Cancelled") startingValueOfIncludeOrder = true;
            }
        }
        

        return startingValueOfIncludeOrder;
    }
}