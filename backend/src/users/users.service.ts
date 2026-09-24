import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { UserPlan, UserStatus, UserType } from '../prisma/generated/prisma/enums.js';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) { }

  findAll({ type }: { type: UserType }) {
    return this.prismaService.user.findMany(
      {
        where: {
          ...(type ? { type } : {})
        }
      }
    );
  }

  findByEmail(email: string) {
    return this.prismaService.user.findUnique({ where: { email } })
  }

  async find(id: number) {
    const data = await this.prismaService.user.findUnique({
      where: { id },
      omit: { password: true },
      include: {
        userRoles: {
          include: {
            role: {
              include: {
                rolePermissions: {
                  include: {
                    permission: true
                  }
                }
              }
            }
          }
        },
        userPermissions: {
          include: {
            permission: true
          }
        }
      }
    })

    if (!data) {
      throw new NotFoundException("User not found");
    }

    const { userRoles, userPermissions, ...user } = data;

    const permissionArray: any = [];
    userRoles.forEach(({ role }) => {
      role.rolePermissions.forEach(({ permission }) => {
        permissionArray.push(permission.value);
      })
    })

    userPermissions.forEach(({ permission }) => {
      permissionArray.push(permission.value);
    });

    const permissions = [...new Set(permissionArray)];

    return {
      ...user,
      permissions
    };
  }
  create(data: { name: string, email: string, password: string, status: UserStatus, type: UserType }) {
    return this.prismaService.user.create({
      data
    })
  }

  update(data: { name: string, email: string, password: string, status: UserStatus, type: UserType }, id: number) {
    return this.prismaService.user.update({
      where: {
        id
      },
      data
    })
  }

  updatePlan(userId: number, plan: UserPlan) {
    return this.prismaService.user.update({
      where: { id: userId },
      data: {
        plan
      }
    })
  }

  delete(id: number) {
    return this.prismaService.user.delete({
      where: { id }
    })
  }

  async syncPermissions(permissions: string[] = [], userId: number) {
    const permissionsArray = await Promise.all(permissions.map(async (value: string) => {
      let permission = await this.prismaService.permission.findFirst({
        where: { value }
      });
      if (!permission) {
        permission = await this.prismaService.permission.create({
          data: {
            value
          }
        })
      }

      return {
        userId,
        permissionId: permission.id
      };
    }));

    const userPermissions = await this.prismaService.userPermission.findMany({
      where: {
        userId
      }
    });

    const permissionCreate = permissionsArray.filter(({ permissionId }) => {
      return !userPermissions.find((val) => permissionId === val.permissionId);
    });

    const permissionDelete = userPermissions.filter(({ permissionId }) => {
      return !permissionsArray.find((val) => val.permissionId === permissionId)
    }).map((val) => val.id);

    await this.prismaService.$transaction([
      this.prismaService.userPermission.createMany({
        data: permissionCreate
      }),
      this.prismaService.userPermission.deleteMany({
        where: {
          id: {
            in: permissionDelete
          }
        }
      })
    ]);

    return true;
  }

  async getPermissions(id: number) {
    const userPermissions = await this.prismaService.userPermission.findMany({
      where: {
        userId: id
      },
      include: {
        permission: true
      }
    });

    return userPermissions.map((val) => val.permission)
  }

}
