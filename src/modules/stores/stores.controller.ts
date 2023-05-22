import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { StoresService } from './stores.service';
import CreateStoreDto from './dtos/create-store.dto';
import UpdateStoreDto from './dtos/update-store.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { HasRoles } from 'src/common/decorators/has-roles.decorator';
import { Role } from 'src/common/enums/role';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Store')
@Controller('stores')
export class StoresController {
  constructor(private readonly storeService: StoresService) {}

  @HasRoles(Role.admin, Role.store, Role.user)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/')
  async getStores() {
    const stores = await this.storeService.getStores();
    return stores;
  }

  @HasRoles(Role.admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/')
  async createStore(@Body() createStoreDto: CreateStoreDto) {
    const newStore = await this.storeService.createStore(createStoreDto);
    return newStore;
  }

  @HasRoles(Role.admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/rewards/:rewardId')
  async getStoresByRewardId(@Param('rewardId', ParseIntPipe) rewardId: number) {
    const rewards = await this.storeService.getStoresByRewardId(rewardId);
    return rewards;
  }

  @HasRoles(Role.admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/:storeId')
  async getStoreById(@Param('storeId', ParseIntPipe) storeId: number) {
    const store = await this.storeService.getStoreById(storeId);
    if (!store) {
      throw new NotFoundException('Store not found');
    }
    return store;
  }

  @HasRoles(Role.admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('/:storeId')
  async updateStoreById(
    @Body() updateStoreDto: UpdateStoreDto,
    @Param('storeId', ParseIntPipe) storeId: number,
  ) {
    await this.storeService.updateStoreById(updateStoreDto, storeId);
    return {
      message: 'Update store successfully',
    };
  }

  @HasRoles(Role.admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('/:storeId')
  async deleteStoreById(@Param('storeId', ParseIntPipe) storeId: number) {
    await this.storeService.deleteStoreById(storeId);
    return { message: 'Delete store successfully' };
  }
}
