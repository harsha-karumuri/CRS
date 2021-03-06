import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login-page/login.component';
import { HomeComponent } from './home-page/home.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [{ path: '', component: LoginComponent }, { path: 'home', component: HomeComponent, canActivate: [AuthGuard] }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
