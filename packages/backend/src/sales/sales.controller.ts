import { Controller, Get, Post, Param, Query, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { SalesService } from './sales.service';
import { CurrentUser, CurrentUserPayload } from '../common/decorators/current-user.decorator';
import { RequirePermissions } from '../common/decorators/permissions.decorator';
import { PermissionsGuard } from '../common/guards/permissions.guard';

@ApiTags('Sales')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('sales')
export class SalesController {
  constructor(private salesService: SalesService) {}

  @Get('customers')
  @RequirePermissions('customers:view')
  async getCustomers(
    @CurrentUser() user: CurrentUserPayload,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
  ) {
    return this.salesService.getCustomers(user.companyId, {
      page: page ? parseInt(page, 10) : undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
      search,
    });
  }

  @Get('customers/:id')
  @RequirePermissions('customers:view')
  async getCustomerById(@Param('id') id: string, @CurrentUser() user: CurrentUserPayload) {
    return this.salesService.getCustomerById(id, user.companyId);
  }

  @Post('customers')
  @RequirePermissions('customers:create')
  async createCustomer(@CurrentUser() user: CurrentUserPayload, @Body() body: {
    name: string;
    nameAr: string;
    email?: string;
    phone?: string;
    taxNumber?: string;
    type?: string;
  }) {
    return this.salesService.createCustomer(user.companyId, body);
  }

  @Get('suppliers')
  @RequirePermissions('suppliers:view')
  async getSuppliers(
    @CurrentUser() user: CurrentUserPayload,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
  ) {
    return this.salesService.getSuppliers(user.companyId, {
      page: page ? parseInt(page, 10) : undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
      search,
    });
  }

  @Post('suppliers')
  @RequirePermissions('suppliers:create')
  async createSupplier(@CurrentUser() user: CurrentUserPayload, @Body() body: {
    name: string;
    nameAr: string;
    email?: string;
    phone?: string;
    taxNumber?: string;
  }) {
    return this.salesService.createSupplier(user.companyId, body);
  }

  @Get('orders')
  @RequirePermissions('orders:view')
  async getSalesOrders(
    @CurrentUser() user: CurrentUserPayload,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('status') status?: string,
  ) {
    return this.salesService.getSalesOrders(user.companyId, {
      page: page ? parseInt(page, 10) : undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
      status,
    });
  }
}
