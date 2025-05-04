import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KycFormComponent } from './kyc-form/kyc-form.component';
import { KycListComponent } from './kyc-list/kyc-list.component';
import { KycDetailComponent } from './kyc-detail/kyc-detail.component';



@NgModule({
  declarations: [
    KycFormComponent,
    KycListComponent,
    KycDetailComponent
  ],
  imports: [
    CommonModule
  ]
})
export class KycModule { }
