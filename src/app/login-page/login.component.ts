import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true;

  constructor(public router: Router) {
  }

  loginForm = new FormGroup({
    uid : new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(7), Validators.pattern('[0-9]*')]),
    pwd : new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]{3}\@\[0-9]{3}')]),
  });

  userLogin() {
    this.router.navigate(['/home']);
  }
}
