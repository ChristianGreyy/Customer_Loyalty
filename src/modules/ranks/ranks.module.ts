import { Module } from '@nestjs/common';
import { RanksController } from './ranks.controller';
import { RanksService } from './ranks.service';
import { ranksProviders } from './ranks.providers';
import { UploadsModule } from '../upload/uploads.module';

@Module({
  imports: [],
  controllers: [RanksController],
  providers: [RanksService, ...ranksProviders],
  exports: [RanksService, ...ranksProviders],
})
export class RanksModule {}
