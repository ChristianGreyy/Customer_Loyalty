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

@Controller('stores')
export class StoresController {
  constructor(private storeService: StoresService) {}

  // @UseGuards(AuthGuard)
  @Get('/')
  async getStores() {
    const stores = await this.storeService.getStores();
    return stores;
  }

  @Post('/')
  async createStore(@Body() createStoreDto: CreateStoreDto) {
    const newStore = await this.storeService.createStore(createStoreDto);
    return newStore;
  }

  @Get('/:storeId')
  async getStoreById(@Param('storeId', ParseIntPipe) storeId: number) {
    const store = await this.storeService.getStoreById(storeId);
    if (!store) {
      throw new NotFoundException('Store not found');
    }
    return store;
  }

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

  @Delete('/:storeId')
  async deleteStoreById(@Param('storeId', ParseIntPipe) storeId: number) {
    await this.storeService.deleteStoreById(storeId);
    return { message: 'Delete store successfully' };
  }
}
