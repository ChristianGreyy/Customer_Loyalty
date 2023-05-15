import { Injectable } from '@nestjs/common';
import { databaseConfig } from '../../modules/database/database.config';

@Injectable()
export class ConfigService {
  get sequelizeOrmConfig() {
    return databaseConfig.development.database;
  }

  get jwtConfig() {
    return { privateKey: databaseConfig.development.jwtPrivateKey };
  }
}
