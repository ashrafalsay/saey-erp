import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CurrentUser, CurrentUserPayload } from '../common/decorators/current-user.decorator';
import { RequirePermissions } from '../common/decorators/permissions.decorator';
import { PermissionsGuard } from '../common/guards/permissions.guard';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @RequirePermissions('users:view')
  async findAll(
    @CurrentUser() user: CurrentUserPayload,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
  ) {
    return this.usersService.findAll(user.companyId, {
      page: page ? parseInt(page, 10) : undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
      search,
    });
  }

  @Get(':id')
  @RequirePermissions('users:view')
  async findById(@Param('id') id: string, @CurrentUser() user: CurrentUserPayload) {
    return this.usersService.findById(id, user.companyId);
  }

  @Post()
  @RequirePermissions('users:create')
  async create(@CurrentUser() user: CurrentUserPayload, @Body() body: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
    branchId?: string;
    permissions?: string[];
  }) {
    return this.usersService.create(user.companyId, body);
  }

  @Put(':id')
  @RequirePermissions('users:edit')
  async update(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserPayload,
    @Body() body: {
      firstName?: string;
      lastName?: string;
      role?: string;
      branchId?: string;
      permissions?: string[];
      isActive?: boolean;
    },
  ) {
    return this.usersService.update(id, user.companyId, body);
  }

  @Delete(':id')
  @RequirePermissions('users:delete')
  async delete(@Param('id') id: string, @CurrentUser() user: CurrentUserPayload) {
    return this.usersService.delete(id, user.companyId);
  }
}
