import { Controller, Get, Post, Param, Query, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AccountingService } from './accounting.service';
import { CurrentUser, CurrentUserPayload } from '../common/decorators/current-user.decorator';
import { RequirePermissions } from '../common/decorators/permissions.decorator';
import { PermissionsGuard } from '../common/guards/permissions.guard';

@ApiTags('Accounting')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('accounting')
export class AccountingController {
  constructor(private accountingService: AccountingService) {}

  @Get('accounts')
  @RequirePermissions('accounts:view')
  async getAccounts(@CurrentUser() user: CurrentUserPayload) {
    return this.accountingService.getAccounts(user.companyId);
  }

  @Post('accounts')
  @RequirePermissions('accounts:manage')
  async createAccount(@CurrentUser() user: CurrentUserPayload, @Body() body: {
    code: string;
    name: string;
    nameAr: string;
    type: string;
    parentId?: string;
    description?: string;
  }) {
    return this.accountingService.createAccount(user.companyId, body);
  }

  @Get('invoices')
  @RequirePermissions('invoices:view')
  async getInvoices(
    @CurrentUser() user: CurrentUserPayload,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('type') type?: string,
    @Query('status') status?: string,
    @Query('search') search?: string,
  ) {
    return this.accountingService.getInvoices(user.companyId, {
      page: page ? parseInt(page, 10) : undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
      type,
      status,
      search,
    });
  }

  @Get('invoices/:id')
  @RequirePermissions('invoices:view')
  async getInvoiceById(@Param('id') id: string, @CurrentUser() user: CurrentUserPayload) {
    return this.accountingService.getInvoiceById(id, user.companyId);
  }

  @Post('invoices')
  @RequirePermissions('invoices:create')
  async createInvoice(@CurrentUser() user: CurrentUserPayload, @Body() body: {
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
    return this.accountingService.createInvoice(user.companyId, user.sub, body);
  }

  @Get('payments')
  @RequirePermissions('payments:view')
  async getPayments(
    @CurrentUser() user: CurrentUserPayload,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('type') type?: string,
  ) {
    return this.accountingService.getPayments(user.companyId, {
      page: page ? parseInt(page, 10) : undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
      type,
    });
  }
}
