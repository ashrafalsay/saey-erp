import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) {}

  async getCompany(companyId: string) {
    const company = await this.prisma.company.findUnique({
      where: { id: companyId },
      include: {
        branches: { orderBy: { isMainBranch: 'desc' } },
        _count: {
          select: {
            users: true,
            employees: true,
            customers: true,
            suppliers: true,
            products: true,
            invoices: true,
          },
        },
      },
    });
    if (!company) throw new NotFoundException('Company not found');
    return company;
  }

  async updateCompany(companyId: string, data: {
    name?: string;
    nameAr?: string;
    email?: string;
    phone?: string;
    website?: string;
    taxNumber?: string;
    crNumber?: string;
    currency?: string;
    city?: string;
    address?: string;
    addressAr?: string;
  }) {
    return this.prisma.company.update({
      where: { id: companyId },
      data,
    });
  }

  async getBranches(companyId: string) {
    return this.prisma.branch.findMany({
      where: { companyId },
      orderBy: [{ isMainBranch: 'desc' }, { name: 'asc' }],
    });
  }

  async createBranch(companyId: string, data: {
    name: string;
    nameAr: string;
    code: string;
    phone?: string;
    email?: string;
    address?: string;
    addressAr?: string;
    city?: string;
  }) {
    return this.prisma.branch.create({
      data: { companyId, ...data },
    });
  }

  async getDashboardStats(companyId: string) {
    const [
      totalUsers,
      totalEmployees,
      totalCustomers,
      totalSuppliers,
      totalProducts,
      totalInvoices,
      recentInvoices,
    ] = await Promise.all([
      this.prisma.user.count({ where: { companyId, isActive: true } }),
      this.prisma.employee.count({ where: { companyId, status: 'active' } }),
      this.prisma.customer.count({ where: { companyId, isActive: true } }),
      this.prisma.supplier.count({ where: { companyId, isActive: true } }),
      this.prisma.product.count({ where: { companyId, isActive: true } }),
      this.prisma.invoice.count({ where: { companyId } }),
      this.prisma.invoice.findMany({
        where: { companyId },
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          invoiceNumber: true,
          type: true,
          total: true,
          status: true,
          date: true,
          customer: { select: { name: true, nameAr: true } },
        },
      }),
    ]);

    return {
      stats: {
        totalUsers,
        totalEmployees,
        totalCustomers,
        totalSuppliers,
        totalProducts,
        totalInvoices,
      },
      recentInvoices,
    };
  }
}
