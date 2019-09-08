import { Component } from '@angular/core';

import { AuthService } from './auth.service';

@Component({
    selector: 'login',
    template: `
        <mat-card>
            <mat-form-field style="width: 50%;">
                <input type="email" matInput placeholder="Email" [(ngModel)]="loginData.Email"/>
            </mat-form-field>
            <mat-form-field style="width: 50%;">
                <input type="Password" matInput placeholder="Password" [(ngModel)]="loginData.Password"/>
            </mat-form-field>
            <br/>
            <button mat-raised-button color="primary" (click)="login();" >Login</button>
        </mat-card>
    `
})

export class LoginComponent {
    constructor(private auth: AuthService) {}

    loginData = {
        Email: '',
        Password: ''
    };

    login() {
        this.auth.login(this.loginData);
    }

}
