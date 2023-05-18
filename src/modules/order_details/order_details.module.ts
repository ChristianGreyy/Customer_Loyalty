import { Module } from '@nestjs/common';
import { orderDetailsProviders } from './order_details.providers';

@Module({
  imports: [],
  providers: [...orderDetailsProviders],
  exports: [...orderDetailsProviders],
})
export class OrderDetailsModule {}
