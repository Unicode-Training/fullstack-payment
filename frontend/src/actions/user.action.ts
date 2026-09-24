"use server";

import { api } from "@/lib/axios";

export const getStaffList = async () => {
    try {
        const response = await api.get('/users?type=STAFF');
        return response.data.data;
    } catch {
        return false;
    }
}

