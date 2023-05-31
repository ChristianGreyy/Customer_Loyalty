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
  Request,
  UseGuards,
} from '@nestjs/common';
import { StoresService } from './stores.service';
import CreateStoreDto from './dtos/create-store.dto';
import UpdateStoreDto from './dtos/update-store.dto';
import { AuthGuard } from '../../common/guards/auth.guard';
import { HasRoles } from '../../common/decorators/has-roles.decorator';
import { Role } from '../../common/enums/role';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { ApiTags } from '@nestjs/swagger';
import UpdatePointRankDto from '../ranks/dtos/update-point-rank.dto';

@ApiTags('Store')
@Controller('stores')
export class StoresController {
  constructor(private readonly storeService: StoresService) {}

  @HasRoles(Role.admin, Role.store)
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

  @HasRoles(Role.store)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/personal')
  async getStoreByPersonalId(@Request() req) {
    const store = await this.storeService.getStoreByPersonalId(req.user.id);
    if (!store) {
      throw new NotFoundException('Store not found');
    }
    return store;
  }

  @HasRoles(Role.store)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('/point')
  async updateStorePointById(
    @Body() updatePointRankDto: UpdatePointRankDto,
    @Request() req,
  ) {
    const store = await this.storeService.updateStorePointById(
      updatePointRankDto,
      req.user.id,
    );
    return {
      message: 'Update point of store successfully',
      store,
    };
  }

  @HasRoles(Role.admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/rewards/:rewardId')
  async getStoreByRewardId(@Param('rewardId', ParseIntPipe) rewardId: number) {
    const rewards = await this.storeService.getStoreByRewardId(rewardId);
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
