import { Component } from '@angular/core';

import { WebService } from './web.service';

@Component({
    selector: 'user',
    template: `
        <mat-card class="card">
            <mat-form-field style="width: 50%;">
                <input matInput placeholder="FirstName" [(ngModel)]="model.firstName"/>
            </mat-form-field>
            <mat-form-field style="width: 50%;">
                <input matInput placeholder="LastName" [(ngModel)]="model.lastName"/>
            </mat-form-field>
            <br/>
            <button mat-raised-button color="primary" (click)="saveUser(model);" >Save Changes</button>
        </mat-card>
    `
})

export class UserComponent {

    model = {
        firstName: '',
        lastName: ''
    }

    constructor(private webService: WebService) { }

    saveUser(model) {
        this.webService.saveUser(model).subscribe();
    }

    ngOnInit() {
        this.webService.getUser().subscribe(res => {
            this.model.firstName = res.firstName;
            this.model.lastName = res.lastName;
        });
    }

}