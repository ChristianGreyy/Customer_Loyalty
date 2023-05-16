import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { usersProviders } from './users.providers';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders],
  exports: [UsersService, ...usersProviders],
})
export class UsersModule {}
