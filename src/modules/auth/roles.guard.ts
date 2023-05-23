import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/common/enums/role';
import { User } from '../users/user.entity';
import { Store } from '../stores/store.entity';
import { Admin } from '../admin/admin.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles: Role[] = this.reflector.getAllAndOverride<Role[]>(
      'roles',
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const { user } = request;
    console.log(requiredRoles);
    let userDoc: any;
    if (requiredRoles.includes(Role.user)) {
      userDoc = await User.findByPk(user.sub);
    }
    if (requiredRoles.includes(Role.store) && !userDoc) {
      userDoc = await Store.findByPk(user.sub);
    }
    if (requiredRoles.includes(Role.admin) && !userDoc) {
      userDoc = await Admin.findByPk(user.sub);
    }
    if (!userDoc) {
      return false;
    }
    // console.log(userDoc);
    request['user'] = userDoc;
    return true;
    return requiredRoles.some((role) => user?.roles?.includes(role));
  }
}
