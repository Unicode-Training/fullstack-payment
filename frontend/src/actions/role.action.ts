"use server";

import { api } from "@/lib/axios";

export const createRole = async (formData: FormData) => {
    try {
        const data = Object.fromEntries(formData.entries());
        await api.post('/roles', {
            ...data,
            status: data.status === 'on' ? 'ACTIVE' : 'INACTIVE'
        });
        return {
            success: true
        };
    } catch {
        return {
            success: false
        };
    }
}

export const updateRole = async (formData: FormData, id: number) => {
    try {
        const data = Object.fromEntries(formData.entries());
        await api.put(`/roles/${id}`, {
            ...data,
            status: data.status === 'on' ? 'ACTIVE' : 'INACTIVE'
        });
        return {
            success: true
        };
    } catch {
        return {
            success: false
        };
    }
}

export const deleteRole = async (id: number) => {
    try {
        await api.delete(`/roles/${id}`);
        return {
            success: true
        };
    } catch {
        return {
            success: false
        };
    }
}

export const getUsersByRole = async (roleId: number) => {
    try {
        const response = await api.get(`/roles/${roleId}/users`);
        return response.data.data
    } catch {
        return false;
    }
}

export const updateUserRole = async (formData: FormData, roleId: number) => {
    try {
        const users = formData.getAll('users');
        await api.put(`/roles/${roleId}/users`, users.map(val => +val));
        return {
            success: true
        }
    } catch {
        return {
            success: false
        };
    }
}