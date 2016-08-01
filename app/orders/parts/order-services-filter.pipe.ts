import { PipeTransform, Pipe } from 'angular2/core';
import { IOrder } from '../order';

@Pipe({
    name: 'orderTypeFilter'
})
export class OrderTypeFilterPipe implements PipeTransform {

    transform(value: any[], args: string[]): any[] {
        let type: string = args && args[0] ? args[0] : null;

        if (!value || value.length == 0) return value;

        // Filter out the completely cancelled orders
        var filtered: any[] = value.filter(this._checkRow, type);

        return filtered;
    }

    private _checkRow(row: any): boolean {
        if (row.order_type_id == this) return true;
        else return false;
    }
}