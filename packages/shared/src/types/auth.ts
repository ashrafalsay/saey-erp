export interface LoginRequest {
  email: string;
  password: string;
  companyId?: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: UserProfile;
}

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: UserRole;
  permissions: string[];
  company: CompanyBasic;
  branch?: BranchBasic;
  locale: 'ar' | 'en';
  theme: 'light' | 'dark' | 'system';
}

export interface CompanyBasic {
  id: string;
  name: string;
  nameAr: string;
  logo?: string;
  currency: string;
}

export interface BranchBasic {
  id: string;
  name: string;
  nameAr: string;
}

export type UserRole = 'super_admin' | 'admin' | 'manager' | 'employee' | 'accountant' | 'hr_manager' | 'sales_manager' | 'warehouse_manager' | 'viewer';

export interface TokenPayload {
  sub: string;
  email: string;
  role: UserRole;
  companyId: string;
  branchId?: string;
  permissions: string[];
  iat: number;
  exp: number;
}
