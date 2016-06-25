import { Component, OnChanges, Input } from 'angular2/core';

@Component({
    selector: 'ai-star',
    templateUrl : 'app/shared/star.component.html', 
    styleUrls: ['app/shared/star.component.css']
})
export class StarComponent implements OnChanges {
    @Input() rating: number;
    starWidth: number;

    ngOnChanges(): void {
        this.starWidth = Math.round(this.rating * 86 / 5);
        this.rating = Math.round(this.rating * 10) / 10;
    }
}