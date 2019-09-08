import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

@Injectable()

export class AuthService {
    BASE_URL = 'http://localhost:38268/auth';
    Name_Key = 'Name';
    Token_Key = 'token';

    constructor(private http: Http, private router: Router) { }

    get Name() {
        return localStorage.getItem(this.Name_Key);
    }

    get isAuthenticated() {
        return !!localStorage.getItem(this.Token_Key);
    }

    get tokenHeader() {
        const header = new Headers({ 'Authorized': 'Bearer ' + localStorage.getItem(this.Token_Key) });
        return new RequestOptions({ headers: header });
    }

    login(loginData) {
        this.http.post(this.BASE_URL + '/login', loginData).subscribe(res => {
            this.authenticate(res);
        });
    }

    register(user) {
        delete user.ConfirmPassword;
        this.http.post(this.BASE_URL + '/register', user).
            subscribe(res => {
                this.authenticate(res);
            });
    }

    authenticate(res) {
        const authRespond = res.json();

        if (!authRespond.token) {
            return;
        }
        localStorage.setItem(this.Token_Key, authRespond.token);
        localStorage.setItem(this.Name_Key, authRespond.firstName);
        this.router.navigate(['/']);
    }

    logout() {
        localStorage.removeItem(this.Name_Key);
        localStorage.removeItem(this.Token_Key);
    }
}
