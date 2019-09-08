import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthService } from './auth.service';

@Component({
    selector: 'register',
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    form;
    @ViewChild('garden') private garden;
    checked: boolean;

    constructor(private fb: FormBuilder, private auth: AuthService) {
        this.form = fb.group({
            FirstName: ['', Validators.required],
            LastName: ['', Validators.required],
            Email: ['', [Validators.required, emailValid()]],
            Password: ['', Validators.required],
            ConfirmPassword: ['', Validators.required],
        }, { validator: matchingFields('Password', 'ConfirmPassword') });
    }

    GetValue(event) {
        event.preventDefault();
        this.checked = this.garden._checked;
        this.garden._checked = !this.garden._checked;
    }

    onSubmit() {
        console.log(this.form.errors);
        this.auth.register(this.form.value);
    }

    isValid(control) {
        return this.form.controls[control].invalid && this.form.controls[control].touched;
    }
}

function matchingFields(field1, field2) {
    return form => {
        if (form.controls[field1].value !== form.controls[field2].value) {
            return { mismatchedFields: true };
        }
    };
}

function emailValid() {
    return control => {
        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0 - 9]{ 1, 3}\.[0 - 9]{ 1, 3}\.[0 - 9]{ 1, 3}\.[0 - 9]{ 1, 3}])| (([a - zA - Z\-0 - 9] +\.) +[a - zA - Z]{ 2,})) $ /

        return regex.test(control.value) ? null : { invalidEmail: true };
    };
}
