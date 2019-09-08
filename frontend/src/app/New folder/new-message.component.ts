import { Component } from '@angular/core';
import { WebService } from './web.service';
import { AuthService } from './auth.service';

@Component({
    selector: 'new-message',
    template: `
        <mat-card class="card">
            <mat-card-content>
                <mat-form-field>
                    <textarea [(ngModel)]="message.text" matInput placeholder="Message"></textarea>
                </mat-form-field>
                <mat-card-actions>
                    <button (click)="post()" mat-button color="primary">POST</button>
                </mat-card-actions>
            </mat-card-content>
        </mat-card>
    `
})
export class NewMessageComponent {

    constructor(private webService: WebService, private auth: AuthService) { }

    message = {
        owner: this.auth.Name,
        text: ''
    };

    post() {
        this.webService.SendMessage(this.message);
    }
}
