import { Component, OnInit } from '@angular/core';
import { CrsServiceService } from '../shared/service/crs-service.service';
import { LoginComponent } from '../login-page/login.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(public crsService: CrsServiceService) {}
  public userDetails: any;
  ngOnInit() {
    this.userDetails = this.crsService.userdetails;
    console.log(this.userDetails);
  }

  getStudentDetails() {}
}
