import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-popup',
    templateUrl: './popup.component.html'
})
export class PopupComponent {
    @ViewChild('food') private food: ElementRef;
    private _window: Window;
    mytag: string;
    tags = {};

    constructor(private sb: MatSnackBar) { }

    onclick() {
        if (this.food.nativeElement.value === '') {
            this.tags['nofood'] = 'no food';
            this.mytag = 'no food';
        } else {
            this.tags['food'] = this.food.nativeElement.value;
            this.mytag = this.food.nativeElement.value;
        }
        this.sendOneSignal().subscribe(res => { });
        this.sb.open(this.mytag, 'close', { duration: 2000 });
    }

    sendOneSignal() {
        const isSent = new Subject<boolean>();
        const done = this._window.setTimeout(
            () => {
                console.log('sending onesignal', this.tags);
                window.location.href = 'gonative://onesignal/tags/set?tags=' + encodeURIComponent(JSON.stringify(this.tags));
                isSent.next(true);
            },
            1000
        );
        return isSent.asObservable();

    }
}

