import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { KYC } from '../models/kyc';

@Injectable({
  providedIn: 'root'
})
export class KycService {
  private kycsSubject = new BehaviorSubject<KYC[]>([]);
  public kycs$ = this.kycsSubject.asObservable();

  constructor(private authService: AuthService) {
    // Load some mock data
    const mockData: KYC[] = [
      {
        id: '1',
        customerName: 'John Doe',
        dateOfBirth: '1990-01-15',
        panNumber: 'ABCDE1234F',
        aadharNumber: '123456789012',
        address: '123 Main St, City, Country',
        phoneNumber: '9876543210',
        email: 'john.doe@example.com',
        documents: {},
        submissionDate: new Date().toISOString(),
        submittedBy: 'admin'
      }
    ];
    this.kycsSubject.next(mockData);
  }

  getAll(): KYC[] {
    return this.kycsSubject.value;
  }

  getById(id: string): KYC | undefined {
    return this.kycsSubject.value.find(kyc => kyc.id === id);
  }

  create(kyc: Omit<KYC, 'id' | 'submissionDate' | 'submittedBy'>): void {
    const currentUser = this.authService.currentUserValue;
    if (!currentUser) return;

    const newKyc: KYC = {
      ...kyc,
      id: Math.random().toString(36).substr(2, 9),
      submissionDate: new Date().toISOString(),
      submittedBy: currentUser.username
    };

    this.kycsSubject.next([...this.kycsSubject.value, newKyc]);
  }

  update(id: string, updatedKyc: Partial<KYC>): void {
    const kycs = this.kycsSubject.value;
    const index = kycs.findIndex(k => k.id === id);
    
    if (index !== -1) {
      kycs[index] = { ...kycs[index], ...updatedKyc };
      this.kycsSubject.next(kycs);
    }
  }

  delete(id: string): void {
    this.kycsSubject.next(
      this.kycsSubject.value.filter(kyc => kyc.id !== id)
    );
  }
}