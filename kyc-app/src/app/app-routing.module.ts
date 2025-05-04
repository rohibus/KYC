import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { KycListComponent } from './kyc/kyc-list/kyc-list.component';
import { KycFormComponent } from './kyc/kyc-form/kyc-form.component';
import { KycDetailComponent } from './kyc/kyc-detail/kyc-detail.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: 'kyc', 
    canActivate: [AuthGuard],
    children: [
      { path: '', component: KycListComponent },
      { path: 'new', component: KycFormComponent },
      { path: 'edit/:id', component: KycFormComponent },
      { path: ':id', component: KycDetailComponent }
    ]
  },
  { path: '', redirectTo: '/kyc', pathMatch: 'full' },
  { path: '**', redirectTo: '/kyc' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }