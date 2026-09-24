import { CanActivate, ExecutionContext, ForbiddenException, Injectable, mixin } from '@nestjs/common';

export const RoleGuard = (permissionName: string) => {
  @Injectable()
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest();
      const user = request.user;
      if (user.type === 'ADMIN') {
        return true;
      }
      const permissions = user.permissions;
      if (!permissions.includes(permissionName)) {
        throw new ForbiddenException();
      }

      return true;
    }
  }

  const guard = mixin(RoleGuardMixin);
  return guard;
}