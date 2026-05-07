import { Controller, Get, Post, Param, Query, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { InventoryService } from './inventory.service';
import { CurrentUser, CurrentUserPayload } from '../common/decorators/current-user.decorator';
import { RequirePermissions } from '../common/decorators/permissions.decorator';
import { PermissionsGuard } from '../common/guards/permissions.guard';

@ApiTags('Inventory')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('inventory')
export class InventoryController {
  constructor(private inventoryService: InventoryService) {}

  @Get('products')
  @RequirePermissions('products:view')
  async getProducts(
    @CurrentUser() user: CurrentUserPayload,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
    @Query('categoryId') categoryId?: string,
  ) {
    return this.inventoryService.getProducts(user.companyId, {
      page: page ? parseInt(page, 10) : undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
      search,
      categoryId,
    });
  }

  @Get('products/low-stock')
  @RequirePermissions('stock:view')
  async getLowStockProducts(@CurrentUser() user: CurrentUserPayload) {
    return this.inventoryService.getLowStockProducts(user.companyId);
  }

  @Get('products/:id')
  @RequirePermissions('products:view')
  async getProductById(@Param('id') id: string, @CurrentUser() user: CurrentUserPayload) {
    return this.inventoryService.getProductById(id, user.companyId);
  }

  @Post('products')
  @RequirePermissions('products:create')
  async createProduct(@CurrentUser() user: CurrentUserPayload, @Body() body: {
    sku: string;
    name: string;
    nameAr: string;
    barcode?: string;
    description?: string;
    categoryId?: string;
    costPrice?: number;
    salePrice?: number;
    taxRate?: number;
  }) {
    return this.inventoryService.createProduct(user.companyId, body);
  }

  @Get('categories')
  @RequirePermissions('products:view')
  async getCategories(@CurrentUser() user: CurrentUserPayload) {
    return this.inventoryService.getCategories(user.companyId);
  }

  @Get('warehouses')
  @RequirePermissions('warehouses:view')
  async getWarehouses(@CurrentUser() user: CurrentUserPayload) {
    return this.inventoryService.getWarehouses(user.companyId);
  }
}
