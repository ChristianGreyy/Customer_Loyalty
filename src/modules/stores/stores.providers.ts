import { Store } from './store.entity';

export const storesProviders = [
  { provide: 'StoresRepository', useValue: Store },
];
