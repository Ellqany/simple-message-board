import { Injectable } from '@angular/core';

@Injectable()
export class CheckIFexisted {
    First = false;

    getStatus() {
        return this.First;
    }

    SetStatus(val: boolean) {
        this.First = val;
    }
}