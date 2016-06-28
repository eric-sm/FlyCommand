import { Component, Input, Output, EventEmitter, ViewChild,
     ElementRef, AfterViewChecked, Renderer } from 'angular2/core';

@Component({
    selector: 'fcc-customer-menu',
    templateUrl : 'app/customers/shared/customer-menu.component.html',
    styleUrls: ['app/customers/shared/customer-menu.component.css']
})
export class CustomerMenuComponent implements AfterViewChecked {
    @ViewChild('inputNumberFilter') inputNumberFilter: ElementRef;
    @Input() customerId: number;
    @Input() activeSection: string;
    @Input() activeSubsection: string;
    @Output() notifyButtonPressed: EventEmitter<ISection> = new EventEmitter<ISection>();
    @Output() notifyShowCancelled: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() notifyOrderFilter: EventEmitter<string> = new EventEmitter<string>();
    showCancelled: boolean = false;
    showOrderFilter: boolean = false;
    orderNumberFilter: string;

    constructor(private _renderer: Renderer) {}

    toggleCancelled(): void {
        this.showCancelled = !this.showCancelled;
        this.notifyShowCancelled.emit(this.showCancelled);
    }

    buttonPressed(section: string, subsection: string): void {
        this.notifyButtonPressed.emit({'section': section, 'subsection': subsection});
    }

    turnOnOrderFilter() {
        this.showOrderFilter = true;
    }

    turnOffOrderFilter() {
        this.showOrderFilter = false;
    }

    sendOrderFilter() {
        this.notifyOrderFilter.emit(this.orderNumberFilter);
    }

    clearOrderFilter() {
        this.orderNumberFilter = '';
        this.turnOffOrderFilter();
        this.sendOrderFilter();
    }

    ngAfterViewChecked() {
        if (this.inputNumberFilter && this.inputNumberFilter.nativeElement
                && this.showOrderFilter) {
            this._renderer.invokeElementMethod(this.inputNumberFilter.nativeElement, 'focus', []);
        }
    }
}

export interface ISection {
    section: string;
    subsection: string;
}