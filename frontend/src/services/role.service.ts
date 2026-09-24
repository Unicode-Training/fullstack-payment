import { api } from "@/lib/axios"

export const getRoleList = async () => {
    try {
        const response = await api.get('/roles');
        return response.data.data;
    } catch {
        return false;
    }
}

export const getRole = async (id: number) => {
    try {
        const response = await api.get(`/roles/${id}`);
        return response.data.data;
    } catch {
        return false;
    }
}