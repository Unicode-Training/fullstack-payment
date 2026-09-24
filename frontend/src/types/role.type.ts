import { Permission } from "./permission.type";

export type Role = {
    id: number;
    name: string;
    status: string;
    permissions: Permission[]
}