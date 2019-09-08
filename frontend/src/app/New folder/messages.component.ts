import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { WebService } from './web.service';

@Component({
    selector: 'messages',
    template: `
    <div *ngFor="let message of webService.messages | async">
        <mat-card class="card">
            <mat-card-title [routerLink]="['/messages', message.owner]" style="cursor: pointer">
                {{message.owner}}
            </mat-card-title>
            <mat-card-content>{{message.text}}</mat-card-content>
        </mat-card>
    </div>
    `
})
export class MessagesComponent {
    constructor(private webService: WebService,
        private route: ActivatedRoute) { }

    ngOnInit() {
        var Owner = this.route.snapshot.params.name;
        this.webService.getMessages(Owner);
        this.webService.getUser();
    }
}