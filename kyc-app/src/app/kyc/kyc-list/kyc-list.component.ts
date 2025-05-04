import { Component, OnInit } from '@angular/core';
import { KycService } from '../kyc.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-kyc-list',
  templateUrl: './kyc-list.component.html',
  styleUrls: ['./kyc-list.component.css']
})
export class KycListComponent implements OnInit {
  kycs: any[] = [];
  isAdmin = false;

  constructor(
    private kycService: KycService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.kycService.kycs$.subscribe(kycs => {
      this.kycs = kycs.map(k => ({
        id: k.id,
        customerName: k.customerName,
        panNumber: k.panNumber,
        submissionDate: new Date(k.submissionDate).toLocaleDateString(),
        submittedBy: k.submittedBy
      }));
    });
  }

  viewDetails(id: string): void {
    this.router.navigate(['/kyc', id]);
  }

  editKyc(id: string): void {
    this.router.navigate(['/kyc/edit', id]);
  }

  deleteKyc(id: string): void {
    if (confirm('Are you sure you want to delete this KYC record?')) {
      this.kycService.delete(id);
    }
  }

  createNew(): void {
    this.router.navigate(['/kyc/new']);
  }
}