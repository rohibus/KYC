import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KycDetailComponent } from './kyc-detail.component';

describe('KycDetailComponent', () => {
  let component: KycDetailComponent;
  let fixture: ComponentFixture<KycDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KycDetailComponent]
    });
    fixture = TestBed.createComponent(KycDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
