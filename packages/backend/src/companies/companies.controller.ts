import { Controller, Get, Put, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CompaniesService } from './companies.service';
import { CurrentUser, CurrentUserPayload } from '../common/decorators/current-user.decorator';

@ApiTags('Companies')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('companies')
export class CompaniesController {
  constructor(private companiesService: CompaniesService) {}

  @Get('current')
  async getCompany(@CurrentUser() user: CurrentUserPayload) {
    return this.companiesService.getCompany(user.companyId);
  }

  @Put('current')
  async updateCompany(@CurrentUser() user: CurrentUserPayload, @Body() body: {
    name?: string;
    nameAr?: string;
    email?: string;
    phone?: string;
    website?: string;
    taxNumber?: string;
    crNumber?: string;
  }) {
    return this.companiesService.updateCompany(user.companyId, body);
  }

  @Get('branches')
  async getBranches(@CurrentUser() user: CurrentUserPayload) {
    return this.companiesService.getBranches(user.companyId);
  }

  @Post('branches')
  async createBranch(@CurrentUser() user: CurrentUserPayload, @Body() body: {
    name: string;
    nameAr: string;
    code: string;
    phone?: string;
    email?: string;
    address?: string;
    addressAr?: string;
    city?: string;
  }) {
    return this.companiesService.createBranch(user.companyId, body);
  }

  @Get('dashboard')
  async getDashboardStats(@CurrentUser() user: CurrentUserPayload) {
    return this.companiesService.getDashboardStats(user.companyId);
  }
}
