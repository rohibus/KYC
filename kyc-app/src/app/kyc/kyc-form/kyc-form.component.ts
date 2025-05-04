import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KycService } from '../kyc.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-kyc-form',
  templateUrl: './kyc-form.component.html',
  styleUrls: ['./kyc-form.component.css']
})
export class KycFormComponent implements OnInit {
  kycForm: FormGroup;
  isEditMode = false;
  currentId = '';
  aadharFile: File | null = null;
  panFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private kycService: KycService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.kycForm = this.fb.group({
      customerName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      panNumber: ['', [Validators.required, Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)]],
      aadharNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{12}$/)]],
      address: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.currentId = params['id'];
        const kyc = this.kycService.getById(this.currentId);
        if (kyc) {
          this.kycForm.patchValue({
            customerName: kyc.customerName,
            dateOfBirth: kyc.dateOfBirth,
            panNumber: kyc.panNumber,
            aadharNumber: kyc.aadharNumber,
            address: kyc.address,
            phoneNumber: kyc.phoneNumber,
            email: kyc.email
          });
        }
      }
    });
  }

  onAadharFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.aadharFile = event.target.files[0];
    }
  }

  onPanFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.panFile = event.target.files[0];
    }
  }

  onSubmit(): void {
    if (this.kycForm.valid) {
      const formValue = this.kycForm.value;
      const kycData = {
        ...formValue,
        documents: {
          aadhar: this.aadharFile,
          pan: this.panFile
        }
      };

      if (this.isEditMode) {
        this.kycService.update(this.currentId, kycData);
      } else {
        this.kycService.create(kycData);
      }

      this.router.navigate(['/kyc']);
    }
  }
}