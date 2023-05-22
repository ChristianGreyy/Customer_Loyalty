import { Admin } from './admin.entity';

export const adminsProviders = [
  { provide: 'AdminsRepository', useValue: Admin },
];
