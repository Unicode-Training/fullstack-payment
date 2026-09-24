"use server";
import { api } from "@/lib/axios"
export const createOrder = async (plan: string) => {
    try {
        const response = await api.post(`/orders`, { plan });
        return response.data.data;
    } catch {
        return false;
    }
}

export const getOrder = async (id: number) => {
    try {
        const response = await api.get(`/orders/${id}`);
        return response.data.data;
    } catch {
        return false;
    }
}