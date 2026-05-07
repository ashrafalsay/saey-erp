export interface Account {
  id: string;
  companyId: string;
  code: string;
  name: string;
  nameAr: string;
  type: AccountType;
  parentId?: string;
  currency: string;
  isActive: boolean;
  balance: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface JournalEntry {
  id: string;
  companyId: string;
  branchId?: string;
  entryNumber: string;
  date: string;
  reference?: string;
  description: string;
  descriptionAr?: string;
  lines: JournalLine[];
  status: JournalStatus;
  totalDebit: number;
  totalCredit: number;
  currency: string;
  createdBy: string;
  approvedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface JournalLine {
  id: string;
  journalEntryId: string;
  accountId: string;
  accountCode: string;
  accountName: string;
  description?: string;
  debit: number;
  credit: number;
  costCenterId?: string;
  currency: string;
  exchangeRate: number;
}

export interface Invoice {
  id: string;
  companyId: string;
  branchId?: string;
  invoiceNumber: string;
  type: InvoiceType;
  customerId?: string;
  supplierId?: string;
  date: string;
  dueDate: string;
  reference?: string;
  notes?: string;
  lines: InvoiceLine[];
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  total: number;
  amountPaid: number;
  amountDue: number;
  currency: string;
  exchangeRate: number;
  status: InvoiceStatus;
  taxNumber?: string;
  qrCode?: string;
  zatcaStatus?: ZatcaStatus;
  zatcaInvoiceHash?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface InvoiceLine {
  id: string;
  invoiceId: string;
  productId?: string;
  description: string;
  descriptionAr?: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  taxAmount: number;
  discountPercent: number;
  discountAmount: number;
  total: number;
}

export interface Payment {
  id: string;
  companyId: string;
  branchId?: string;
  paymentNumber: string;
  type: PaymentType;
  method: PaymentMethod;
  customerId?: string;
  supplierId?: string;
  invoiceId?: string;
  amount: number;
  currency: string;
  exchangeRate: number;
  date: string;
  reference?: string;
  notes?: string;
  status: PaymentStatus;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export type AccountType = 'asset' | 'liability' | 'equity' | 'revenue' | 'expense';
export type JournalStatus = 'draft' | 'posted' | 'cancelled';
export type InvoiceType = 'sales' | 'purchase' | 'credit_note' | 'debit_note';
export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'partial' | 'overdue' | 'cancelled' | 'refunded';
export type ZatcaStatus = 'pending' | 'reported' | 'cleared' | 'rejected';
export type PaymentType = 'receipt' | 'payment';
export type PaymentMethod = 'cash' | 'bank_transfer' | 'credit_card' | 'cheque' | 'mada' | 'stc_pay' | 'other';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';
