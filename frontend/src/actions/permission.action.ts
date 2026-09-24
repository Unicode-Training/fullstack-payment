"use server";

import { api } from "@/lib/axios";

export const updatePermission = async (formData: FormData, roleId: number) => {
    try {
        const permissions = formData.getAll('permissions');
        await api.put(`/roles/${roleId}/permissions`, permissions);
        return {
            success: true
        }
    } catch {
        return {
            success: false
        };
    }
}

export const updateUserPermission = async (formData: FormData, userId: number) => {
    try {
        const permissions = formData.getAll('permissions');
        await api.put(`/users/${userId}/permissions`, permissions);
        return {
            success: true
        }
    } catch {
        return {
            success: false
        };
    }
}