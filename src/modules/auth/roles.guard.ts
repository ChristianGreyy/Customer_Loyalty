import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/common/enums/role';
import { User } from '../users/user.entity';
import { Store } from '../stores/store.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const { user } = request;
    let userDoc: any;
    if (requiredRoles[0] === 'user') {
      userDoc = await User.findByPk(user.userId);
    } else if (requiredRoles[0] === 'store') {
      userDoc = await Store.findByPk(user.userId);
    } else if (requiredRoles[0] === 'admin') {
    }
    console.log(userDoc);
    if (!userDoc) {
      return false;
    }
    request['user'] = userDoc;
    return true;
    return requiredRoles.some((role) => user?.roles?.includes(role));
  }
}
