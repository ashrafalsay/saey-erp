import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(companyId: string, params: { page?: number; limit?: number; search?: string }) {
    const page = params.page || 1;
    const limit = params.limit || 20;
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = { companyId };
    if (params.search) {
      where.OR = [
        { firstName: { contains: params.search, mode: 'insensitive' } },
        { lastName: { contains: params.search, mode: 'insensitive' } },
        { email: { contains: params.search, mode: 'insensitive' } },
      ];
    }

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          firstNameAr: true,
          lastNameAr: true,
          avatar: true,
          role: true,
          isActive: true,
          lastLoginAt: true,
          createdAt: true,
          branch: { select: { id: true, name: true, nameAr: true } },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count({ where }),
    ]);

    return { data: users, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findById(id: string, companyId: string) {
    const user = await this.prisma.user.findFirst({
      where: { id, companyId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        firstNameAr: true,
        lastNameAr: true,
        avatar: true,
        phone: true,
        role: true,
        permissions: true,
        locale: true,
        theme: true,
        isActive: true,
        lastLoginAt: true,
        createdAt: true,
        branch: { select: { id: true, name: true, nameAr: true } },
      },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async create(companyId: string, data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
    branchId?: string;
    permissions?: string[];
  }) {
    const existing = await this.prisma.user.findFirst({
      where: { companyId, email: data.email },
    });
    if (existing) throw new BadRequestException('Email already exists in this company');

    const passwordHash = await bcrypt.hash(data.password, 12);
    return this.prisma.user.create({
      data: {
        companyId,
        email: data.email,
        passwordHash,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
        branchId: data.branchId,
        permissions: data.permissions || [],
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });
  }

  async update(id: string, companyId: string, data: {
    firstName?: string;
    lastName?: string;
    role?: string;
    branchId?: string;
    permissions?: string[];
    isActive?: boolean;
    locale?: string;
    theme?: string;
  }) {
    const user = await this.prisma.user.findFirst({ where: { id, companyId } });
    if (!user) throw new NotFoundException('User not found');

    return this.prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        updatedAt: true,
      },
    });
  }

  async delete(id: string, companyId: string) {
    const user = await this.prisma.user.findFirst({ where: { id, companyId } });
    if (!user) throw new NotFoundException('User not found');

    await this.prisma.user.delete({ where: { id } });
    return { message: 'User deleted successfully' };
  }
}
