import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: { email, isActive: true },
      include: {
        company: true,
        branch: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      companyId: user.companyId,
      branchId: user.branchId,
      permissions: user.permissions,
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    await this.prisma.userSession.create({
      data: {
        userId: user.id,
        token: refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        role: user.role,
        permissions: user.permissions,
        locale: user.locale,
        theme: user.theme,
        company: {
          id: user.company.id,
          name: user.company.name,
          nameAr: user.company.nameAr,
          logo: user.company.logo,
          currency: user.company.currency,
        },
        branch: user.branch
          ? { id: user.branch.id, name: user.branch.name, nameAr: user.branch.nameAr }
          : undefined,
      },
    };
  }

  async register(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    companyName: string;
    companyNameAr: string;
    phone: string;
  }) {
    const existingUser = await this.prisma.user.findFirst({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    const passwordHash = await bcrypt.hash(data.password, 12);

    const result = await this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const company = await tx.company.create({
        data: {
          name: data.companyName,
          nameAr: data.companyNameAr,
          email: data.email,
          phone: data.phone,
          currency: 'SAR',
          country: 'SA',
          subscriptionPlan: 'trial',
          subscriptionStatus: 'trial',
          trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        },
      });

      const branch = await tx.branch.create({
        data: {
          companyId: company.id,
          name: 'Main Branch',
          nameAr: 'الفرع الرئيسي',
          code: 'MAIN',
          isMainBranch: true,
        },
      });

      const user = await tx.user.create({
        data: {
          companyId: company.id,
          branchId: branch.id,
          email: data.email,
          passwordHash,
          firstName: data.firstName,
          lastName: data.lastName,
          role: 'admin',
          permissions: [],
        },
      });

      await tx.warehouse.create({
        data: {
          companyId: company.id,
          branchId: branch.id,
          name: 'Main Warehouse',
          nameAr: 'المستودع الرئيسي',
          code: 'WH-MAIN',
          isDefault: true,
        },
      });

      return { company, branch, user };
    });

    return this.login(data.email, data.password);
  }

  async refreshToken(token: string) {
    const session = await this.prisma.userSession.findUnique({
      where: { token },
      include: { user: { include: { company: true, branch: true } } },
    });

    if (!session || session.expiresAt < new Date()) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const user = session.user;
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      companyId: user.companyId,
      branchId: user.branchId,
      permissions: user.permissions,
    };

    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  async logout(token: string) {
    await this.prisma.userSession.deleteMany({
      where: { token },
    });
    return { message: 'Logged out successfully' };
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { company: true, branch: true },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      firstNameAr: user.firstNameAr,
      lastNameAr: user.lastNameAr,
      avatar: user.avatar,
      phone: user.phone,
      role: user.role,
      permissions: user.permissions,
      locale: user.locale,
      theme: user.theme,
      company: {
        id: user.company.id,
        name: user.company.name,
        nameAr: user.company.nameAr,
        logo: user.company.logo,
        currency: user.company.currency,
      },
      branch: user.branch
        ? { id: user.branch.id, name: user.branch.name, nameAr: user.branch.nameAr }
        : undefined,
    };
  }
}
