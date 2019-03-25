import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CrsServiceService {
  public userdetails: any;
  public loggedUser: any;
  constructor(public http: HttpClient, public router: Router) {
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    if (loggedUser) {
      this.login(loggedUser.userId, loggedUser.password).subscribe(data => {
        this.userdetails = JSON.parse(JSON.stringify(data)).studentData.data;
        console.log(12, this.userdetails);
      });
    }
  }

  public getStudentData() {
    return this.http.get(`${environment.apiUrls.getStudentData}`);
  }
  public login(userId, password) {
    return this.http.post(`${environment.apiUrls.getStudentData}/login`, {
      userId,
      password
    });
  }
  public storeInLocalStorage() {
    localStorage.setItem('loggedUser', JSON.stringify(this.loggedUser));
  }
  public logOut() {
    localStorage.clear();
    this.router.navigate(['']);
  }
}
