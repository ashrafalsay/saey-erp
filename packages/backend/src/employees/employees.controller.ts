import { Controller, Get, Post, Param, Query, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { EmployeesService } from './employees.service';
import { CurrentUser, CurrentUserPayload } from '../common/decorators/current-user.decorator';
import { RequirePermissions } from '../common/decorators/permissions.decorator';
import { PermissionsGuard } from '../common/guards/permissions.guard';

@ApiTags('Employees')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('employees')
export class EmployeesController {
  constructor(private employeesService: EmployeesService) {}

  @Get()
  @RequirePermissions('employees:view')
  async findAll(
    @CurrentUser() user: CurrentUserPayload,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
    @Query('departmentId') departmentId?: string,
    @Query('status') status?: string,
  ) {
    return this.employeesService.findAll(user.companyId, {
      page: page ? parseInt(page, 10) : undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
      search,
      departmentId,
      status,
    });
  }

  @Get('departments')
  @RequirePermissions('departments:view')
  async getDepartments(@CurrentUser() user: CurrentUserPayload) {
    return this.employeesService.getDepartments(user.companyId);
  }

  @Post('departments')
  @RequirePermissions('departments:manage')
  async createDepartment(@CurrentUser() user: CurrentUserPayload, @Body() body: { name: string; nameAr: string; code: string; parentId?: string }) {
    return this.employeesService.createDepartment(user.companyId, body);
  }

  @Get(':id')
  @RequirePermissions('employees:view')
  async findById(@Param('id') id: string, @CurrentUser() user: CurrentUserPayload) {
    return this.employeesService.findById(id, user.companyId);
  }

  @Post()
  @RequirePermissions('employees:create')
  async create(@CurrentUser() user: CurrentUserPayload, @Body() body: {
    branchId: string;
    employeeNumber: string;
    firstName: string;
    firstNameAr: string;
    lastName: string;
    lastNameAr: string;
    email: string;
    departmentId: string;
    hireDate: string;
  }) {
    return this.employeesService.create(user.companyId, body);
  }
}
