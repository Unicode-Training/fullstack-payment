import { User } from "@/types/user.type";

export const can = (user: User | null, permissionName: string) => {
    return user?.permissions.includes(permissionName) || user?.type === 'ADMIN'
}