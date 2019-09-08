import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from './auth.service';
import { PopupComponent } from './PopUp/popup.component';
import { CheckIFexisted } from './CheckIFexisted';

@Component({
    selector: 'nav',
    template: `
        <mat-toolbar color="primary">
            <button mat-button routerLink="/" >Message Board</button>
            <button mat-button routerLink="/messages" >Messages</button>
            <button *ngIf="!Status" mat-button (click)="open()">Feed your pet</button>
            <span style="flex:1 1 auto"></span>
            <button *ngIf="!auth.isAuthenticated" mat-button routerLink="/register" >Register</button>
            <button *ngIf="!auth.isAuthenticated" mat-button routerLink="/login" >Login</button>
            <button *ngIf="auth.isAuthenticated" mat-button routerLink="/user" >Wellcome {{auth.Name}}</button>
            <button *ngIf="auth.isAuthenticated" mat-button (click)="auth.logout();" >Logout</button>
        </mat-toolbar>
    `
})
export class NavComponent {
    Status = false;
    constructor(
        private auth: AuthService,
        public dialog: MatDialog,
        private Check: CheckIFexisted) {
        this.Status = Check.getStatus();
    }

    open() {
        const dialogRef = this.dialog.open(PopupComponent);
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
            this.Status = true;
            this.Check.SetStatus(this.Status);
        });
    }
}

