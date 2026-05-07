import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AccountingService {
  constructor(private prisma: PrismaService) {}

  async getAccounts(companyId: string) {
    return this.prisma.account.findMany({
      where: { companyId },
      include: { children: true },
      orderBy: { code: 'asc' },
    });
  }

  async createAccount(companyId: string, data: {
    code: string;
    name: string;
    nameAr: string;
    type: string;
    parentId?: string;
    description?: string;
  }) {
    return this.prisma.account.create({
      data: { companyId, ...data },
    });
  }

  async getInvoices(companyId: string, params: { page?: number; limit?: number; type?: string; status?: string; search?: string }) {
    const page = params.page || 1;
    const limit = params.limit || 20;
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = { companyId };
    if (params.type) where.type = params.type;
    if (params.status) where.status = params.status;
    if (params.search) {
      where.OR = [
        { invoiceNumber: { contains: params.search, mode: 'insensitive' } },
      ];
    }

    const [invoices, total] = await Promise.all([
      this.prisma.invoice.findMany({
        where,
        include: {
          customer: { select: { id: true, name: true, nameAr: true } },
          supplier: { select: { id: true, name: true, nameAr: true } },
          _count: { select: { lines: true } },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.invoice.count({ where }),
    ]);

    return { data: invoices, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async getInvoiceById(id: string, companyId: string) {
    const invoice = await this.prisma.invoice.findFirst({
      where: { id, companyId },
      include: {
        customer: true,
        supplier: true,
        lines: { include: { product: { select: { id: true, name: true, nameAr: true, sku: true } } } },
        payments: true,
      },
    });
    if (!invoice) throw new NotFoundException('Invoice not found');
    return invoice;
  }

  async createInvoice(companyId: string, createdBy: string, data: {
    type: string;
    customerId?: string;
    supplierId?: string;
    date: string;
    dueDate: string;
    reference?: string;
    notes?: string;
    lines: Array<{
      productId?: string;
      description: string;
      quantity: number;
      unitPrice: number;
      taxRate: number;
      discountPercent?: number;
    }>;
  }) {
    const lastInvoice = await this.prisma.invoice.findFirst({
      where: { companyId, type: data.type },
      orderBy: { createdAt: 'desc' },
    });

    const prefix = data.type === 'sales' ? 'INV' : 'BILL';
    const nextNum = lastInvoice
      ? parseInt(lastInvoice.invoiceNumber.split('-')[1] || '0', 10) + 1
      : 1;
    const invoiceNumber = `${prefix}-${String(nextNum).padStart(6, '0')}`;

    let subtotal = 0;
    let totalTax = 0;
    let totalDiscount = 0;

    const processedLines = data.lines.map((line) => {
      const lineSubtotal = line.quantity * line.unitPrice;
      const discountPercent = line.discountPercent || 0;
      const discountAmount = lineSubtotal * (discountPercent / 100);
      const taxableAmount = lineSubtotal - discountAmount;
      const taxAmount = taxableAmount * (line.taxRate / 100);
      const total = taxableAmount + taxAmount;

      subtotal += lineSubtotal;
      totalTax += taxAmount;
      totalDiscount += discountAmount;

      return {
        productId: line.productId,
        description: line.description,
        quantity: line.quantity,
        unitPrice: line.unitPrice,
        taxRate: line.taxRate,
        taxAmount,
        discountPercent,
        discountAmount,
        total,
      };
    });

    const grandTotal = subtotal - totalDiscount + totalTax;

    return this.prisma.invoice.create({
      data: {
        companyId,
        invoiceNumber,
        type: data.type,
        customerId: data.customerId,
        supplierId: data.supplierId,
        date: new Date(data.date),
        dueDate: new Date(data.dueDate),
        reference: data.reference,
        notes: data.notes,
        subtotal,
        taxAmount: totalTax,
        discountAmount: totalDiscount,
        total: grandTotal,
        amountDue: grandTotal,
        createdBy,
        lines: {
          create: processedLines,
        },
      },
      include: { lines: true },
    });
  }

  async getPayments(companyId: string, params: { page?: number; limit?: number; type?: string }) {
    const page = params.page || 1;
    const limit = params.limit || 20;
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = { companyId };
    if (params.type) where.type = params.type;

    const [payments, total] = await Promise.all([
      this.prisma.payment.findMany({
        where,
        include: {
          customer: { select: { id: true, name: true, nameAr: true } },
          supplier: { select: { id: true, name: true, nameAr: true } },
          invoice: { select: { id: true, invoiceNumber: true } },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.payment.count({ where }),
    ]);

    return { data: payments, total, page, limit, totalPages: Math.ceil(total / limit) };
  }
}
