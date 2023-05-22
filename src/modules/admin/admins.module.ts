import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { adminsProviders } from './admins.providers';

@Module({
  imports: [
    // DatabaseModule
  ],
  controllers: [],
  providers: [...adminsProviders],
  exports: [...adminsProviders],
})
export class AdminsModule {}
