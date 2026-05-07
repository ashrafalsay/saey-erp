export interface Company {
  id: string;
  name: string;
  nameAr: string;
  logo?: string;
  email: string;
  phone: string;
  website?: string;
  taxNumber?: string;
  crNumber?: string;
  currency: string;
  country: string;
  city: string;
  address: string;
  addressAr: string;
  zipCode?: string;
  subscriptionPlan: SubscriptionPlan;
  subscriptionStatus: SubscriptionStatus;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Branch {
  id: string;
  companyId: string;
  name: string;
  nameAr: string;
  code: string;
  phone?: string;
  email?: string;
  address?: string;
  addressAr?: string;
  city?: string;
  isMainBranch: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type SubscriptionPlan = 'trial' | 'starter' | 'professional' | 'enterprise';
export type SubscriptionStatus = 'active' | 'trial' | 'expired' | 'suspended' | 'cancelled';
