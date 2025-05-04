import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KycService } from '../kyc.service';
import { KYC } from 'src/app/models/kyc';

@Component({
  selector: 'app-kyc-detail',
  templateUrl: './kyc-detail.component.html',
  styleUrls: ['./kyc-detail.component.css']
})
export class KycDetailComponent implements OnInit {
  kyc: KYC | undefined;

  constructor(
    private route: ActivatedRoute,
    private kycService: KycService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.kyc = this.kycService.getById(id);
    }
  }
}