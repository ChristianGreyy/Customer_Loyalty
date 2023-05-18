import { OrderDetail } from './order_details.entity';

export const orderDetailsProviders = [
  { provide: 'OrderDetailsRepository', useValue: OrderDetail },
];
