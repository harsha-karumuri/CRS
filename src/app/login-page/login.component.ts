import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CrsServiceService } from '../shared/crs-service.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true;
  public error: string = '';

  constructor(public router: Router, public crsservice: CrsServiceService) {}

  loginForm = new FormGroup({
    uid: new FormControl('', [
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(7),
      Validators.pattern('[0-9]*')
    ]),
    pwd: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z]{3}@[0-9]{3}')
    ])
  });

  userLogin() {
    this.crsservice
      .login(
        this.loginForm.controls.uid.value,
        this.loginForm.controls.pwd.value
      )
      .subscribe(
        result => {
          const studentData = JSON.parse(JSON.stringify(result)).studentData
            .data;
          console.log(studentData);
          this.router.navigate(['/home']);
        },

        error => {
          this.error = error.error.error.errorMessage;
          console.log(this.error, error.error);
        }
      );
  }
}
