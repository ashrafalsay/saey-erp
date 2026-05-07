import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}

  async findAll(companyId: string, params: { page?: number; limit?: number; search?: string; departmentId?: string; status?: string }) {
    const page = params.page || 1;
    const limit = params.limit || 20;
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = { companyId };
    if (params.departmentId) where.departmentId = params.departmentId;
    if (params.status) where.status = params.status;
    if (params.search) {
      where.OR = [
        { firstName: { contains: params.search, mode: 'insensitive' } },
        { lastName: { contains: params.search, mode: 'insensitive' } },
        { email: { contains: params.search, mode: 'insensitive' } },
        { employeeNumber: { contains: params.search, mode: 'insensitive' } },
      ];
    }

    const [employees, total] = await Promise.all([
      this.prisma.employee.findMany({
        where,
        include: {
          department: { select: { id: true, name: true, nameAr: true } },
          branch: { select: { id: true, name: true, nameAr: true } },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.employee.count({ where }),
    ]);

    return { data: employees, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findById(id: string, companyId: string) {
    const employee = await this.prisma.employee.findFirst({
      where: { id, companyId },
      include: {
        department: true,
        branch: true,
        manager: { select: { id: true, firstName: true, lastName: true, firstNameAr: true, lastNameAr: true } },
      },
    });
    if (!employee) throw new NotFoundException('Employee not found');
    return employee;
  }

  async create(companyId: string, data: {
    branchId: string;
    employeeNumber: string;
    firstName: string;
    firstNameAr: string;
    lastName: string;
    lastNameAr: string;
    email: string;
    phone?: string;
    departmentId: string;
    hireDate: string;
    contractType?: string;
    salary?: number;
    gender?: string;
    nationality?: string;
  }) {
    return this.prisma.employee.create({
      data: {
        companyId,
        branchId: data.branchId,
        employeeNumber: data.employeeNumber,
        firstName: data.firstName,
        firstNameAr: data.firstNameAr,
        lastName: data.lastName,
        lastNameAr: data.lastNameAr,
        email: data.email,
        phone: data.phone,
        departmentId: data.departmentId,
        hireDate: new Date(data.hireDate),
        contractType: data.contractType || 'full_time',
        salary: data.salary || 0,
        gender: data.gender || 'male',
        nationality: data.nationality || 'SA',
      },
    });
  }

  async getDepartments(companyId: string) {
    return this.prisma.department.findMany({
      where: { companyId },
      include: {
        _count: { select: { employees: true } },
      },
      orderBy: { name: 'asc' },
    });
  }

  async createDepartment(companyId: string, data: { name: string; nameAr: string; code: string; parentId?: string }) {
    return this.prisma.department.create({
      data: { companyId, ...data },
    });
  }
}
