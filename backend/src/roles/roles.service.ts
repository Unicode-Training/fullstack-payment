import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { RoleStatus } from '../prisma/generated/prisma/enums.js';

@Injectable()
export class RolesService {
    constructor(private readonly prismaService: PrismaService) { }

    findAll() {
        return this.prismaService.role.findMany({
            orderBy: {
                name: "asc"
            }
        });
    }

    async find(id: number) {
        const role = await this.prismaService.role.findUnique({
            where: { id },
            include: {
                rolePermissions: {
                    include: {
                        permission: true
                    }
                }
            }
        });
        if (!role) {
            throw new NotFoundException("Role not found");
        }
        const { rolePermissions, ...data } = role;
        return {
            ...data,
            permissions: rolePermissions.reduce((acc, cur: { permission: { id: number; value: string } }) => {
                acc.push(cur.permission)
                return acc;
            }, [] as { id: number; value: string }[])
        };
    }

    create(body: { name: string, status: RoleStatus }) {
        return this.prismaService.role.create({
            data: body
        })
    }

    update(body: { name: string, status: RoleStatus }, id: number) {
        return this.prismaService.role.update({
            where: {
                id
            },
            data: body
        })
    }

    async delete(id: number) {
        const [, role] = await this.prismaService.$transaction([
            this.prismaService.rolePermission.deleteMany({
                where: {
                    roleId: id
                }
            }),
            this.prismaService.role.delete({
                where: {
                    id
                },
            })
        ]);

        return role;
    }

    async syncPermssions(permissions: string[] = [], id: number) {
        //id: role Id
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
                roleId: id,
                permissionId: permission.id
            };
        }));

        //Tìm các permission cần insert vào bảng roles_permissions
        const rolePermissions = await this.prismaService.rolePermission.findMany({
            where: {
                roleId: id
            }
        });

        const permissionCreate = permissionsArray.filter(({ permissionId }) => {
            return !rolePermissions.find((val) => permissionId === val.permissionId);
        });

        //Tìm các permission cần xóa trên bảng roles_permissions
        const permissionDelete = rolePermissions.filter(({ permissionId }) => {
            return !permissionsArray.find((val) => val.permissionId === permissionId)
        }).map((val) => val.id);

        await this.prismaService.$transaction([
            this.prismaService.rolePermission.createMany({
                data: permissionCreate
            }),
            this.prismaService.rolePermission.deleteMany({
                where: {
                    id: {
                        in: permissionDelete
                    }
                }
            })
        ]);

        return true;
    }

    async syncUsers(usersId: number[] = [], id: number) {

        const userRoles = await this.prismaService.userRole.findMany({
            where: {
                roleId: id
            }
        });

        const usersCreate = usersId.filter((userId) => {
            return !userRoles.find((val) => userId === val.userId);
        });


        const usersDelete = userRoles.filter(({ userId }) => {
            return !usersId.find((val) => val === userId)
        }).map((val) => val.id);

        await this.prismaService.$transaction([
            this.prismaService.userRole.createMany({
                data: usersCreate.map((val) => ({
                    userId: val,
                    roleId: id
                }))
            }),
            this.prismaService.userRole.deleteMany({
                where: {
                    id: {
                        in: usersDelete
                    }
                }
            })
        ]);

        return true;
    }

    getUsersByRole(id: number) {
        return this.prismaService.userRole.findMany({
            where: { roleId: id },
            include: {
                user: true
            }
        })
    }
}
