import { api } from "@/lib/axios";

export const getUser = async () => {
    try {
        const response = await api.get('/auth/profile');
        return response.data;
    } catch {
        return false;
    }
}