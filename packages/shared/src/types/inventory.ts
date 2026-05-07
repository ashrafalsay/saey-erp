export interface Product {
  id: string;
  companyId: string;
  sku: string;
  barcode?: string;
  name: string;
  nameAr: string;
  description?: string;
  descriptionAr?: string;
  categoryId?: string;
  unitId: string;
  type: ProductType;
  costPrice: number;
  salePrice: number;
  taxRate: number;
  currency: string;
  trackInventory: boolean;
  minStock?: number;
  maxStock?: number;
  reorderPoint?: number;
  weight?: number;
  dimensions?: string;
  image?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductCategory {
  id: string;
  companyId: string;
  name: string;
  nameAr: string;
  parentId?: string;
  image?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Warehouse {
  id: string;
  companyId: string;
  branchId: string;
  name: string;
  nameAr: string;
  code: string;
  address?: string;
  managerId?: string;
  isDefault: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface StockMovement {
  id: string;
  companyId: string;
  warehouseId: string;
  productId: string;
  type: StockMovementType;
  quantity: number;
  reference?: string;
  referenceType?: string;
  referenceId?: string;
  notes?: string;
  createdBy: string;
  createdAt: string;
}

export interface StockLevel {
  id: string;
  companyId: string;
  warehouseId: string;
  productId: string;
  quantity: number;
  reservedQuantity: number;
  availableQuantity: number;
  updatedAt: string;
}

export type ProductType = 'product' | 'service' | 'consumable';
export type StockMovementType = 'in' | 'out' | 'transfer' | 'adjustment' | 'return';
