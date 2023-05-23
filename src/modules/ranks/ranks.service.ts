import {
  Inject,
  Injectable,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import CreateRankDto from './dtos/create-rank.dto';
import { Rank } from './rank.entity';
import { StoresService } from '../stores/stores.service';

@Injectable()
export class RanksService {
  constructor(
    @Inject('RanksRepository')
    private readonly ranksRepository: typeof Rank,
  ) {}

  async getRanks(): Promise<Rank[]> {
    return await this.ranksRepository.findAll();
  }

  async getRankById(rankId: number): Promise<Rank> {
    const rank = await this.ranksRepository.findByPk(rankId);
    return rank;
  }

  async createRank(createRankDto: any | CreateRankDto): Promise<Rank> {
    return await this.ranksRepository.create(createRankDto);
  }

  async updateRankById(updateRankDto: any, rankId: number): Promise<void> {
    const rank = await this.getRankById(rankId);
    if (!rank) {
      throw new NotFoundException('Rank not found');
    }
    await this.ranksRepository.update(updateRankDto, {
      where: {
        id: rankId,
      },
    });
  }

  async deleteRankById(rankId: number): Promise<void> {
    const rank = await this.getRankById(rankId);
    if (!rank) {
      throw new NotFoundException('Rank not found');
    }
    await this.ranksRepository.destroy({
      where: {
        id: rankId,
      },
    });
  }
}
