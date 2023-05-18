import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/role';

export const HasRoles = (...roles: Role[]) => SetMetadata('roles', roles);
