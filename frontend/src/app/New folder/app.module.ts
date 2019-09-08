import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCardModule, MatInputModule, MatCheckboxModule,
  MatSnackBarModule, MatToolbarModule, MatDialogModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MessagesComponent } from './messages.component';
import { AppComponent } from './app.component';
import { WebService } from './web.service';
import { NewMessageComponent } from './new-message.component';
import { NavComponent } from './nav.component';
import { LoginComponent } from './login.component';
import { HomeComponent } from './home.component';
import { RegisterComponent } from './register.component';
import { AuthService } from './auth.service';
import { UserComponent } from './user.component';
import { PopupComponent } from './PopUp/popup.component';
import { CheckIFexisted } from './CheckIFexisted';

const routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'messages',
    component: MessagesComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'messages/:name',
    component: MessagesComponent
  },
  {
    path: 'Popup',
    component: PopupComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }];



@NgModule({
  imports: [
    BrowserModule, HttpModule, FormsModule,
    RouterModule.forRoot(routes), BrowserAnimationsModule, MatButtonModule, MatCardModule, MatCheckboxModule,
    MatInputModule, MatSnackBarModule, MatToolbarModule, MatDialogModule, ReactiveFormsModule
  ],
  declarations: [
    AppComponent, MessagesComponent, NewMessageComponent, PopupComponent,
    NavComponent, HomeComponent, RegisterComponent, LoginComponent, UserComponent
  ],
  bootstrap: [AppComponent],
  providers: [WebService, AuthService, CheckIFexisted]
})

export class AppModule { }
