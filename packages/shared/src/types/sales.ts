export interface Customer {
  id: string;
  companyId: string;
  customerNumber: string;
  name: string;
  nameAr: string;
  email?: string;
  phone?: string;
  mobile?: string;
  taxNumber?: string;
  crNumber?: string;
  type: CustomerType;
  category?: string;
  creditLimit: number;
  paymentTerms?: number;
  currency: string;
  address?: string;
  addressAr?: string;
  city?: string;
  country: string;
  zipCode?: string;
  notes?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Supplier {
  id: string;
  companyId: string;
  supplierNumber: string;
  name: string;
  nameAr: string;
  email?: string;
  phone?: string;
  mobile?: string;
  taxNumber?: string;
  crNumber?: string;
  contactPerson?: string;
  paymentTerms?: number;
  currency: string;
  address?: string;
  addressAr?: string;
  city?: string;
  country: string;
  zipCode?: string;
  bankName?: string;
  bankAccount?: string;
  iban?: string;
  notes?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SalesOrder {
  id: string;
  companyId: string;
  branchId?: string;
  orderNumber: string;
  customerId: string;
  date: string;
  deliveryDate?: string;
  reference?: string;
  notes?: string;
  lines: SalesOrderLine[];
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  total: number;
  currency: string;
  status: SalesOrderStatus;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface SalesOrderLine {
  id: string;
  orderId: string;
  productId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  taxAmount: number;
  discountPercent: number;
  discountAmount: number;
  total: number;
}

export interface Quotation {
  id: string;
  companyId: string;
  branchId?: string;
  quotationNumber: string;
  customerId: string;
  date: string;
  validUntil: string;
  reference?: string;
  notes?: string;
  lines: QuotationLine[];
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  total: number;
  currency: string;
  status: QuotationStatus;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface QuotationLine {
  id: string;
  quotationId: string;
  productId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  taxAmount: number;
  discountPercent: number;
  discountAmount: number;
  total: number;
}

export type CustomerType = 'individual' | 'company' | 'government';
export type SalesOrderStatus = 'draft' | 'confirmed' | 'processing' | 'delivered' | 'invoiced' | 'cancelled';
export type QuotationStatus = 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired' | 'converted';
