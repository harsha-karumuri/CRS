import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login-page/login.component';
import { MatCardModule, MatFormFieldModule, MatToolbarModule, MatButtonModule, MatIconModule } from '@angular/material';
import { MatInputModule, MatDialogModule, MatTableModule, MatOptionModule, MatSelectModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home-page/home.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CrsServiceService } from './shared/service/crs-service.service';
import { HttpClientModule } from '@angular/common/http';
import { TableComponent } from './table/table.component';
import { AuthGuard } from './shared/guards/auth.guard';

@NgModule({
  declarations: [AppComponent, LoginComponent, HomeComponent, TableComponent],
  imports: [
    ReactiveFormsModule,
    MatIconModule,
    RouterModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    BrowserModule,
    FormsModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatOptionModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [CrsServiceService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
