import { api } from "@/lib/axios"

export const getUsersList = async () => {
    try {
        const response = await api.get('/users');
        return response.data.data;
    } catch {
        return false;
    }
}

export const getUserPermissions = async (id: number) => {
    try {
        const response = await api.get(`/users/${id}/permissions`);
        return response.data.data;
    } catch {
        return false;
    }
}