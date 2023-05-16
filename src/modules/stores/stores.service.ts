import {
  Inject,
  Injectable,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as moment from 'moment';
import CreateStoreDto from './dtos/create-store.dto';
import UpdateStoreDto from './dtos/update-store.dto';
import { Store } from './store.entity';

@Injectable()
export class StoresService {
  constructor(
    @Inject('StoresRepository')
    private readonly storesRepository: typeof Store,
  ) {}

  async getStores(): Promise<Store[]> {
    return await this.storesRepository.findAll();
  }

  async getStoreById(storeId: number): Promise<Store> {
    const store = await this.storesRepository.findByPk(storeId);
    return store;
  }

  async createStore(createStoreDto: CreateStoreDto): Promise<Store> {
    return await this.storesRepository.create(createStoreDto);
  }

  async updateStoreById(updateStoreDto: any, storeId: number): Promise<void> {
    const store = await this.getStoreById(storeId);
    if (!store) {
      throw new NotFoundException('Store not found');
    }
    await this.storesRepository.update(updateStoreDto, {
      where: {
        id: storeId,
      },
    });
  }

  async deleteStoreById(storeId: number): Promise<void> {
    const store = await this.getStoreById(storeId);
    if (!store) {
      throw new NotFoundException('Store not found');
    }
    await this.storesRepository.destroy({
      where: {
        id: storeId,
      },
    });
  }
}
