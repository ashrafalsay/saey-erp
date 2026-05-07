import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SalesService {
  constructor(private prisma: PrismaService) {}

  async getCustomers(companyId: string, params: { page?: number; limit?: number; search?: string }) {
    const page = params.page || 1;
    const limit = params.limit || 20;
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = { companyId };
    if (params.search) {
      where.OR = [
        { name: { contains: params.search, mode: 'insensitive' } },
        { nameAr: { contains: params.search, mode: 'insensitive' } },
        { email: { contains: params.search, mode: 'insensitive' } },
        { customerNumber: { contains: params.search, mode: 'insensitive' } },
      ];
    }

    const [customers, total] = await Promise.all([
      this.prisma.customer.findMany({
        where,
        include: {
          _count: { select: { invoices: true, salesOrders: true } },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.customer.count({ where }),
    ]);

    return { data: customers, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async getCustomerById(id: string, companyId: string) {
    const customer = await this.prisma.customer.findFirst({
      where: { id, companyId },
      include: {
        invoices: { take: 10, orderBy: { createdAt: 'desc' } },
        salesOrders: { take: 10, orderBy: { createdAt: 'desc' } },
      },
    });
    if (!customer) throw new NotFoundException('Customer not found');
    return customer;
  }

  async createCustomer(companyId: string, data: {
    name: string;
    nameAr: string;
    email?: string;
    phone?: string;
    mobile?: string;
    taxNumber?: string;
    type?: string;
    creditLimit?: number;
    address?: string;
    addressAr?: string;
    city?: string;
    country?: string;
  }) {
    const lastCustomer = await this.prisma.customer.findFirst({
      where: { companyId },
      orderBy: { createdAt: 'desc' },
    });
    const nextNum = lastCustomer
      ? parseInt(lastCustomer.customerNumber.split('-')[1] || '0', 10) + 1
      : 1;
    const customerNumber = `CUST-${String(nextNum).padStart(5, '0')}`;

    return this.prisma.customer.create({
      data: { companyId, customerNumber, ...data },
    });
  }

  async getSuppliers(companyId: string, params: { page?: number; limit?: number; search?: string }) {
    const page = params.page || 1;
    const limit = params.limit || 20;
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = { companyId };
    if (params.search) {
      where.OR = [
        { name: { contains: params.search, mode: 'insensitive' } },
        { nameAr: { contains: params.search, mode: 'insensitive' } },
        { supplierNumber: { contains: params.search, mode: 'insensitive' } },
      ];
    }

    const [suppliers, total] = await Promise.all([
      this.prisma.supplier.findMany({ where, skip, take: limit, orderBy: { createdAt: 'desc' } }),
      this.prisma.supplier.count({ where }),
    ]);

    return { data: suppliers, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async createSupplier(companyId: string, data: {
    name: string;
    nameAr: string;
    email?: string;
    phone?: string;
    taxNumber?: string;
    contactPerson?: string;
    address?: string;
    addressAr?: string;
    city?: string;
    country?: string;
  }) {
    const lastSupplier = await this.prisma.supplier.findFirst({
      where: { companyId },
      orderBy: { createdAt: 'desc' },
    });
    const nextNum = lastSupplier
      ? parseInt(lastSupplier.supplierNumber.split('-')[1] || '0', 10) + 1
      : 1;
    const supplierNumber = `SUP-${String(nextNum).padStart(5, '0')}`;

    return this.prisma.supplier.create({
      data: { companyId, supplierNumber, ...data },
    });
  }

  async getSalesOrders(companyId: string, params: { page?: number; limit?: number; status?: string }) {
    const page = params.page || 1;
    const limit = params.limit || 20;
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = { companyId };
    if (params.status) where.status = params.status;

    const [orders, total] = await Promise.all([
      this.prisma.salesOrder.findMany({
        where,
        include: {
          customer: { select: { id: true, name: true, nameAr: true } },
          _count: { select: { lines: true } },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.salesOrder.count({ where }),
    ]);

    return { data: orders, total, page, limit, totalPages: Math.ceil(total / limit) };
  }
}
