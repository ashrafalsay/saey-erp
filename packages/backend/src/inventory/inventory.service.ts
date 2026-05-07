import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  async getProducts(companyId: string, params: { page?: number; limit?: number; search?: string; categoryId?: string }) {
    const page = params.page || 1;
    const limit = params.limit || 20;
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = { companyId };
    if (params.categoryId) where.categoryId = params.categoryId;
    if (params.search) {
      where.OR = [
        { name: { contains: params.search, mode: 'insensitive' } },
        { nameAr: { contains: params.search, mode: 'insensitive' } },
        { sku: { contains: params.search, mode: 'insensitive' } },
        { barcode: { contains: params.search, mode: 'insensitive' } },
      ];
    }

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        include: {
          category: { select: { id: true, name: true, nameAr: true } },
          stockLevels: { select: { warehouseId: true, quantity: true, availableQuantity: true } },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.product.count({ where }),
    ]);

    return { data: products, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async getProductById(id: string, companyId: string) {
    const product = await this.prisma.product.findFirst({
      where: { id, companyId },
      include: {
        category: true,
        stockLevels: {
          include: { warehouse: { select: { id: true, name: true, nameAr: true, code: true } } },
        },
      },
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async createProduct(companyId: string, data: {
    sku: string;
    name: string;
    nameAr: string;
    barcode?: string;
    description?: string;
    descriptionAr?: string;
    categoryId?: string;
    unit?: string;
    type?: string;
    costPrice?: number;
    salePrice?: number;
    taxRate?: number;
    trackInventory?: boolean;
    minStock?: number;
    reorderPoint?: number;
  }) {
    return this.prisma.product.create({
      data: { companyId, ...data },
    });
  }

  async getCategories(companyId: string) {
    return this.prisma.productCategory.findMany({
      where: { companyId },
      include: {
        _count: { select: { products: true } },
        children: true,
      },
      orderBy: { name: 'asc' },
    });
  }

  async getWarehouses(companyId: string) {
    return this.prisma.warehouse.findMany({
      where: { companyId },
      include: {
        branch: { select: { id: true, name: true, nameAr: true } },
        _count: { select: { stockLevels: true } },
      },
      orderBy: { name: 'asc' },
    });
  }

  async getLowStockProducts(companyId: string) {
    return this.prisma.product.findMany({
      where: {
        companyId,
        trackInventory: true,
        isActive: true,
        reorderPoint: { not: null },
        stockLevels: {
          some: {
            availableQuantity: { lte: 0 },
          },
        },
      },
      include: {
        stockLevels: true,
        category: { select: { name: true, nameAr: true } },
      },
    });
  }
}
