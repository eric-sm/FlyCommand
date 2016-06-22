import { PipeTransform, Pipe } from 'angular2/core';

@Pipe({
    name: 'phone'
})
export class PhoneNumberFormatPipe implements PipeTransform {

    transform(value: string, args: string[]): string {
        let phoneNumber: string = value;

        if (phoneNumber && phoneNumber.length > 0) {
            // Remove the + international dialer prefix
            if (phoneNumber.startsWith('+')) {
                phoneNumber = phoneNumber.substr(1);
            }
            // Remove the 1 USA international country code
            if (phoneNumber.startsWith('1')) {
                phoneNumber = phoneNumber.substr(1);
            }
            // Add the () for the (xxx) area code format and the - for common US formatting
            phoneNumber = '(' + phoneNumber.substr(0,3) + ') ' 
                    + phoneNumber.substr(3,3) + '-' + phoneNumber.substr(6); 
        }

        return phoneNumber;
    }
} 