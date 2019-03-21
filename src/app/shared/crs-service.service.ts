import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrsServiceService {
  constructor(public http: HttpClient) {}

  public getStudentData() {
    return this.http.get(`${environment.apiUrls.getStudentData}`);
  }
  public login(userId, password) {
    return this.http.post(`${environment.apiUrls.getStudentData}/login`, {
      userId,
      password
    });
  }
}
