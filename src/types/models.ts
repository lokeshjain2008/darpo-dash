export interface Organization {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Property {
  id: string;
  name: string;
  description?: string;
  address: string;
  organizationId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Room {
  id: string;
  name: string;
  type: string;
  floor?: number;
  propertyId: string;
  occupied: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  googleId: string;
  phoneNumber?: string;
  isPhoneVerified: boolean;
  email: string;
  name: string;
  organizationId?: string;
  createdAt: string;
  updatedAt: string;
}