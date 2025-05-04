export interface KYC {
    id: string;
    customerName: string;
    dateOfBirth: string;
    panNumber: string;
    aadharNumber: string;
    address: string;
    phoneNumber: string;
    email: string;
    documents: {
      aadhar?: File | null;
      pan?: File | null;
    };
    submissionDate: string;
    submittedBy: string;
  }