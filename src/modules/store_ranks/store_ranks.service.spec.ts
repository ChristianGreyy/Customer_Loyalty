import { Test, TestingModule } from '@nestjs/testing';
import { StoreRanksService } from './store_ranks.service';

describe('StoreRanksService', () => {
  let service: StoreRanksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoreRanksService],
    }).compile();

    service = module.get<StoreRanksService>(StoreRanksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
