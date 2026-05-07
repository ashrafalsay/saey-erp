export interface Employee {
  id: string;
  companyId: string;
  branchId: string;
  userId?: string;
  employeeNumber: string;
  firstName: string;
  firstNameAr: string;
  lastName: string;
  lastNameAr: string;
  email: string;
  phone: string;
  nationalId?: string;
  iqamaNumber?: string;
  passportNumber?: string;
  dateOfBirth?: string;
  gender: 'male' | 'female';
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
  nationality: string;
  departmentId: string;
  positionId?: string;
  managerId?: string;
  hireDate: string;
  contractType: ContractType;
  salary: number;
  currency: string;
  bankName?: string;
  bankAccount?: string;
  iban?: string;
  status: EmployeeStatus;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Department {
  id: string;
  companyId: string;
  name: string;
  nameAr: string;
  code: string;
  parentId?: string;
  managerId?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  totalDays: number;
  reason?: string;
  status: ApprovalStatus;
  approvedBy?: string;
  approvedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Attendance {
  id: string;
  employeeId: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  workHours?: number;
  overtimeHours?: number;
  status: AttendanceStatus;
  notes?: string;
  createdAt: string;
}

export type ContractType = 'full_time' | 'part_time' | 'contract' | 'intern' | 'temporary';
export type EmployeeStatus = 'active' | 'inactive' | 'on_leave' | 'terminated' | 'resigned';
export type LeaveType = 'annual' | 'sick' | 'unpaid' | 'maternity' | 'paternity' | 'emergency' | 'hajj' | 'other';
export type ApprovalStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';
export type AttendanceStatus = 'present' | 'absent' | 'late' | 'half_day' | 'remote' | 'holiday' | 'weekend';
